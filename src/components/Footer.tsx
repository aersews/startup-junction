import React from 'react';
import { Sparkles, Mail, MessageSquare, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[--color-brand-primary] flex items-center justify-center text-white shadow-md shadow-[--color-brand-primary]/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[--color-brand-primary] font-['Plus_Jakarta_Sans']">
                Startup Junction
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Helping ambitious students and aspiring founders turn promising ideas into real
              products, cohesive teams, and sustainable ventures.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[--color-brand-primary]/10 border border-[--color-brand-primary]/20 text-[--color-brand-accent] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[--color-brand-accent] animate-pulse"></span>
              Free to join • No fees • Starting from Bihar
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/apply');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[--color-brand-primary] hover:text-[--color-brand-accent] font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Trust & Integrity</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy & Idea Confidentiality
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Founder Principles
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location Placeholder */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[--color-brand-primary] mt-0.5 shrink-0" />
                <span>
                  <strong className="block text-slate-300">Official Inquiries</strong>
                  <a
                    href="mailto:support@startupjunction.in"
                    className="hover:text-white hover:underline underline-offset-2 break-all"
                  >
                    support@startupjunction.in
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="block text-slate-300">WhatsApp Connect</strong>
                  We message you on WhatsApp after reviewing your application
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                {/* TODO(owner): replace with the organisation's real postal address. */}
                <span>{'Muzaffarpur, Bihar, India'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Startup Junction. All rights reserved.</p>
          <p className="text-center sm:text-right text-slate-400">
            You have the idea. Let's build what comes next.
          </p>
        </div>
      </div>
    </footer>
  );
};
