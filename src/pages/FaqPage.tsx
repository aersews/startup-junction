import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Eligibility', 'Costs & Terms', 'The Process', 'Idea & Team'];

  const allFaqs = [
    {
      category: 'Costs & Terms',
      q: 'Is it free to join?',
      a: 'Yes. Joining, applying, and receiving mentorship through Startup Junction is completely free. We do not charge application fees, cohort fees, or request equity upfront. Our initiative is dedicated to helping early-stage builders take their first real steps.',
    },
    {
      category: 'Eligibility',
      q: 'Who can apply to Startup Junction?',
      a: 'Anyone can apply! While our initial grassroots focus is working closely with students and engineering/B.Tech colleges in Bihar (such as in Patna, Bhagalpur, Muzaffarpur, Gaya, Darbhanga), anyone from any state, university, branch, degree, or background is welcome.',
    },
    {
      category: 'Idea & Team',
      q: 'Do I need a finalized startup idea to apply?',
      a: 'No. Having an idea helps, but you can also join if you want to build something and need help figuring out what to build. If you have coding, design, or business skills, we can also connect you with other founders looking for teammates.',
    },
    {
      category: 'Idea & Team',
      q: 'Do I need to already have a team or co-founders?',
      a: 'No. You can apply individually as a solo builder, or you can apply with an existing team. One of the core ways we help is identifying the complementary skills your project needs and helping you find potential collaborators.',
    },
    {
      category: 'Eligibility',
      q: 'Do I need technical or programming skills?',
      a: 'No. Successful startups require a combination of customer insight, sales, design, operations, marketing, and subject matter understanding. Non-technical students are just as vital as engineers.',
    },
    {
      category: 'The Process',
      q: 'What happens after I submit my application?',
      a: 'Our core team reviews your submission. If we see a potential fit where our network and guidance can help your journey, a team member will reach out to you directly on WhatsApp to set up an informal discussion about your idea and next steps.',
    },
    {
      category: 'The Process',
      q: 'Does Startup Junction guarantee that my idea will become a company or get funded?',
      a: 'No. We cannot guarantee that every idea will turn into a registered company, secure venture funding, or succeed commercially. We help you explore, validate, build, and test promising opportunities based on market reality, user commitment, and execution quality.',
    },
    {
      category: 'Costs & Terms',
      q: 'How do you protect the confidentiality of my idea?',
      a: 'We take idea confidentiality very seriously. Your application and startup concepts are never published publicly, listed in marketing materials, or visible to unauthenticated visitors. Only authorized Startup Junction administrators can access your details.',
    },
    {
      category: 'Eligibility',
      q: 'Why is Startup Junction focusing initially on Bihar?',
      a: 'Bihar has tens of thousands of exceptionally sharp, hardworking students across engineering, diploma, and degree institutions who often lack early-stage mentorship, localized peer networks, and practical commercial direction. We believe great innovation should start from regional talent hubs. However, Bihar is our launchpad, not our limit.',
    },
    {
      category: 'The Process',
      q: 'How much time do I need to commit as a student?',
      a: 'We understand you have classes, exams, and lab sessions. Most student builders commit between 5 to 15 hours per week during the validation and early prototyping stages.',
    },
  ];

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge & Clarifications</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Everything you need to know about Startup Junction, eligibility, confidentiality, and our
          support process.
        </p>
      </div>

      {/* Search Bar & Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. fees, team, WhatsApp, Bihar, funding)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-blue-600 transition-colors focus:outline-hidden"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p className="mb-3">{faq.a}</p>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-mono font-semibold">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
            <p className="font-semibold text-slate-800">No questions found</p>
            <p className="text-xs mt-1">Try another search keyword or clear your query.</p>
          </div>
        )}
      </div>

      {/* Reassurance Box */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            Still have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Submit your application with whatever questions you have, or discuss them during our
            WhatsApp connect call.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/apply')}
          className="shrink-0 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs"
        >
          Apply to Startup Junction →
        </button>
      </div>
    </div>
  );
};
