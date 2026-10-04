import React, { useState } from 'react';
import { Lightbulb, Users, Compass, Cpu, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

      const steps = [
        {
          id: 0,
          title: 'Idea',
          tag: '01 Stage',
          desc: 'Raw problem, insight, or college project spark',
          icon: Lightbulb,
          color: '#00C8FA',
          badge: 'Unvalidated',
        },
        {
          id: 1,
          title: 'Mentor',
          tag: '02 Guidance',
          desc: 'Clarity on next steps, real customer talk & feasibility',
          icon: Compass,
          color: '#3B82F6',
          badge: 'Directions',
        },
        {
          id: 2,
          title: 'Team',
          tag: '03 People',
          desc: 'Complementary coders, designers & operators',
          icon: Users,
          color: '#1D4ED8',
          badge: 'Collaboration',
        },
        {
          id: 3,
          title: 'Product',
          tag: '04 Build',
          desc: 'First testable prototype & real-world MVP',
          icon: Cpu,
          color: '#1E40AF',
          badge: 'Execution',
        },
        {
          id: 4,
          title: 'Startup',
          tag: '05 Launch',
          desc: 'Real user feedback, traction & sustainable entity',
          icon: Rocket,
          color: '#00C8FA',
          badge: 'Possibility',
        },
      ];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 via-sky-50 to-indigo-100 rounded-3xl blur-2xl opacity-70 -z-10"></div>

      {/* Main Container Card */}
      <div className="relative bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-blue-900/5 p-6 sm:p-7 overflow-hidden">
        {/* Header bar indicating progression */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              The Journey Framework
            </span>
          </div>
          <span className="text-[11px] font-medium text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-full border border-blue-50/80">
            Interactive Blueprint
          </span>
        </div>

        {/* Central visual journey nodes */}
        <div className="py-6">
          <div className="flex items-center justify-between relative mb-6">
            {/* Connecting baseline */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 -z-0"></div>
            {/* Active connecting highlight */}
            <div
              className="absolute top-1/2 left-4 h-0.5 bg-[#00C8FA] -translate-y-1/2 transition-all duration-300 -z-0"
              style={{ width: `${(activeNode / 4) * 88}%` }}
            ></div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeNode === idx;
              const isPassed = activeNode >= idx;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveNode(idx)}
                  className={`relative z-10 flex flex-col items-center group focus:outline-hidden transition-all duration-200 ${
                    isActive ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-50/80 ring-4 ring-blue-50/80'
                        : isPassed
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-2 transition-colors ${
                      isActive ? 'text-[#00C8FA]' : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Info Display */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80 transition-all duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#00C8FA] uppercase tracking-wider block">
                  {steps[activeNode].tag}
                </span>
                <h4 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                  <span>{steps[activeNode].title}</span>
                  <span className="text-xs px-2 py-0.5 bg-white border border-slate-200 rounded-md font-medium text-slate-600">
                    {steps[activeNode].badge}
                  </span>
                </h4>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-blue-600 flex items-center justify-center shrink-0">
                {React.createElement(steps[activeNode].icon, { className: 'w-4 h-4' })}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              {steps[activeNode].desc}
            </p>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Startup Junction guided stage
              </span>
              <button
                onClick={() => setActiveNode((prev) => (prev + 1) % steps.length)}
                className="text-blue-600 font-semibold hover:text-blue-500 flex items-center gap-1"
              >
                <span>Next stage</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Small reassuring footer bar */}
        <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FA]"></span>
            Non-transactional mentorship
          </span>
          <span className="text-slate-400">Zero upfront fees</span>
        </div>
      </div>
    </div>
  );
};
