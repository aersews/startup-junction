import type { FirebaseClientConfig } from '../types';

const env = import.meta.env;

/**
 * Firebase web configuration.
 *
 * SECURITY: A Firebase web API key is not a secret — it is designed to ship in
 * client bundles and is protected by Firestore/Storage security rules. What
 * actually matters is that the key is RESTRICTED in Google Cloud Console:
 *
 *   1. APIs → Credentials → your browser key → Application restrictions:
 *      set to "Web site" and add ONLY your production domain to
 *      "Authorized domains".
 *   2. API restrictions: allow only the APIs this site actually calls
 *      (Identity Toolkit, Firestore). Do not leave it unrestricted, or anyone
 *      can spend your quota.
 *   3. Never enable "Android"/"iOS" application restrictions for a web key.
 *
 * Firebase project `startup-junction-abc` also has an app-signup risk: with an
 * unrestricted key, anyone can call Identity Toolkit from anywhere and attempt
 * to create accounts. Lock the project down in Identity Platform → Sign-in
 * method (disable public sign-up) if you do not want anonymous account
 * creation.
 *
 * Prefer injecting these at build time via VITE_FIREBASE_* rather than relying
 * on the fallbacks below.
 */
export const DEFAULT_FIREBASE_CONFIG: FirebaseClientConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyBCcc8L95wBpGWi5eM5e9MqmuxpMB55ZMg',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'startup-junction-abc.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'startup-junction-abc',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'startup-junction-abc.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '627940415914',
  appId: env.VITE_FIREBASE_APP_ID || '1:627940415914:web:5c7130993f6dfbfab0b3d3',
  firestoreDatabaseId: env.VITE_FIREBASE_DATABASE_ID || '(default)',
};

export const SITE_URL = (env.VITE_SITE_URL || 'https://startup-junction.in').replace(/\/$/, '');

if (!env.VITE_FIREBASE_API_KEY || !env.VITE_FIREBASE_PROJECT_ID) {
  console.warn(
    '[config] VITE_FIREBASE_* environment variables are not set; falling back to the values ' +
      'committed in src/services/firebaseConfig.ts. Set them in your deployment environment so ' +
      'keys can be rotated without a code change.'
  );
}