import React from 'react';
import { CheckCircle2, MessageSquare, ShieldCheck, Copy, Check, AlertTriangle } from 'lucide-react';
import type { Application } from '../types';

interface ThankYouPageProps {
  application: Application | null;
  onNavigate: (path: string) => void;
}

/**
 * Only the first step has actually happened when this page renders. Steps 2-5
 * are future events and must never be presented as completed work.
 */
const NEXT_STEPS = [
  {
    title: 'Application received',
    desc: 'Your details and startup concepts have been securely logged in our system.',
    done: true,
  },
  {
    title: 'Our team reviews your information',
    desc: 'We assess where we can best provide validation, technical guidance, or team matches.',
    done: false,
  },
  {
    title: 'We contact you on WhatsApp',
    desc: 'A team member will send a message to the number you provided to set up a quick, informal conversation.',
    done: false,
  },
  {
    title: 'We discuss your idea and next steps',
    desc: 'An open dialogue about your problem statement, customer assumptions, and roadmap.',
    done: false,
  },
  {
    title: 'If there is a fit, we start building together',
    desc: 'Collaborate through validation, MVP development, team pairing, and launch.',
    done: false,
  },
] as const;

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ application, onNavigate }) => {
  const [copied, setCopied] = React.useState(false);
  const appId = application?.id ?? null;

  const copyAppId = async () => {
    if (!appId) return;
    try {
      await navigator.clipboard.writeText(appId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  // No application in state means this page was reached by refresh, back
  // button, or a shared link. Show a recovery state instead of inventing an ID.
  if (!application || !appId) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6 text-amber-600">
            <AlertTriangle className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
            We can't find your application
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
            This confirmation page only shows the application you submitted in this browser
            session. If you refreshed or opened this link on a different device, we can't
            recover the reference from here.
          </p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
            If you were not able to submit, please apply again. If you already submitted and
            need your reference number, email{' '}
            <a
              href="mailto:support@startupjunction.in"
              className="text-blue-600 underline underline-offset-2 hover:text-blue-700 font-semibold"
            >
              support@startupjunction.in
            </a>{' '}
            with your email address and we will look it up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/apply')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
            >
              Start an application
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-md shadow-blue-500/10">
          <CheckCircle2 className="w-10 h-10 text-blue-600 stroke-[2.2]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
          Your idea is now with us
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
          Thanks for taking the first step. Our team will review your application and, if we see a
          potential fit, contact you on WhatsApp to understand your idea and goals better.
        </p>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Application ID:
          </span>
          <span className="text-sm font-mono font-bold text-slate-900">{appId}</span>
          <button
            onClick={copyAppId}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors rounded-sm"
            title="Copy ID"
            aria-label="Copy application ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 text-left mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 font-mono mb-4 flex items-center gap-2">
            <span>What happens next?</span>
          </h2>

          <ol className="space-y-4 text-sm">
            {NEXT_STEPS.map((step) => (
              <li key={step.title} className="flex items-start gap-3.5">
                {step.done ? (
                  <div
                    className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                ) : (
                  <div
                    className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <strong className="block text-slate-900 font-semibold">
                    {step.title}
                    <span className="sr-only">{step.done ? ' (completed)' : ' (upcoming)'}</span>
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-start justify-center gap-2 text-xs text-slate-500 mb-8">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span className="text-left">
            Your submission is confidential. We never publish or expose your ideas.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => onNavigate('/how-it-works')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            See how it works
          </button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span>
            Keep this ID handy — we may ask for it when we contact you on WhatsApp.
          </span>
        </p>
      </div>
    </div>
  );
};