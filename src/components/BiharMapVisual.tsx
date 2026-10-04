import React from 'react';
import { MapPin, Globe2, Compass, ArrowUpRight } from 'lucide-react';

export const BiharMapVisual: React.FC = () => {
  const hubs = [
    { name: 'Patna', coords: 'top-[42%] left-[45%]', type: 'Anchor Hub' },
    { name: 'Muzaffarpur', coords: 'top-[28%] left-[48%]', type: 'Engineering Cluster' },
    { name: 'Bhagalpur', coords: 'top-[52%] left-[78%]', type: 'Tech & Research' },
    { name: 'Gaya', coords: 'top-[68%] left-[42%]', type: 'Academic Center' },
    { name: 'Darbhanga', coords: 'top-[26%] left-[64%]', type: 'Institutes' },
  ];

  return (
    <div className="relative bg-slate-900 text-white rounded-2xl p-6 sm:p-8 overflow-hidden shadow-xl border border-slate-800">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      {/* Radiant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-50/80 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C8FA] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
              Grassroots Reach
            </span>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/80">
            Open Pan-India
          </span>
        </div>

        {/* Abstract Map Graphic */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-center overflow-hidden mb-6 p-4">
          {/* Subtle schematic outlines */}
          <svg
            className="absolute inset-0 w-full h-full text-[#008CFA]/30"
            viewBox="0 0 400 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* Minimalist geographic curve representing Bihar terrain */}
            <path
              d="M 50 120 Q 120 40 220 70 T 360 110 T 340 180 T 180 200 T 50 120 Z"
              fill="rgba(0, 200, 250, 0.06)"
              stroke="rgba(0, 230, 250, 0.3)"
              strokeDasharray="4 4"
            />
            {/* Expansion vectors reaching out nationwide */}
            <line x1="200" y1="120" x2="60" y2="40" stroke="rgba(0, 200, 250, 0.25)" strokeDasharray="3 3" />
            <line x1="200" y1="120" x2="350" y2="40" stroke="rgba(0, 200, 250, 0.25)" strokeDasharray="3 3" />
            <line x1="200" y1="120" x2="360" y2="210" stroke="rgba(0, 200, 250, 0.25)" strokeDasharray="3 3" />
            <line x1="200" y1="120" x2="40" y2="210" stroke="rgba(0, 200, 250, 0.25)" strokeDasharray="3 3" />
          </svg>

          {/* Regional Hub Pins */}
          {hubs.map((hub, idx) => (
            <div key={hub.name} className={`absolute ${hub.coords} transform -translate-x-1/2 -translate-y-1/2 group`}>
              <div className="relative flex items-center justify-center">
                <span className="absolute w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-30"></span>
                <div className="w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-md shadow-blue-50/80"></div>
                <div className="absolute left-5 bg-slate-900/90 backdrop-blur-xs text-[11px] font-medium text-white px-2 py-0.5 rounded-md border border-slate-700 whitespace-nowrap shadow-md pointer-events-none">
                  {hub.name}
                </div>
              </div>
            </div>
          ))}

          {/* Center Pulsing Anchor */}
          <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold shadow-lg shadow-blue-50/80 border border-blue-50/80">
              Core Launchpad
            </div>
          </div>
        </div>

        {/* Informative Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Grassroots Focus</span>
            <strong className="text-white font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Bihar Engineering & Colleges
            </strong>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Eligibility</span>
            <strong className="text-white font-semibold flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              Open to All Pan-India
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
