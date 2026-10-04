import React from 'react';
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-10">
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Principles of Participation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
          Terms & Founder Principles
        </h1>
        <p className="text-xs text-slate-500 font-mono">Last updated: October 2026</p>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            1. Nature of Startup Junction
          </h2>
          <p>
            Startup Junction is an independent ecosystem initiative designed to support aspiring
            founders and students in turning raw ideas into tangible products and ventures.
            Participation is voluntary and free of charge.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            2. No Guarantees of Venture Outcome
          </h2>
          <p>
            Building a startup involves inherent market uncertainty, execution risks, and customer
            adoption hurdles. Startup Junction does not guarantee that any project, prototype, or
            concept explored through our platform will achieve commercial viability, secure
            external investment, win competitions, or result in an incorporated company.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            3. Founder Integrity & Accuracy
          </h2>
          <p>
            Applicants agree to provide accurate, honest information about their current education,
            skills, and project stage. We value authentic early-stage honesty over exaggerated or
            fictitious metrics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            4. Mutual Respect & Conduct
          </h2>
          <p>
            All founders, mentors, and collaborators are expected to maintain professional,
            constructive, and respectful communication across all discussions, calls, and WhatsApp
            channels.
          </p>
        </section>
      </div>
    </div>
  );
};
