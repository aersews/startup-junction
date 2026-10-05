import { getFirestoreModule, logFirestoreError, OperationType, requireAuth, requireDb } from './firebase';
import type {
  Application,
  ApplicationStatus,
  ApplicationNote,
  ApplicationReview,
  ActivityLog,
} from '../types';

const NOTES_KEY_PREFIX = 'sj_notes_';
const REVIEWS_KEY_PREFIX = 'sj_reviews_';
const ACTIVITIES_KEY_PREFIX = 'sj_activities_';

const REVIEW_DOC_ID = 'current';

const GENERIC_FAILURE =
  'We could not save that just now. Please try again in a moment — if it keeps failing, email support@startupjunction.in.';

const GENERIC_READ_FAILURE =
  'We could not load your applications just now. Please check your connection and try again.';

/** Local mirror helpers. These are a convenience cache for admins only —
 *  they are never treated as the source of truth for applicant data. */
function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (err) {
    console.warn(`Could not read local cache "${key}"`, err);
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Could not write local cache "${key}"`, err);
  }
}

/** Firestore rejects `undefined` values, so drop them before writing. */
function stripUndefined<T>(input: T): T {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (value !== undefined) output[key] = value;
  }
  return output as T;
}

/** Every field a public submission is permitted to write. Mirrored in
 *  firestore.rules `hasOnly([...])` — keep the two lists in sync. */
export const SUBMITTABLE_FIELDS = [
  'id',
  'fullName',
  'email',
  'whatsapp',
  'city',
  'state',
  'linkedin',
  'portfolio',
  'college',
  'degree',
  'branch',
  'currentYear',
  'currentSemester',
  'expectedGraduationYear',
  'technicalSkills',
  'businessCreativeSkills',
  'projectsBuilt',
  'previousExperience',
  'ideaStatus',
  'ideaTitle',
  'problemStatement',
  'targetUsers',
  'solutionDescription',
  'stage',
  'teamStatus',
  'needs',
  'seriousness',
  'timeCommitment',
  'motivation',
  'status',
  'createdAt',
  'updatedAt',
  'createdAtServer',
] as const;

/** Generate unique ID in SJ-XXXXXX format */
export function generateApplicationId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = 'SJ-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Persists a new application to Firestore.
 *
 * This NEVER falls back to local storage: a submission that is not in
 * Firestore has not been received, and telling the applicant otherwise
 * loses their application. Failures propagate to the caller.
 */
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

  // Defence in depth: strip anything outside the documented allowlist before it
  // reaches Firestore. firestore.rules rejects unknown fields with hasOnly(),
  // but failing here gives a clean error instead of an opaque permission one.
  const allowed = new Set<string>(SUBMITTABLE_FIELDS);
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(newApp)) {
    if (allowed.has(key)) clean[key] = value;
  }

  const [db, fs] = await Promise.all([requireDb(), getFirestoreModule()]);
  const appRef = fs.doc(db, 'applications', id);

  try {
    await fs.setDoc(appRef, stripUndefined({ ...clean, createdAtServer: fs.serverTimestamp() }));
  } catch (err) {
    logFirestoreError(err, OperationType.CREATE, `applications/${id}`);
    throw new Error(GENERIC_FAILURE);
  }

  await logApplicationActivity(id, 'Application submitted by applicant', 'Public Applicant');

  return newApp;
}

/** Reads every application. Requires a signed-in admin; throws on failure. */
export async function getApplications(): Promise<Application[]> {
  const [db, auth, fs] = await Promise.all([requireDb(), requireAuth(), getFirestoreModule()]);

  if (!auth.currentUser) {
    throw new Error('Your admin session has expired. Please sign in again.');
  }

  try {
    const q = fs.query(fs.collection(db, 'applications'), fs.orderBy('createdAtServer', 'desc'));
    const snapshot = await fs.getDocs(q);
    const apps: Application[] = [];
    snapshot.forEach((docSnap) => {
      apps.push({ ...(docSnap.data() as Application), id: docSnap.id });
    });
    writeLocal('sj_applications_cache', apps);
    return apps;
  } catch (err) {
    logFirestoreError(err, OperationType.LIST, 'applications');
    throw new Error(GENERIC_READ_FAILURE);
  }
}

export async function getApplicationById(id: string): Promise<Application | null> {
  const [db, auth, fs] = await Promise.all([requireDb(), requireAuth(), getFirestoreModule()]);

  if (!auth.currentUser) {
    throw new Error('Your admin session has expired. Please sign in again.');
  }

  try {
    const docSnap = await fs.getDoc(fs.doc(db, 'applications', id));
    if (!docSnap.exists()) return null;
    return { ...(docSnap.data() as Application), id: docSnap.id };
  } catch (err) {
    logFirestoreError(err, OperationType.GET, `applications/${id}`);
    throw new Error(GENERIC_READ_FAILURE);
  }
}

/**
 * Updates an application's pipeline status. Firestore is authoritative —
 * a failed write is reported rather than silently mirrored locally.
 */
export async function updateApplicationStatus(
  id: string,
  newStatus: ApplicationStatus,
  adminEmail: string
): Promise<Application | null> {
  const [db, auth, fs] = await Promise.all([requireDb(), requireAuth(), getFirestoreModule()]);
  const timestamp = new Date().toISOString();

  if (!auth.currentUser) {
    throw new Error('Your admin session has expired. Please sign in again.');
  }

  let updated: Application;
  try {
    const docRef = fs.doc(db, 'applications', id);
    const before = await fs.getDoc(docRef);
    if (!before.exists()) return null;
    const previousStatus = (before.data() as Application).status;
    await fs.updateDoc(docRef, { status: newStatus, updatedAt: timestamp });
    updated = { ...(before.data() as Application), id, status: newStatus, updatedAt: timestamp };

    await logApplicationActivity(
      id,
      `Status changed from ${previousStatus} to ${newStatus}`,
      adminEmail
    );
  } catch (err) {
    logFirestoreError(err, OperationType.UPDATE, `applications/${id}`);
    throw new Error(GENERIC_FAILURE);
  }

  return updated;
}

// ---------------------------------------------------------------------------
// Activity log — persisted to applications/{id}/activity/{logId}
// ---------------------------------------------------------------------------

export async function getApplicationActivities(appId: string): Promise<ActivityLog[]> {
  const localKey = `${ACTIVITIES_KEY_PREFIX}${appId}`;
  const local = readLocal<ActivityLog[]>(localKey, []);

  try {
    const [db, auth, fs] = await Promise.all([
      requireDb(),
      requireAuth(),
      getFirestoreModule(),
    ]);
    if (!auth.currentUser) return local;

    const q = fs.query(
      fs.collection(db, 'applications', appId, 'activity'),
      fs.orderBy('createdAt', 'desc')
    );
    const snapshot = await fs.getDocs(q);
    const logs: ActivityLog[] = snapshot.docs.map((d) => d.data() as ActivityLog);
    writeLocal(localKey, logs);
    return logs;
  } catch (err) {
    logFirestoreError(err, OperationType.LIST, `applications/${appId}/activity`);
    return local;
  }
}

export async function logApplicationActivity(
  appId: string,
  action: string,
  performedBy: string,
  details?: string
) {
  const log: ActivityLog = {
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    action,
    performedBy,
    timestamp: new Date().toISOString(),
    details,
  };

  const localKey = `${ACTIVITIES_KEY_PREFIX}${appId}`;
  writeLocal(localKey, [log, ...readLocal<ActivityLog[]>(localKey, [])]);

  try {
    const [db, fs] = await Promise.all([requireDb(), getFirestoreModule()]);
    await fs.setDoc(fs.doc(db, 'applications', appId, 'activity', log.id), {
      ...stripUndefined(log),
      createdAtServer: fs.serverTimestamp(),
    });
  } catch (err) {
    logFirestoreError(err, OperationType.CREATE, `applications/${appId}/activity/${log.id}`);
  }
}

// ---------------------------------------------------------------------------
// Notes — persisted to applications/{id}/notes/{noteId}
// ---------------------------------------------------------------------------

export async function getApplicationNotes(appId: string): Promise<ApplicationNote[]> {
  const localKey = `${NOTES_KEY_PREFIX}${appId}`;
  const local = readLocal<ApplicationNote[]>(localKey, []);

  try {
    const [db, auth, fs] = await Promise.all([
      requireDb(),
      requireAuth(),
      getFirestoreModule(),
    ]);
    if (!auth.currentUser) return local;

    const q = fs.query(
      fs.collection(db, 'applications', appId, 'notes'),
      fs.orderBy('createdAt', 'desc')
    );
    const snapshot = await fs.getDocs(q);
    const notes = snapshot.docs.map((d) => d.data() as ApplicationNote);
    writeLocal(localKey, notes);
    return notes;
  } catch (err) {
    logFirestoreError(err, OperationType.LIST, `applications/${appId}/notes`);
    return local;
  }
}

export async function addApplicationNote(
  appId: string,
  content: string,
  adminEmail: string
): Promise<ApplicationNote> {
  const note: ApplicationNote = {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    authorEmail: adminEmail,
    content,
    createdAt: new Date().toISOString(),
  };

  const localKey = `${NOTES_KEY_PREFIX}${appId}`;
  writeLocal(localKey, [note, ...readLocal<ApplicationNote[]>(localKey, [])]);

  const [db, fs] = await Promise.all([requireDb(), getFirestoreModule()]);
  try {
    await fs.setDoc(fs.doc(db, 'applications', appId, 'notes', note.id), note);
  } catch (err) {
    logFirestoreError(err, OperationType.CREATE, `applications/${appId}/notes/${note.id}`);
    throw new Error(GENERIC_FAILURE);
  }

  await logApplicationActivity(appId, 'Added an internal note', adminEmail, content.slice(0, 60));
  return note;
}

// ---------------------------------------------------------------------------
// Review scorecard — persisted to applications/{id}/review/current
// ---------------------------------------------------------------------------

export async function getApplicationReview(appId: string): Promise<ApplicationReview | null> {
  const localKey = `${REVIEWS_KEY_PREFIX}${appId}`;
  const local = readLocal<ApplicationReview | null>(localKey, null);

  try {
    const [db, auth, fs] = await Promise.all([
      requireDb(),
      requireAuth(),
      getFirestoreModule(),
    ]);
    if (!auth.currentUser) return local;

    const docSnap = await fs.getDoc(fs.doc(db, 'applications', appId, 'review', REVIEW_DOC_ID));
    if (!docSnap.exists()) return local;
    const review = docSnap.data() as ApplicationReview;
    writeLocal(localKey, review);
    return review;
  } catch (err) {
    logFirestoreError(err, OperationType.GET, `applications/${appId}/review/${REVIEW_DOC_ID}`);
    return local;
  }
}

export async function saveApplicationReview(
  appId: string,
  review: ApplicationReview
): Promise<void> {
  const localKey = `${REVIEWS_KEY_PREFIX}${appId}`;
  writeLocal(localKey, review);

  const [db, fs] = await Promise.all([requireDb(), getFirestoreModule()]);
  try {
    await fs.setDoc(fs.doc(db, 'applications', appId, 'review', REVIEW_DOC_ID), review);
  } catch (err) {
    logFirestoreError(err, OperationType.WRITE, `applications/${appId}/review/${REVIEW_DOC_ID}`);
    throw new Error(GENERIC_FAILURE);
  }

  await logApplicationActivity(
    appId,
    'Saved internal evaluation scorecard',
    review.reviewedBy || 'Admin'
  );
}

// ---------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------

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

  // Prefix formula-injection triggers so spreadsheets treat the value as text.
  const neutralize = (cell: string) =>
    /^[=+\-@\t\r]/.test(cell) ? `'${cell}` : cell;

  const csvContent = [
    headers.join(','),
    ...rows.map((r) => r.map(neutralize).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Startup_Junction_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
