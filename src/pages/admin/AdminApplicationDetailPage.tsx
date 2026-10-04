import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MessageSquare,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Layers,
  Sparkles,
  Star,
  Save,
  Check,
  Clock,
  ShieldAlert,
  Send,
  User,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  getApplicationById,
  updateApplicationStatus,
  getApplicationNotes,
  addApplicationNote,
  getApplicationReview,
  saveApplicationReview,
  getApplicationActivities,
} from '../../services/applicationService';
import type {
  Application,
  ApplicationStatus,
  ApplicationNote,
  ApplicationReview,
  ActivityLog,
  AdminUser,
} from '../../types';

interface AdminApplicationDetailPageProps {
  applicationId: string;
  admin: AdminUser;
  onBack: () => void;
}

const ALL_STATUSES: { key: ApplicationStatus; label: string }[] = [
  { key: 'NEW', label: 'NEW' },
  { key: 'UNDER_REVIEW', label: 'UNDER REVIEW' },
  { key: 'CONTACTED', label: 'CONTACTED' },
  { key: 'DISCUSSION', label: 'DISCUSSION' },
  { key: 'SELECTED', label: 'SELECTED' },
  { key: 'ONBOARDING', label: 'ONBOARDING' },
  { key: 'BUILDING', label: 'BUILDING' },
  { key: 'LAUNCHED', label: 'LAUNCHED' },
  { key: 'ON_HOLD', label: 'ON HOLD' },
  { key: 'REJECTED', label: 'REJECTED' },
];

export const AdminApplicationDetailPage: React.FC<AdminApplicationDetailPageProps> = ({
  applicationId,
  admin,
  onBack,
}) => {
  const [app, setApp] = useState<Application | null>(null);
  const [notes, setNotes] = useState<ApplicationNote[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  // Review Matrix Form State
  const [founderPotential, setFounderPotential] = useState(3);
  const [problemStrength, setProblemStrength] = useState(3);
  const [marketPotential, setMarketPotential] = useState(3);
  const [technicalFeasibility, setTechnicalFeasibility] = useState(3);
  const [commitment, setCommitment] = useState(3);
  const [overallAssessment, setOverallAssessment] = useState('');
  const [internalNotesText, setInternalNotesText] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [reviewSaved, setReviewSaved] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const found = await getApplicationById(applicationId);
      setApp(found);

      if (found) {
        const [nList, rData, aList] = await Promise.all([
          getApplicationNotes(found.id),
          getApplicationReview(found.id),
          getApplicationActivities(found.id),
        ]);
        setNotes(nList);
        setActivities(aList);

        if (rData) {
          setFounderPotential(rData.founderPotential || 3);
          setProblemStrength(rData.problemStrength || 3);
          setMarketPotential(rData.marketPotential || 3);
          setTechnicalFeasibility(rData.technicalFeasibility || 3);
          setCommitment(rData.commitment || 3);
          setOverallAssessment(rData.overallAssessment || '');
          setInternalNotesText(rData.internalNotes || '');
          setNextAction(rData.nextAction || '');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [applicationId]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!app) return;
    await updateApplicationStatus(app.id, newStatus, admin.email);
    setApp({ ...app, status: newStatus });
    const updatedActivities = getApplicationActivities(app.id);
    setActivities(updatedActivities);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!app || !newNote.trim()) return;
    const added = await addApplicationNote(app.id, newNote.trim(), admin.email);
    setNotes([added, ...notes]);
    setNewNote('');
    setActivities(getApplicationActivities(app.id));
  };

  const handleSaveReview = async () => {
    if (!app) return;
    const reviewPayload: ApplicationReview = {
      founderPotential,
      problemStrength,
      marketPotential,
      technicalFeasibility,
      commitment,
      overallAssessment: overallAssessment.trim(),
      internalNotes: internalNotesText.trim(),
      nextAction: nextAction.trim(),
      reviewedBy: admin.email,
      updatedAt: new Date().toISOString(),
    };
    await saveApplicationReview(app.id, reviewPayload);
    setReviewSaved(true);
    setActivities(getApplicationActivities(app.id));
    setTimeout(() => setReviewSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-slate-500">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm">Loading application details...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-800 font-bold mb-2">Application not found</p>
        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to applications list
        </button>
      </div>
    );
  }

  const cleanPhone = app.whatsapp.replace(/\D/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi ${app.fullName}, this is from Startup Junction. We have reviewed your application for "${
      app.ideaTitle || 'Startup Junction'
    }". We're really excited about the problem you are exploring and would love to schedule a quick 15-minute voice call this week. Let us know what times work best for you!`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
              {app.fullName}
            </h1>
            <span className="font-mono text-xs px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 font-bold">
              {app.id}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Applied on {new Date(app.createdAt).toLocaleString()} • {app.city}, {app.state}
          </p>
        </div>

        {/* Status Switcher & WhatsApp Action */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* WhatsApp Direct Connect */}
          {cleanPhone && (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact on WhatsApp</span>
            </a>
          )}

          {/* Status Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Status:</span>
            <select
              value={app.status}
              onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
              className="text-xs font-bold text-blue-700 bg-transparent focus:outline-hidden cursor-pointer"
            >
              {ALL_STATUSES.map((st) => (
                <option key={st.key} value={st.key}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Applicant Data (Sections 32) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Founder & Contact Details */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 font-mono">
              01 • Applicant & Contact Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Email</span>
                <a
                  href={`mailto:${app.email}`}
                  className="font-medium text-slate-900 hover:text-blue-600 underline"
                >
                  {app.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">WhatsApp</span>
                <span className="font-semibold text-slate-900 font-mono">{app.whatsapp}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Location</span>
                <span className="font-medium text-slate-900">
                  {app.city}, {app.state}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Profiles</span>
                <div className="flex items-center gap-2">
                  {app.linkedin ? (
                    <a
                      href={app.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400">No LinkedIn</span>
                  )}
                  {app.portfolio && (
                    <a
                      href={app.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      Portfolio <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Education */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 font-mono">
              02 • Academic Background
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <span className="text-slate-400 block mb-0.5">College / Institution</span>
                <span className="font-bold text-slate-900 text-sm">{app.college}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Degree & Branch</span>
                <span className="font-medium text-slate-900">
                  {app.degree} {app.branch ? `— ${app.branch}` : ''}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Current Progress</span>
                <span className="font-medium text-slate-900">
                  {app.currentYear} ({app.currentSemester || 'Semester N/A'}) • Expected Grad:{' '}
                  {app.expectedGraduationYear}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Skills & Previous Projects */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 font-mono">
              03 • Skills & Past Projects
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-1.5">Technical Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {app.technicalSkills && app.technicalSkills.length > 0 ? (
                    app.technicalSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-medium"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">None specified</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1.5">Business & Creative Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {app.businessCreativeSkills && app.businessCreativeSkills.length > 0 ? (
                    app.businessCreativeSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">None specified</span>
                  )}
                </div>
              </div>

              {app.projectsBuilt && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block mb-1">Projects Built / Worked On</span>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {app.projectsBuilt}
                  </p>
                </div>
              )}

              {app.previousExperience && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block mb-1">Previous Experience</span>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {app.previousExperience}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 4: Idea & Problem Statement */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 font-mono">
              04 • The Idea & Problem
            </h2>

            {app.ideaStatus !== 'no_idea_yet' ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Idea / Venture Title</span>
                  <h3 className="text-base font-bold text-slate-900">
                    {app.ideaTitle || 'Untitled Idea'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                  <div>
                    <span className="text-slate-400 block">Stage</span>
                    <strong className="text-slate-800">{app.stage}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Team Setup</span>
                    <strong className="text-slate-800">{app.teamStatus}</strong>
                  </div>
                </div>

                {app.problemStatement && (
                  <div>
                    <span className="text-slate-400 block mb-1">Problem Statement</span>
                    <p className="text-slate-800 bg-blue-50/40 border border-blue-100 p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap">
                      {app.problemStatement}
                    </p>
                  </div>
                )}

                {app.targetUsers && (
                  <div>
                    <span className="text-slate-400 block mb-1">Who Experiences This Problem?</span>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed">
                      {app.targetUsers}
                    </p>
                  </div>
                )}

                {app.solutionDescription && (
                  <div>
                    <span className="text-slate-400 block mb-1">How Solution Works</span>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                      {app.solutionDescription}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 text-slate-600 text-xs italic">
                Applicant applied without an active idea. Looking for a high-potential project or
                teammate pairing.
              </div>
            )}
          </div>

          {/* Card 5: Needs & Commitment */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 font-mono">
              05 • Needs & Founder Mindset
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-1.5">Support Requested</span>
                <div className="flex flex-wrap gap-1.5">
                  {app.needs && app.needs.length > 0 ? (
                    app.needs.map((n) => (
                      <span
                        key={n}
                        className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 font-semibold"
                      >
                        {n}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">None specified</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block">Seriousness</span>
                  <strong className="text-slate-900">{app.seriousness}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block">Time Commitment</span>
                  <strong className="text-slate-900">{app.timeCommitment}</strong>
                </div>
              </div>

              {app.motivation && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block mb-1">Personal Motivation</span>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {app.motivation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Internal Admin Review, Notes, Activity (Sections 33 & 34) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 33. INTERNAL REVIEW MATRIX (Admin Only) */}
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Plus_Jakarta_Sans']">
                  Internal Review Scorecard
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                Confidential • Admin Only
              </span>
            </div>

            {/* 1-5 Rating Selectors */}
            <div className="space-y-3 text-xs">
              {[
                { label: 'Founder Potential', val: founderPotential, setter: setFounderPotential },
                { label: 'Problem Strength', val: problemStrength, setter: setProblemStrength },
                { label: 'Market Potential', val: marketPotential, setter: setMarketPotential },
                {
                  label: 'Technical Feasibility',
                  val: technicalFeasibility,
                  setter: setTechnicalFeasibility,
                },
                { label: 'Commitment & Drive', val: commitment, setter: setCommitment },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">{item.label}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => item.setter(score)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          item.val >= score
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Assessment Textarea */}
            <div className="space-y-1 text-xs">
              <label className="block font-semibold text-slate-700">Overall Assessment</label>
              <textarea
                rows={2}
                value={overallAssessment}
                onChange={(e) => setOverallAssessment(e.target.value)}
                placeholder="Core strengths, key doubts, or fit for Startup Junction..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600"
              />
            </div>

            {/* Internal Notes Textarea */}
            <div className="space-y-1 text-xs">
              <label className="block font-semibold text-slate-700">Internal Evaluation Notes</label>
              <textarea
                rows={2}
                value={internalNotesText}
                onChange={(e) => setInternalNotesText(e.target.value)}
                placeholder="Mentors to connect, potential teammates, background check..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600"
              />
            </div>

            {/* Recommended Next Action */}
            <div className="space-y-1 text-xs">
              <label className="block font-semibold text-slate-700">Next Action</label>
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="e.g. Schedule WhatsApp call on Friday with Tech Lead"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <button
              onClick={handleSaveReview}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              {reviewSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Review Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Review Scorecard</span>
                </>
              )}
            </button>
          </div>

          {/* Internal Discussion Notes (Thread) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Admin Notes & Timeline
            </h3>

            {/* Add note */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={2}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note or call summary..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Post Note</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
              {notes.length > 0 ? (
                notes.map((n) => (
                  <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-slate-700">{n.authorEmail}</span>
                      <span>{new Date(n.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{n.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400 italic">No notes posted yet.</p>
              )}
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Audit Activity Log
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-2 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-800 font-medium">{act.action}</span>
                    <span className="text-slate-400 block text-[10px]">
                      By {act.performedBy} • {new Date(act.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
