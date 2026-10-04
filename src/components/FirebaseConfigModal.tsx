import React, { useState } from 'react';
import { X, Database, Check, AlertCircle, RefreshCw, Key } from 'lucide-react';
import {
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig,
  isFirebaseConfigured,
} from '../services/firebase';
import type { FirebaseClientConfig } from '../types';

interface FirebaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({ isOpen, onClose }) => {
  const current = getStoredFirebaseConfig();
  const isConfigured = isFirebaseConfigured();

  const [rawJson, setRawJson] = useState('');
  const [apiKey, setApiKey] = useState(current?.apiKey || '');
  const [authDomain, setAuthDomain] = useState(current?.authDomain || '');
  const [projectId, setProjectId] = useState(current?.projectId || '');
  const [storageBucket, setStorageBucket] = useState(current?.storageBucket || '');
  const [messagingSenderId, setMessagingSenderId] = useState(current?.messagingSenderId || '');
  const [appId, setAppId] = useState(current?.appId || '');
  const [firestoreDatabaseId, setFirestoreDatabaseId] = useState(
    current?.firestoreDatabaseId || '(default)'
  );

  const [jsonError, setJsonError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleParseJson = () => {
    setJsonError(null);
    try {
      // Clean string from possible variable assignment
      let clean = rawJson.trim();
      if (clean.includes('=')) {
        clean = clean.substring(clean.indexOf('=') + 1).trim();
      }
      if (clean.endsWith(';')) {
        clean = clean.slice(0, -1).trim();
      }
      const parsed = JSON.parse(clean);
      if (parsed.apiKey) setApiKey(parsed.apiKey);
      if (parsed.authDomain) setAuthDomain(parsed.authDomain);
      if (parsed.projectId) setProjectId(parsed.projectId);
      if (parsed.storageBucket) setStorageBucket(parsed.storageBucket);
      if (parsed.messagingSenderId) setMessagingSenderId(parsed.messagingSenderId);
      if (parsed.appId) setAppId(parsed.appId);
      if (parsed.firestoreDatabaseId) setFirestoreDatabaseId(parsed.firestoreDatabaseId);
    } catch (e: any) {
      setJsonError('Invalid JSON format. Please verify your firebaseConfig object.');
    }
  };

  const handleSave = () => {
    const config: FirebaseClientConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim(),
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim(),
      firestoreDatabaseId: firestoreDatabaseId.trim() || '(default)',
    };
    saveStoredFirebaseConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem('sj_firebase_config');
    setApiKey('');
    setAuthDomain('');
    setProjectId('');
    setStorageBucket('');
    setMessagingSenderId('');
    setAppId('');
    setFirestoreDatabaseId('(default)');
    setSavedSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
              Firebase Configuration
            </h3>
            <p className="text-xs text-slate-500">
              Provide or manage your Firebase project credentials for Firestore & Auth.
            </p>
          </div>
        </div>

        {/* Current status pill */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            ></span>
            <span className="font-semibold text-slate-800">
              {isConfigured
                ? 'Firebase Initialized & Connected'
                : 'Operating with Local Persistence (Ready for Firebase credentials)'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {projectId ? `Project: ${projectId}` : 'No Cloud Project Attached'}
          </span>
        </div>

        {/* Paste raw JSON section */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-blue-900">
            Paste firebaseConfig JSON (Quick Fill)
          </label>
          <textarea
            rows={3}
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
            placeholder='Paste {"apiKey": "AIzaSy...", "projectId": "startup-junction-...", ...}'
            className="w-full p-2.5 rounded-xl border border-blue-200 text-xs font-mono text-slate-800 bg-white focus:outline-hidden focus:border-blue-600"
          />
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleParseJson}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Autofill Fields Below
            </button>
            {jsonError && <span className="text-xs text-red-600">{jsonError}</span>}
          </div>
        </div>

        {/* Individual Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6 max-h-56 overflow-y-auto pr-1">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project ID</label>
            <input
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="startup-junction-123"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Auth Domain</label>
            <input
              type="text"
              value={authDomain}
              onChange={(e) => setAuthDomain(e.target.value)}
              placeholder="project-id.firebaseapp.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Storage Bucket</label>
            <input
              type="text"
              value={storageBucket}
              onChange={(e) => setStorageBucket(e.target.value)}
              placeholder="project-id.appspot.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">App ID</label>
            <input
              type="text"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder="1:123456789:web:abcdef"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Database ID</label>
            <input
              type="text"
              value={firestoreDatabaseId}
              onChange={(e) => setFirestoreDatabaseId(e.target.value)}
              placeholder="(default)"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-red-600 hover:text-red-700 font-medium"
          >
            Clear Stored Config
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved! Reloading...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Save & Connect</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
