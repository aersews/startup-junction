import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import type { FirebaseClientConfig } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const currentAuth = auth;
  const currentUser = currentAuth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: currentUser?.providerData?.map((p) => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const STORAGE_KEY = 'sj_firebase_config';

export function getStoredFirebaseConfig(): FirebaseClientConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not parse stored Firebase config', e);
  }
  return null;
}

export function saveStoredFirebaseConfig(config: FirebaseClientConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export function initFirebase() {
  if (app) return { app, db, auth };

  const storedConfig = getStoredFirebaseConfig();
  const config = storedConfig || {
    apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || '',
    authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || '',
    firestoreDatabaseId: (import.meta as any).env?.VITE_FIREBASE_DATABASE_ID || '(default)',
  };

  if (config.apiKey && config.projectId) {
    try {
      const apps = getApps();
      app = apps.length > 0 ? apps[0] : initializeApp(config);
      db = getFirestore(app, config.firestoreDatabaseId || '(default)');
      auth = getAuth(app);
      return { app, db, auth };
    } catch (err) {
      console.warn('Firebase initialization error, will fall back to local storage:', err);
    }
  }

  return { app: null, db: null, auth: null };
}

// Initial attempt
const initialized = initFirebase();
app = initialized.app;
db = initialized.db;
auth = initialized.auth;

export { app, db, auth };

export function isFirebaseConfigured(): boolean {
  return !!(app && db && auth);
}
