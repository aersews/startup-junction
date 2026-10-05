import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { DEFAULT_FIREBASE_CONFIG } from './firebaseConfig';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

/**
 * Raised when Firebase cannot be initialised at all (missing/placeholder config).
 * Callers must surface this to the user: it means nothing can be saved.
 */
export class BackendUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BackendUnavailableError';
  }
}

function describe(error: unknown): string {
  if (error instanceof Error) {
    const code = (error as { code?: string }).code;
    return code ? `${error.message} (${code})` : error.message;
  }
  return String(error);
}

/**
 * Logs a Firestore failure with enough context to debug it, without ever
 * surfacing raw internals to the applicant-facing UI.
 */
export function logFirestoreError(error: unknown, operation: OperationType, path: string | null) {
  console.error(`[firestore:${operation}] ${path ?? '(unknown path)'} — ${describe(error)}`);
}

export interface FirebaseHandles {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
}

type AuthModule = typeof import('firebase/auth');
type FirestoreModule = typeof import('firebase/firestore');

let handles: FirebaseHandles | null = null;
let initPromise: Promise<FirebaseHandles> | null = null;
let authModulePromise: Promise<AuthModule> | null = null;
let firestoreModulePromise: Promise<FirestoreModule> | null = null;

/** The firebase/auth module namespace, loaded on demand. */
export function getAuthModule(): Promise<AuthModule> {
  if (!authModulePromise) {
    authModulePromise = import('firebase/auth');
  }
  return authModulePromise;
}

/** The firebase/firestore module namespace, loaded on demand. */
export function getFirestoreModule(): Promise<FirestoreModule> {
  if (!firestoreModulePromise) {
    firestoreModulePromise = import('firebase/firestore');
  }
  return firestoreModulePromise;
}

async function createHandles(): Promise<FirebaseHandles> {
  const config = DEFAULT_FIREBASE_CONFIG;

  if (!config.apiKey || !config.projectId) {
    throw new BackendUnavailableError(
      'Server configuration is incomplete. Please contact support@startup-junction.in.'
    );
  }

  // Firebase is dynamically imported so the SDK stays out of the initial
  // bundle. Public visitors who never apply never download it.
  const appModule = await import('firebase/app');
  const authModule = await getAuthModule();
  const firestoreModule = await getFirestoreModule();

  const existing = appModule.getApps();
  const app = existing.length > 0 ? existing[0] : appModule.initializeApp(config);
  const db = firestoreModule.getFirestore(app, config.firestoreDatabaseId || '(default)');
  const auth = authModule.getAuth(app);

  return { app, db, auth };
}

/**
 * Resolves the Firebase handles, initialising the SDK on first use.
 * Safe to call concurrently and repeatedly; retries after a failure.
 */
export function getFirebase(): Promise<FirebaseHandles> {
  if (handles) return Promise.resolve(handles);
  if (!initPromise) {
    initPromise = createHandles()
      .then((resolved) => {
        handles = resolved;
        return resolved;
      })
      .catch((err) => {
        // Clear so a later call can retry rather than replay the failure.
        initPromise = null;
        throw err;
      });
  }
  return initPromise;
}

/**
 * Resolves Firestore or throws a user-presentable error. Never silently
 * degrades to local persistence — that loses applicant data.
 */
export async function requireDb(): Promise<Firestore> {
  try {
    const { db } = await getFirebase();
    return db;
  } catch (err) {
    logFirestoreError(err, OperationType.GET, null);
    throw new BackendUnavailableError(
      'Our application system is temporarily unavailable, so your application cannot be saved right now. Please try again in a few minutes, or email support@startup-junction.in.'
    );
  }
}

/** Resolves Auth or throws a user-presentable error. */
export async function requireAuth(): Promise<Auth> {
  try {
    const { auth } = await getFirebase();
    return auth;
  } catch (err) {
    logFirestoreError(err, OperationType.GET, null);
    throw new BackendUnavailableError(
      'Sign-in is temporarily unavailable. Please try again in a few minutes.'
    );
  }
}
