import React from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Users,
  Search,
  CheckCircle2,
  Cpu,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Join & Share Your Story',
      summary: 'Tell us about yourself, your background, skills, and current ambitions.',
      details: [
        'Complete the simple multi-step application form.',
        'Share your college, degree, or current technical/creative strengths.',
        'No polished pitch deck, slides, or business model canvas required.',
      ],
      icon: Users,
    },
    {
      num: '02',
      title: 'Share Your Idea or Problem',
      summary: 'What observation or gap in the world do you want to solve?',
      details: [
        'Whether it is a rough observation from college life or a functional prototype, write it in plain words.',
        'If you do not have an idea yet, simply state your interest in joining a high-potential project.',
        'All submissions are kept strictly private and never exposed to the public.',
      ],
      icon: Search,
    },
    {
      num: '03',
      title: 'Review by Our Core Team',
      summary: 'We evaluate your submission based on intent, clarity, and where we can add real value.',
      details: [
        'We look for genuine problem awareness, founder curiosity, and willingness to learn.',
        'We determine whether our mentors, network, or technical peers are the right match.',
        'We prioritize depth and commitment over polished corporate terminology.',
      ],
      icon: CheckCircle2,
    },
    {
      num: '04',
      title: 'WhatsApp Connect & Discussion',
      summary: 'If there appears to be a good fit, we contact you directly on WhatsApp.',
      details: [
        'A team member reaches out on the WhatsApp number provided in your application.',
        'We schedule an informal introductory voice or video discussion.',
        'We explore what you need most: validation, co-founders, technical help, or customer discovery.',
      ],
      icon: MessageSquare,
    },
    {
      num: '05',
      title: 'We Build Together',
      summary: 'Hands-on execution along the full startup gestation pathway.',
      details: [
        'Validate problem assumptions by talking to real target users.',
        'Assemble or complete your founding team with complementary skillsets.',
        'Build a lightweight, functional Minimum Viable Product (MVP).',
        'Acquire your initial non-paying or paying test users and iterate rapidly.',
      ],
      icon: Cpu,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Path From Thought to Entity</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
          How Startup Junction Works
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          From the moment you fill out the application to testing your first MVP with real users,
          here is exactly what happens.
        </p>
      </div>

      {/* 5-Step Detailed Roadmap */}
      <div className="space-y-8">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:border-blue-400 transition-all flex flex-col md:flex-row gap-6 md:gap-8 items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-mono font-black text-2xl flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                {st.num}
              </div>

              <div className="space-y-3 grow">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                    {st.title}
                  </h2>
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 font-medium">{st.summary}</p>

                <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-600">
                  {st.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Core Transformation Journey */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-6">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block">
          The Long-Term Arc
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white">
          Idea → Validation → Team → Product → Users → Startup
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          Most startup failures happen not because the code was bad, but because founders spent
          months building something nobody actually wanted. We structure the journey to save you
          time, validate early, and build with conviction.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-medium">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-blue-400 block mb-1">Phase 1</span>
            <strong>Customer Discovery</strong>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-blue-400 block mb-1">Phase 2</span>
            <strong>Proof of Concept (POC)</strong>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-blue-400 block mb-1">Phase 3</span>
            <strong>Team Complementarity</strong>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-blue-400 block mb-1">Phase 4</span>
            <strong>Live MVP Testing</strong>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-blue-400 block mb-1">Phase 5</span>
            <strong>Early Retention</strong>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-blue-400 block mb-1">Phase 6</span>
            <strong>Venture Strategy</strong>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
          Ready to begin step 01?
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          It takes roughly 4 to 5 minutes to submit your details. Your draft is auto-saved locally.
        </p>
        <button
          onClick={() => onNavigate('/apply')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all hover:gap-3"
        >
          <span>Start Your Application</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
