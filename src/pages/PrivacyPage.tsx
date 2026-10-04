import React from 'react';
import { ShieldCheck, Lock, EyeOff, Mail, ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Protection & Idea Safeguard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
          Privacy Policy & Idea Confidentiality
        </h1>
        <p className="text-xs text-slate-500 font-mono">Last updated: October 2026</p>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Core Idea Guarantee */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-blue-900">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Our Uncompromising Pledge on Startup Ideas</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-900/90 leading-relaxed">
            Your startup ideas, problem formulations, and concepts belong entirely to you. We do not
            claim any ownership, patent rights, or intellectual property rights over any concept you
            share with Startup Junction. Your submissions will NEVER be publicly displayed, indexed
            by search engines, or shared with third parties without your explicit prior permission.
          </p>
        </div>

        {/* 1. What Data We Collect */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            1. What Information We Collect
          </h2>
          <p>
            When you complete an application to join Startup Junction, we collect the following
            categories of information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
            <li>
              <strong>Personal Contact Information:</strong> Full name, email address, WhatsApp
              contact number, and city/state of residence.
            </li>
            <li>
              <strong>Educational Background:</strong> College or university name, degree, branch,
              semester, and expected graduation year.
            </li>
            <li>
              <strong>Skills & Portfolio:</strong> Self-reported technical and business capabilities,
              GitHub/portfolio links, and descriptions of past projects built.
            </li>
            <li>
              <strong>Idea Details:</strong> Problem statements, target users, proposed solutions,
              stage of development, and team status.
            </li>
            <li>
              <strong>Applicant Intent:</strong> Stated seriousness, weekly time commitment, and
              personal motivation.
            </li>
          </ul>
        </section>

        {/* 2. Why We Collect It */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            2. How and Why We Use This Information
          </h2>
          <p>We use your information exclusively to:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
            <li>Review your application to assess where Startup Junction can deliver practical help.</li>
            <li>
              Contact you directly on WhatsApp to coordinate exploratory calls and next steps.
            </li>
            <li>Match your needs with mentors, technical collaborators, or team members.</li>
            <li>Analyze aggregate, anonymized operational metrics (e.g., total applications by district).</li>
          </ul>
        </section>

        {/* 3. Who Has Access */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            3. Who Has Access to Your Data
          </h2>
          <p>
            Only authorized, verified administrators and mentors bound by internal confidentiality
            agreements have access to submitted applications. We do not sell, rent, or trade your
            personal information or startup concepts to advertisers or commercial data brokers.
          </p>
        </section>

        {/* 4. Contact Us */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            4. Data Inquiries & Deletion Requests
          </h2>
          <p>
            You can request access to your submitted data, request corrections, or request complete
            deletion of your application record at any time by contacting our team:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p>
              <strong>Email:</strong> support@startupjunction.in
            </p>
            <p>
              <strong>Subject line:</strong> Data Access / Deletion Request
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
