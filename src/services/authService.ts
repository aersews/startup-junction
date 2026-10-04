import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';
import type { AdminUser } from '../types';

const ADMIN_SESSION_KEY = 'sj_admin_session';

export function getStoredAdmin(): AdminUser | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function setStoredAdmin(admin: AdminUser | null) {
  if (admin) {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
  } else {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const cleanEmail = email.trim().toLowerCase();

  // If Firebase is configured, attempt real Firebase sign in
  if (isFirebaseConfigured() && auth) {
    try {
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const adminUser: AdminUser = {
        uid: userCred.user.uid,
        email: userCred.user.email || cleanEmail,
        role: 'admin',
        name: userCred.user.displayName || cleanEmail.split('@')[0],
      };
      setStoredAdmin(adminUser);
      return adminUser;
    } catch (err: any) {
      console.warn('Firebase login failed, testing fallback admin check:', err.message);
      // If it's a real Firebase error like user-not-found and credentials match default authorized admin, check below
    }
  }

  throw new Error('Firebase is not configured. Please set up your Firebase credentials in the Firebase Configuration modal before logging in.');
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }
  setStoredAdmin(null);
}

export function subscribeToAuth(callback: (user: AdminUser | null) => void) {
  // Check local first
  const current = getStoredAdmin();
  callback(current);

  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        const admin: AdminUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          role: 'admin',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
        };
        setStoredAdmin(admin);
        callback(admin);
      } else if (!getStoredAdmin()) {
        callback(null);
      }
    });
  }

  return () => {};
}
