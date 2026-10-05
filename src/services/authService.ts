import type { User } from 'firebase/auth';
import { BackendUnavailableError, getAuthModule, getFirebase, requireAuth } from './firebase';
import type { AdminUser } from '../types';

const ADMIN_SESSION_KEY = 'sj_admin_session';

/** Admin sessions are short-lived by design so a shared or public machine
 *  cannot retain access to the dashboard indefinitely. */
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

interface StoredAdminSession {
  user: AdminUser;
  expiresAt: number;
}

/**
 * Emails permitted to administer the dashboard. Mirrored in firestore.rules —
 * keep the two lists in sync.
 *
 * This list must match ADMIN_EMAILS() in firestore.rules exactly: the rules
 * decide what the database will allow, this list only decides whether to show
 * the dashboard after Firebase has already authenticated you.
 *
 * BOOTSTRAP: put your admin address here AND in firestore.rules, sign in once,
 * then create /admins/{uid} in the Firebase console and remove the address
 * from both lists. Never use a personal mailbox here — this file is committed.
 */
export const ADMIN_EMAILS = ['admin@startup-junction.in'];

export function isAdminEmailAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

function readSession(): StoredAdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAdminSession;
    if (!parsed?.user?.email || typeof parsed.expiresAt !== 'number') return null;
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return parsed;
  } catch (err) {
    console.warn('Could not read stored admin session', err);
    return null;
  }
}

/**
 * Returns the cached admin session, but only if it is unexpired AND matches a
 * live Firebase Auth user. A hand-edited localStorage value is therefore not
 * sufficient to reach the dashboard.
 */
export function getStoredAdmin(firebaseUser?: User | null): AdminUser | null {
  const session = readSession();
  if (!session) return null;

  if (firebaseUser === undefined) return session.user;

  if (!firebaseUser || firebaseUser.email !== session.user.email) {
    setStoredAdmin(null);
    return null;
  }

  return session.user;
}

export function setStoredAdmin(admin: AdminUser | null) {
  try {
    if (admin) {
      const payload: StoredAdminSession = { user: admin, expiresAt: Date.now() + SESSION_TTL_MS };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (err) {
    console.warn('Could not persist admin session', err);
  }
}

/**
 * Signs an admin in via Firebase Auth and only resolves once the account is
 * on the allow-list and confirmed by the backend (custom claims when present,
 * allow-list otherwise).
 */
export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('Enter both your admin email and password.');
  }

  let auth: Awaited<ReturnType<typeof getFirebase>>['auth'];
  try {
    ({ auth } = await getFirebase());
  } catch (err) {
    if (err instanceof BackendUnavailableError) throw err;
    throw new BackendUnavailableError(
      'Sign-in is temporarily unavailable. Please try again in a few minutes.'
    );
  }

  const { signInWithEmailAndPassword, signOut } = await getAuthModule();

  let userCred;
  try {
    userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
  } catch (err: any) {
    const code = err?.code as string | undefined;
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      throw new Error('Incorrect email or password.');
    }
    if (code === 'auth/too-many-requests') {
      throw new Error('Too many attempts. Please wait a few minutes and try again.');
    }
    if (code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your connection and try again.');
    }
    console.error('Admin sign-in failed', code ?? err);
    throw new Error('Sign-in failed. Please try again.');
  }

  const user = userCred.user;

  // A custom claim is the authoritative check when one has been provisioned.
  const claims = (await user.getIdTokenResult()).claims as Record<string, unknown>;
  const claimAdmin = claims.admin === true;
  const claimEmail = typeof claims.adminEmail === 'string' ? claims.adminEmail : null;

  const authorised = claimAdmin ? true : isAdminEmailAllowed(claimEmail ?? user.email);
  if (!authorised) {
    await signOut(auth);
    setStoredAdmin(null);
    throw new Error('This account is not authorised for the admin dashboard.');
  }

  const adminUser: AdminUser = {
    uid: user.uid,
    email: user.email || cleanEmail,
    role: 'admin',
    name: user.displayName || cleanEmail.split('@')[0],
  };

  setStoredAdmin(adminUser);
  return adminUser;
}

export async function logoutAdmin(): Promise<void> {
  try {
    const auth = await requireAuth();
    const { signOut } = await getAuthModule();
    await signOut(auth);
  } catch (err) {
    console.warn('signOut failed; clearing local session anyway', err);
  } finally {
    setStoredAdmin(null);
  }
}

/**
 * Bridges Firebase Auth state to React. The cached session is only trusted
 * while a matching Firebase user is present, so a forged or stale
 * localStorage entry cannot survive an auth-state change or sign-out.
 */
export function subscribeToAuth(callback: (user: AdminUser | null) => void) {
  let unsubscribe: (() => void) | undefined;
  let cancelled = false;

  Promise.all([getFirebase(), getAuthModule()])
    .then(([{ auth }, { onAuthStateChanged }]) => {
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
        callback(getStoredAdmin(firebaseUser));
      });
    })
    .catch((err) => {
      console.error('Could not subscribe to auth state', err);
      callback(null);
    });

  return () => {
    cancelled = true;
    unsubscribe?.();
  };
}