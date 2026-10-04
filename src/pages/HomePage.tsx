import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Lightbulb,
  Compass,
  Users,
  Cpu,
  TrendingUp,
  Briefcase,
  ChevronDown,
  Layers,
  ShieldCheck,
  Target,
  Code,
  Palette,
  FileSpreadsheet,
  Atom,
  Zap,
  MessageCircle,
  Rocket,
  Search,
} from 'lucide-react';

import { HeroVisual } from '../components/HeroVisual';
import { BiharMapVisual } from '../components/BiharMapVisual';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const accent =
  'text-[#2563EB]';

const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-[0_14px_35px_rgba(37,99,235,0.28)] active:translate-y-0';

const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50';

const sectionContainer =
  'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const SectionLabel = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">
    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
    {children}
  </div>
);

const ArrowLink = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
  >
    {children}
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </button>
);

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const homeFaqs = [
    {
      q: 'Is it free to join?',
      a: 'Yes. Joining and applying to Startup Junction is currently free. There are no upfront application fees or subscription charges.',
    },
    {
      q: 'Who can apply?',
      a: 'Anyone can apply. We especially welcome students, aspiring founders, developers, designers, researchers and people who simply have a problem they want to solve. Our roots are in Bihar, but applications are open across India.',
    },
    {
      q: 'Do I need a startup idea?',
      a: 'No. You can come with an idea, a problem you have noticed, a skill you want to contribute, or simply the desire to build something with the right people.',
    },
    {
      q: 'What happens after I apply?',
      a: 'We review your application. If there appears to be a meaningful fit, we reach out to start a conversation and understand what you are trying to build.',
    },
    {
      q: 'Will you guarantee that my idea becomes a startup?',
      a: 'No. We do not promise funding, success or that every idea will become a company. We help you test assumptions, build something useful and make better decisions based on what you learn.',
    },
  ];

  const journey = [
    {
      number: '01',
      title: 'Start with the problem',
      text: 'Bring us an idea, frustration, observation or opportunity you cannot stop thinking about.',
      icon: Lightbulb,
    },
    {
      number: '02',
      title: 'Test the assumption',
      text: 'Talk to people. Understand the problem. Find out whether it is actually worth solving.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Build something real',
      text: 'Find the right people, shape the product and create the smallest useful version.',
      icon: Code,
    },
    {
      number: '04',
      title: 'Put it in front of users',
      text: 'Launch early, collect honest feedback and let reality guide what you build next.',
      icon: Rocket,
    },
    {
      number: '05',
      title: 'Decide what comes next',
      text: 'Double down, change direction or move on. The goal is progress, not pretending.',
      icon: TrendingUp,
    },
  ];

  const support = [
    {
      icon: Lightbulb,
      title: 'Idea validation',
      text: 'Turn assumptions into questions, then test them with real people before you spend months building.',
    },
    {
      icon: Users,
      title: 'Find your people',
      text: 'Connect with builders, designers, technical talent and people who can complement what you already bring.',
    },
    {
      icon: Cpu,
      title: 'Build the MVP',
      text: 'Move from rough concept to prototype, product and the first version that someone can actually use.',
    },
    {
      icon: Compass,
      title: 'Mentorship',
      text: 'Get practical guidance when you are stuck on product, customers, strategy or your next decision.',
    },
    {
      icon: TrendingUp,
      title: 'Market thinking',
      text: 'Understand users, alternatives, distribution and whether there is a real opportunity behind the idea.',
    },
    {
      icon: Briefcase,
      title: 'Keep building',
      text: 'If the signal is strong, continue toward a sustainable venture with a clearer direction and stronger foundation.',
    },
  ];

  const people = [
    { label: 'Students', icon: Target },
    { label: 'Aspiring founders', icon: Sparkles },
    { label: 'Developers', icon: Code },
    { label: 'Designers', icon: Palette },
    { label: 'Researchers', icon: Atom },
    { label: 'Business minds', icon: FileSpreadsheet },
    { label: 'Idea people', icon: Lightbulb },
    { label: 'Curious builders', icon: Layers },
    { label: 'Existing teams', icon: Users },
    { label: 'Problem solvers', icon: Compass },
  ];

  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative border-b border-slate-200/70 bg-white">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'linear-gradient(to bottom, black 0%, transparent 90%)',
          }}
        />

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-48 h-[400px] w-[400px] rounded-full bg-cyan-50/70 blur-3xl" />

        <div className={`${sectionContainer} relative`}>
          <div className="grid min-h-[720px] grid-cols-1 items-center gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">

            {/* Hero copy */}
            <div className="lg:col-span-7">
              <div className="mb-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Built for the people who want to start
                </div>
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[76px]">
                Your idea is only
                <span className="block text-blue-600">
                  the beginning.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Startup Junction helps students and early builders go from
                <span className="font-semibold text-slate-900">
                  {' '}“I have an idea”
                </span>
                {' '}to something real — through validation, people,
                product-building and practical guidance.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => onNavigate('/apply')}
                  className={`${primaryButton} w-full sm:w-auto`}
                >
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById('how-it-works')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className={`${secondaryButton} w-full sm:w-auto`}
                >
                  See how it works
                </button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Free to apply
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <span>Open across India</span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <span>Starting from Bihar</span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative lg:col-span-5">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/5 blur-2xl" />
              <div className="relative">
                <HeroVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST / POSITIONING STRIP
      ========================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className={`${sectionContainer} py-6`}>
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Not sure where to start?
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                That's exactly why Startup Junction exists.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Idea',
                'Problem',
                'Team',
                'Prototype',
                'Users',
                'Startup',
              ].map((item, index) => (
                <React.Fragment key={item}>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {item}
                  </span>
                  {index < 5 && (
                    <ArrowRight className="hidden h-3.5 w-3.5 self-center text-slate-300 sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE ACTUALLY DO
      ========================================================== */}
      <section className="py-24 sm:py-32">
        <div className={sectionContainer}>
          <div className="grid items-end gap-10 lg:grid-cols-12">

            <div className="lg:col-span-7">
              <SectionLabel>What we do</SectionLabel>

              <h2 className="max-w-3xl text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                We help you figure out
                <span className="text-blue-600"> what to do next.</span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-base leading-7 text-slate-600 sm:text-lg">
                Most people don't need another motivational speech.
                They need someone to help them turn uncertainty into
                the next useful step.
              </p>
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="grid lg:grid-cols-5">
              {journey.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className={`group relative p-7 sm:p-8 ${
                      index !== journey.length - 1
                        ? 'border-b border-slate-200 lg:border-b-0 lg:border-r'
                        : ''
                    }`}
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-blue-600">
                        {item.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          NO PERFECT IDEA
      ========================================================== */}
      <section className="relative border-y border-slate-200 bg-slate-950 py-24 text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.28),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(6,182,212,0.16),transparent_35%)]" />

        <div className={`${sectionContainer} relative`}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>You can start before you're ready</SectionLabel>

            <h2 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              You don't need
              <span className="text-blue-400"> everything figured out.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              A rough idea is enough. A useful skill is enough.
              A problem you've noticed is enough.
              You don't need a polished pitch deck to begin.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
            {[
              {
                quote: '“I have an idea.”',
                answer:
                  'Good. Let’s find out whether the problem is real before you build around it.',
                icon: Lightbulb,
              },
              {
                quote: '“I need a team.”',
                answer:
                  'Tell us what you can do and what you need. We can help you think about the missing pieces.',
                icon: Users,
              },
              {
                quote: '“I can build, but I need direction.”',
                answer:
                  'Bring the technical ability. We’ll help you think through users, product and the business side.',
                icon: Cpu,
              },
              {
                quote: '“I already started.”',
                answer:
                  'Great. We can help you identify what to test, what to improve and what deserves attention next.',
                icon: Zap,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.quote}
                  className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        {item.quote}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/apply')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Tell us where you are
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUPPORT
      ========================================================== */}
      <section
        id="what-we-do"
        className="scroll-mt-24 py-24 sm:py-32"
      >
        <div className={sectionContainer}>
          <div className="max-w-3xl">
            <SectionLabel>Practical support</SectionLabel>

            <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
              From the first question
              <span className="text-blue-600"> to the first version.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Support is useful only when it helps you make progress.
              That's why we focus on practical problems, not startup jargon.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {support.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-[10px] font-bold tracking-widest text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>

                  <div className="mt-6 h-px w-full bg-slate-100" />

                  <div className="mt-4 text-xs font-bold text-blue-600">
                    Practical, not theoretical
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHO IT'S FOR
      ========================================================== */}
      <section className="pb-24 sm:pb-32">
        <div className={sectionContainer}>
          <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/60">
            <div className="grid lg:grid-cols-12">

              <div className="p-8 sm:p-12 lg:col-span-5 lg:p-14">
                <SectionLabel>Who can join</SectionLabel>

                <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                  You don't need the
                  <span className="text-blue-600"> founder label.</span>
                </h2>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  If you are curious enough to solve problems and
                  serious enough to do the work, there is a place for you here.
                </p>

                <div className="mt-8 flex items-center gap-3 rounded-xl border border-blue-100 bg-white/80 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <p className="text-sm font-semibold leading-5 text-slate-800">
                    No perfect pitch.
                    <br />
                    No startup degree.
                    <br />
                    Just start.
                  </p>
                </div>
              </div>

              <div className="border-t border-blue-100 p-6 sm:p-10 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-12">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {people.map((person) => {
                    const Icon = person.icon;

                    return (
                      <div
                        key={person.label}
                        className="flex min-h-[110px] flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                      >
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon className="h-4 w-4" />
                        </div>

                        <span className="text-xs font-bold leading-4 text-slate-700 sm:text-sm">
                          {person.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => onNavigate('/apply')}
                    className={`${primaryButton} w-full`}
                  >
                    Apply as a builder
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BIHAR
      ========================================================== */}
      <section
        id="bihar"
        className="border-y border-slate-200 bg-white py-24 scroll-mt-24 sm:py-32"
      >
        <div className={sectionContainer}>
          <div className="grid items-center gap-14 lg:grid-cols-12">

            <div className="lg:col-span-6">
              <SectionLabel>Our starting point</SectionLabel>

              <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Starting in Bihar.
                <span className="block text-blue-600">
                  Thinking beyond it.
                </span>
              </h2>

              <div className="mt-7 space-y-5 text-base leading-7 text-slate-600">
                <p>
                  We are starting close to home — working with students,
                  builders and ambitious young people across Bihar.
                </p>

                <p>
                  The goal is simple: make it easier for someone with
                  potential to find the people, feedback and practical
                  direction needed to turn an early idea into something real.
                </p>

                <p className="font-semibold text-slate-900">
                  Bihar is where we begin. It is not where the ambition ends.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Patna',
                  'Bhagalpur',
                  'Muzaffarpur',
                  'Gaya',
                  'Darbhanga',
                  'And beyond',
                ].map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {city}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="flex gap-3">
                  <Zap className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      The core idea
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Great builders should not have to wait until they
                      leave home to find people who believe in what they can build.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <BiharMapVisual />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section
        id="how-it-works"
        className="scroll-mt-24 py-24 sm:py-32"
      >
        <div className={sectionContainer}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>How it works</SectionLabel>

            <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Simple process.
              <span className="text-blue-600"> Real conversation.</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              We don't want a complicated application journey.
              We want to understand what you're trying to do and whether we can help.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            {[
              {
                num: '01',
                title: 'Apply',
                desc: 'Tell us about yourself, your skills and what you want to build.',
              },
              {
                num: '02',
                title: 'Share your thinking',
                desc: 'Give us the problem, idea or opportunity you are exploring — even if it is rough.',
              },
              {
                num: '03',
                title: 'We review',
                desc: 'We look for context, intent and potential areas where we can genuinely contribute.',
              },
              {
                num: '04',
                title: 'We talk',
                desc: 'If there is a fit, we reach out and have a direct conversation about your next step.',
              },
              {
                num: '05',
                title: 'You build',
                desc: 'If we move forward together, we work through validation, people, product and execution.',
              },
            ].map((step, index) => (
              <div
                key={step.num}
                className="relative flex gap-5 border-b border-slate-200 py-7 first:pt-0 last:border-0 sm:gap-7"
              >
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-mono text-sm font-bold text-white shadow-lg shadow-blue-600/20">
                  {step.num}
                </div>

                {index !== 4 && (
                  <div className="absolute left-[21px] top-16 h-[calc(100%-20px)] w-px bg-slate-200" />
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500 sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/apply')}
              className={primaryButton}
            >
              Start your application
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="pb-24 sm:pb-32">
        <div className={sectionContainer}>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-16 text-center shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <MessageCircle className="h-5 w-5" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-400">
                Your next step starts here
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">
                Don't leave the idea
                <span className="block text-blue-400">
                  in your notebook.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Tell us what you're thinking. It does not need to be polished.
                It just needs to be worth exploring.
              </p>

              <div className="mt-9">
                <button
                  onClick={() => onNavigate('/apply')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Tell us about your idea
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                <span>Free to apply</span>
                <span className="text-slate-700">•</span>
                <span>No perfect pitch required</span>
                <span className="text-slate-700">•</span>
                <span>Open across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="border-t border-slate-200 bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <SectionLabel>FAQ</SectionLabel>

            <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Before you ask.
            </h2>

            <p className="mt-4 text-base text-slate-500">
              A few honest answers about how Startup Junction works.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                    isOpen
                      ? 'border-blue-200 shadow-[0_10px_35px_rgba(37,99,235,0.07)]'
                      : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold text-slate-900 sm:text-base">
                      {faq.q}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isOpen
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-6 pt-4 text-sm leading-6 text-slate-500 sm:px-6">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <ArrowLink onClick={() => onNavigate('/faq')}>
              View all questions
            </ArrowLink>
          </div>
        </div>
      </section>

    </main>
  );
};
