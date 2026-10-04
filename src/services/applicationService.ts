import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType, isFirebaseConfigured } from './firebase';
import type {
  Application,
  ApplicationStatus,
  ApplicationNote,
  ApplicationReview,
  ActivityLog,
} from '../types';

const STORAGE_KEY = 'sj_applications_store';
const NOTES_KEY_PREFIX = 'sj_notes_';
const REVIEWS_KEY_PREFIX = 'sj_reviews_';
const ACTIVITIES_KEY_PREFIX = 'sj_activities_';

// Initial sample applications (realistic Bihar students/founders) for instant review & demo
const INITIAL_DEMO_APPLICATIONS: Application[] = [];

function getLocalApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_APPLICATIONS));
      return INITIAL_DEMO_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local applications:', err);
    return INITIAL_DEMO_APPLICATIONS;
  }
}

function saveLocalApplications(apps: Application[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error('Error saving local applications:', err);
  }
}

// Generate unique ID in SJ-XXXXXX format
export function generateApplicationId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = 'SJ-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function submitApplication(
  payload: Omit<Application, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<Application> {
  const id = generateApplicationId();
  const timestamp = new Date().toISOString();

  const newApp: Application = {
    ...payload,
    id,
    status: 'NEW',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  // Try saving to Firebase if configured
  if (isFirebaseConfigured() && db) {
    try {
      const appRef = doc(db, 'applications', id);
      await setDoc(appRef, {
        ...newApp,
        createdAtServer: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Firebase submission failed or permission denied, recording locally:', err);
      // We do not break the applicant's experience, but record the error conforming to skill specs
      try {
        handleFirestoreError(err, OperationType.WRITE, `applications/${id}`);
      } catch (logErr) {
        // Handled & logged, proceed to keep local mirror safe
      }
    }
  }

  // Always update local storage
  const current = getLocalApplications();
  const updated = [newApp, ...current];
  saveLocalApplications(updated);

  // Add initial activity
  logApplicationActivity(id, 'Application submitted by applicant', 'Public Applicant');

  return newApp;
}

export async function getApplications(): Promise<Application[]> {
  if (isFirebaseConfigured() && db && auth?.currentUser) {
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAtServer', 'desc'));
      const snapshot = await getDocs(q);
      const apps: Application[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Application;
        apps.push({ ...data, id: docSnap.id });
      });
      if (apps.length > 0) {
        // Merge with local to ensure nothing is lost
        saveLocalApplications(apps);
        return apps;
      }
    } catch (err) {
      console.warn('Could not read from Firestore, using local repository:', err);
      try {
        handleFirestoreError(err, OperationType.LIST, 'applications');
      } catch (e) {
        // fall back to local
      }
    }
  }

  return getLocalApplications();
}

export async function getApplicationById(id: string): Promise<Application | null> {
  if (isFirebaseConfigured() && db && auth?.currentUser) {
    try {
      const docRef = doc(db, 'applications', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...(docSnap.data() as Application), id: docSnap.id };
      }
    } catch (err) {
      console.warn('Could not fetch application from Firestore, checking local storage:', err);
    }
  }

  const all = getLocalApplications();
  return all.find((a) => a.id === id) || null;
}

export async function updateApplicationStatus(
  id: string,
  newStatus: ApplicationStatus,
  adminEmail: string
): Promise<boolean> {
  const timestamp = new Date().toISOString();

  if (isFirebaseConfigured() && db && auth?.currentUser) {
    try {
      const docRef = doc(db, 'applications', id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: timestamp,
      });
    } catch (err) {
      console.warn('Firestore status update failed:', err);
    }
  }

  // Update local store
  const all = getLocalApplications();
  const idx = all.findIndex((a) => a.id === id);
  if (idx !== -1) {
    const oldStatus = all[idx].status;
    all[idx].status = newStatus;
    all[idx].updatedAt = timestamp;
    saveLocalApplications(all);

    logApplicationActivity(
      id,
      `Status changed from ${oldStatus} to ${newStatus}`,
      adminEmail
    );
    return true;
  }
  return false;
}

// Activity logs
export function getApplicationActivities(appId: string): ActivityLog[] {
  try {
    const raw = localStorage.getItem(`${ACTIVITIES_KEY_PREFIX}${appId}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'act-init',
      action: 'Application received and registered in system',
      performedBy: 'System',
      timestamp: new Date().toISOString(),
    },
  ];
}

export function logApplicationActivity(
  appId: string,
  action: string,
  performedBy: string,
  details?: string
) {
  const current = getApplicationActivities(appId);
  const newLog: ActivityLog = {
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    action,
    performedBy,
    timestamp: new Date().toISOString(),
    details,
  };
  const updated = [newLog, ...current];
  try {
    localStorage.setItem(`${ACTIVITIES_KEY_PREFIX}${appId}`, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

// Notes
export async function getApplicationNotes(appId: string): Promise<ApplicationNote[]> {
  try {
    const raw = localStorage.getItem(`${NOTES_KEY_PREFIX}${appId}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function addApplicationNote(
  appId: string,
  content: string,
  adminEmail: string
): Promise<ApplicationNote> {
  const note: ApplicationNote = {
    id: `note-${Date.now()}`,
    authorEmail: adminEmail,
    content,
    createdAt: new Date().toISOString(),
  };

  const current = await getApplicationNotes(appId);
  const updated = [note, ...current];
  try {
    localStorage.setItem(`${NOTES_KEY_PREFIX}${appId}`, JSON.stringify(updated));
    logApplicationActivity(appId, 'Added an internal note', adminEmail, content.substring(0, 60));
  } catch (e) {
    console.error(e);
  }
  return note;
}

// Review Matrix
export async function getApplicationReview(appId: string): Promise<ApplicationReview | null> {
  try {
    const raw = localStorage.getItem(`${REVIEWS_KEY_PREFIX}${appId}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return null;
}

export async function saveApplicationReview(
  appId: string,
  review: ApplicationReview
): Promise<void> {
  try {
    localStorage.setItem(`${REVIEWS_KEY_PREFIX}${appId}`, JSON.stringify(review));
    logApplicationActivity(
      appId,
      'Saved internal evaluation scorecard',
      review.reviewedBy || 'Admin'
    );
  } catch (e) {
    console.error(e);
  }
}

// Export to CSV
export function exportApplicationsToCSV(apps: Application[]) {
  const headers = [
    'Application ID',
    'Full Name',
    'Email',
    'WhatsApp',
    'City',
    'State',
    'College',
    'Degree',
    'Branch',
    'Current Year',
    'Expected Graduation',
    'Idea Title',
    'Stage',
    'Team Status',
    'Status',
    'Created At',
  ];

  const escapeCSV = (val?: string | null) => {
    if (!val) return '""';
    const clean = String(val).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = apps.map((app) => [
    escapeCSV(app.id),
    escapeCSV(app.fullName),
    escapeCSV(app.email),
    escapeCSV(app.whatsapp),
    escapeCSV(app.city),
    escapeCSV(app.state),
    escapeCSV(app.college),
    escapeCSV(app.degree),
    escapeCSV(app.branch),
    escapeCSV(app.currentYear),
    escapeCSV(app.expectedGraduationYear),
    escapeCSV(app.ideaTitle || 'N/A'),
    escapeCSV(app.stage || 'N/A'),
    escapeCSV(app.teamStatus || 'N/A'),
    escapeCSV(app.status),
    escapeCSV(new Date(app.createdAt).toLocaleDateString()),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Startup_Junction_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
