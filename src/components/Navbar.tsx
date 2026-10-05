import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'What We Do', path: '/#what-we-do' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('/#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(path.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3.5'
          : 'bg-white/80 backdrop-blur-xs border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Tagline */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <img
              src="/startup-junction-logo-150-150.png"
              alt="Startup Junction"
              className="w-10 h-10 rounded-xl shadow-md shadow-[--color-brand-primary]/25 group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent text-xl font-extrabold tracking-tight text-[--color-brand-primary] flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                Startup Junction
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide block -mt-0.5">
                Campus to Company
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
               <button
                key={item.label}
                onClick={() => handleLinkClick(item.path)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === item.path
                    ? 'text-[--color-brand-primary] bg-[--color-brand-primary]/10 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action & Admin entry */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('/apply')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600  text-white text-sm font-semibold hover:bg-[--color-brand-primary-hover] shadow-sm shadow-[--color-brand-primary]/30 transition-all hover:gap-2.5 active:scale-98"
            >
              <span>Join Startup Junction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('/apply')}
              className="px-3 py-1.5 rounded-lg bg-[--color-brand-primary] text-white text-xs font-semibold hover:bg-[--color-brand-primary-hover]"
            >
              Join →
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.path)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                  currentPath === item.path
                    ? 'text-[--color-brand-primary] bg-[--color-brand-primary]/10 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/apply');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-[--color-brand-primary-hover] transition-colors shadow-sm"
            >
              <span>Join Startup Junction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
