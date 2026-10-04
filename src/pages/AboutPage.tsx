import React from 'react';
import { Sparkles, ArrowRight, Heart, Shield, Compass, Lightbulb, Users, Check } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
          We believe great ideas can come from anywhere.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Startup Junction was created around a simple, grounded observation about talent,
          curiosity, and the early journey of building.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 text-base sm:text-lg text-slate-700 leading-relaxed">
        <div className="space-y-4">
          <p>
            A student sitting in a college classroom in Patna, Bhagalpur, or Muzaffarpur can notice an
            acute everyday problem that thousands of people face—in farming, local logistics,
            education, or small businesses.
          </p>
          <p>
            A developer can build a fast, useful piece of software during a weekend hackathon without
            knowing how to find real paying customers or turn it into a sustainable enterprise.
          </p>
          <p>
            A passionate team can possess the drive and work ethic to build, but lack the strategic
            direction, seasoned feedback, or peer support needed to move beyond the campus gate.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-blue-950 font-medium">
          <p className="text-base sm:text-lg">
            Startup Junction exists to help bridge that gap. We're building a place where people can
            bring their ideas, skills and curiosity—and find the guidance, people and practical
            support needed to take the next step.
          </p>
        </div>

        {/* Our Mission */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Our Mission
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3">
            Make it easier for ambitious people to turn meaningful ideas into real-world ventures.
          </h2>
          <p className="text-slate-600 text-base">
            Not through buzzwords, fake hype, or superficial networking events—but through direct,
            transparent, hands-on problem solving, customer validation, and genuine technical
            execution.
          </p>
        </div>

        {/* Starting Small, Building for the Long Term */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Roots & Horizon
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3">
            Starting small. Building for the long term.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-4">
            We're starting by working closely with students and colleges in Bihar, especially
            engineering and B.Tech communities. Our ambition, however, is much bigger: to create an
            ecosystem where ideas can find people, people can find opportunities, and promising
            projects can become real companies.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Whether you are enrolled in a state engineering college in Bihar or studying anywhere
            across India, our door is open. Bihar is our starting point, not our boundary.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center font-['Plus_Jakarta_Sans']">
          How We Work With You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-['Plus_Jakarta_Sans']">
              Complete Idea Privacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never broadcast your concept or intellectual property. Applications are only viewed
              by the core review team.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-['Plus_Jakarta_Sans']">
              Zero Upfront Charges
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Applying and participating in early validation and mentorship carries no fees. We do
              not sell courses or certificates.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-['Plus_Jakarta_Sans']">
              Honest Feedback
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We will tell you the truth about market viability, customer reluctance, and technical
              feasibility so you don't waste precious time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('/apply')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all hover:gap-3"
        >
          <span>Apply to Startup Junction</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
