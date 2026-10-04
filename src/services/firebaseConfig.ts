import type { FirebaseClientConfig } from '../types';

export const DEFAULT_FIREBASE_CONFIG: FirebaseClientConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || 'AIzaSyBCcc8L95wBpGWi5eM5e9MqmuxpMB55ZMg',
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || 'startup-junction-abc.firebaseapp.com',
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || 'startup-junction-abc',
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || 'startup-junction-abc.firebasestorage.app',
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '627940415914',
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || '1:627940415914:web:5c7130993f6dfbfab0b3d3',
  firestoreDatabaseId: (import.meta as any).env?.VITE_FIREBASE_DATABASE_ID || '(default)',
};
