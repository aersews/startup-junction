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

const container =
  'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const primaryButton =
  'group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(37,99,235,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_40px_rgba(37,99,235,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20';

const secondaryButton =
  'group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/10';

const SectionLabel = ({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] ${
      dark ? 'text-blue-400' : 'text-blue-600'
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        dark ? 'bg-blue-400' : 'bg-blue-600'
      }`}
    />
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
    type="button"
    onClick={onClick}
    className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/15"
  >
    {children}
    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  </button>
);

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const journey = [
    {
      number: '01',
      title: 'Idea',
      text: 'Bring us an idea, problem, observation or opportunity you cannot stop thinking about.',
      icon: Lightbulb,
    },
    {
      number: '02',
      title: 'Validate',
      text: 'Talk to people, test assumptions and understand whether the problem is worth solving.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Build',
      text: 'Find the right people, shape the product and create the smallest useful version.',
      icon: Code,
    },
    {
      number: '04',
      title: 'Launch',
      text: 'Put it in front of real users, collect honest feedback and learn from reality.',
      icon: Rocket,
    },
    {
      number: '05',
      title: 'Grow',
      text: 'If the opportunity is strong, keep building toward something sustainable.',
      icon: TrendingUp,
    },
  ];

  const support = [
    {
      icon: Lightbulb,
      title: 'Idea validation',
      text: 'Before you spend months building, understand the problem, users and assumptions behind the idea.',
    },
    {
      icon: Users,
      title: 'Team building',
      text: 'Find the skills and people your idea needs—or figure out what is missing from your current team.',
    },
    {
      icon: Cpu,
      title: 'Product & MVP',
      text: 'Move from a rough concept to a prototype and eventually something people can actually use.',
    },
    {
      icon: Compass,
      title: 'Mentorship',
      text: 'Get practical guidance when you are unsure about product, customers, strategy or your next move.',
    },
    {
      icon: TrendingUp,
      title: 'Business & market',
      text: 'Explore customers, alternatives, competition, business models and whether a real opportunity exists.',
    },
    {
      icon: Briefcase,
      title: 'Startup building',
      text: 'If the signal is strong, continue from early experimentation toward a real venture.',
    },
  ];

  const people = [
    { label: 'Students', icon: Target },
    { label: 'First-time founders', icon: Sparkles },
    { label: 'Developers & builders', icon: Code },
    { label: 'Designers', icon: Palette },
    { label: 'Researchers', icon: Atom },
    { label: 'Business minds', icon: FileSpreadsheet },
    { label: 'People with ideas', icon: Lightbulb },
    { label: 'Curious builders', icon: Layers },
    { label: 'Existing teams', icon: Users },
  ];

  const faqs = [
    {
      q: 'Is Startup Junction free?',
      a: 'Yes. Applying to and joining Startup Junction is currently free.',
    },
    {
      q: 'Who can apply?',
      a: 'Anyone can apply. We especially encourage students and aspiring young founders, but you do not need to be from a particular college, degree, branch or state.',
    },
    {
      q: 'Do I need a startup idea?',
      a: 'No. You can apply with an idea, a problem you want to solve, a useful skill, an existing project—or simply the desire to build something.',
    },
    {
      q: 'Do I need a team?',
      a: 'No. You can apply alone, with an existing team, or because you are looking for people with complementary skills.',
    },
    {
      q: 'Do I need technical skills?',
      a: 'No. Startups need many kinds of skills, including design, research, marketing, sales, operations, communication and business thinking.',
    },
    {
      q: 'What happens after I apply?',
      a: 'We review your application. If we believe there may be a good fit, we contact you on WhatsApp to understand your idea, goals and next steps.',
    },
    {
      q: 'Does Startup Junction guarantee funding or startup success?',
      a: 'No. We cannot guarantee funding, success or that every idea will become a company. Our role is to help promising ideas get tested, built and moved forward.',
    },
    {
      q: 'Can I apply from outside Bihar?',
      a: 'Yes. Bihar is where we are starting, but applications are open across India.',
    },
  ];

  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate overflow-hidden border-b border-blue-100 bg-[#EFF6FF]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-blue-300/25 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-72 h-[500px] w-[500px] rounded-full bg-cyan-200/20 blur-3xl"
        />

        <div className={`${container} relative`}>
          <div className="grid min-h-[720px] items-center gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">

            <div className="lg:col-span-7">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Sparkles className="h-3 w-3" />
                </span>
                A place to start building
              </div>

              <h1 className="max-w-4xl text-[3.35rem] font-black leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-[78px]">
                You have the idea.
                <span className="relative block text-blue-600">
                  Let's build what comes next.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 left-1 h-1 w-24 rounded-full bg-blue-600/20 sm:w-36"
                  />
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Startup Junction helps students and aspiring founders turn
                ideas, problems and skills into real-world projects—and
                potentially startups—with practical guidance, people and
                support along the way.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onNavigate('/apply')}
                  className={`${primaryButton} w-full sm:w-auto`}
                >
                  Join Startup Junction
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
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

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Free to join
                </span>

                <span className="hidden text-slate-300 sm:inline">
                  •
                </span>

                <span>Open across India</span>

                <span className="hidden text-slate-300 sm:inline">
                  •
                </span>

                <span>Starting from Bihar</span>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl"
              />

              <div className="relative rounded-[2rem] border border-blue-100 bg-white/75 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                <HeroVisual />
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      No perfect pitch required
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Your idea can still be rough.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          CLARITY STRIP
      ========================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className={`${container} py-7`}>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-950">
                An idea is a starting point—not a finished startup.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                We help you figure out what deserves to happen next.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['Idea', 'Validate', 'Team', 'Build', 'Users', 'Startup'].map(
                (item, index) => (
                  <React.Fragment key={item}>
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                        index === 0 || index === 5
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item}
                    </span>

                    {index < 5 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3 w-3 text-slate-300"
                      />
                    )}
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROBLEM / POSITIONING
      ========================================================== */}
      <section className="py-24 sm:py-32">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel>The problem</SectionLabel>

              <h2 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-slate-950 sm:text-6xl">
                Having an idea is easy.
                <span className="block text-blue-600">
                  Knowing what to do next isn't.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                You might know the problem. You might know how to build.
                You might simply have a feeling that something could be
                better.
              </p>

              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-900 sm:text-lg">
                Startup Junction exists to help turn that uncertainty into
                your next useful step.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Lightbulb,
                title: 'You have an idea',
                text: 'But you do not know whether it solves a problem people actually care about.',
              },
              {
                icon: Users,
                title: 'You need people',
                text: 'You can build alone, but the right skills, perspective or teammate could change everything.',
              },
              {
                icon: Compass,
                title: 'You need direction',
                text: 'You want to move, but you are unsure what the next step should actually be.',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-950">
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
      </section>

      {/* =========================================================
          JOURNEY
      ========================================================== */}
      <section className="border-y border-slate-200 bg-white py-24 sm:py-32">
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel>What comes next</SectionLabel>

              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-6xl">
                From an early idea
                <span className="text-blue-600"> to something real.</span>
              </h2>
            </div>

            <div className="flex items-end lg:col-span-5">
              <p className="max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                There is no guaranteed path from idea to company. There is,
                however, a better way to learn what deserves to happen next.
              </p>
            </div>
          </div>

          <div className="mt-16 border-y border-slate-200">
            {journey.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group grid gap-6 border-b border-slate-200 py-8 last:border-0 sm:grid-cols-[72px_1fr_2fr] sm:items-center sm:gap-10 sm:py-10"
                >
                  <div className="font-mono text-sm font-bold text-blue-600">
                    {item.number}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                      {item.title}
                    </h3>
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          NOT READY
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className={`${container} relative`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel dark>You don't need to be ready</SectionLabel>

              <h2 className="text-4xl font-black text-white leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                You don't need
                <span className="block text-blue-400">
                  everything figured out.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-base leading-7 text-slate-400 lg:col-span-5 lg:pb-1 lg:text-lg">
              You don't need a perfect business plan, a complete team or a
              founder title. You need enough curiosity to take the next step.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {[
              {
                quote: 'I have an idea.',
                answer:
                  'Good. Let’s understand the problem and find out whether it is worth building around.',
                icon: Lightbulb,
              },
              {
                quote: 'I need a team.',
                answer:
                  'Tell us what you can do and what is missing. We can help you think through the skills your idea needs.',
                icon: Users,
              },
              {
                quote: 'I can build, but need direction.',
                answer:
                  'Bring the technical ability. We will help you think through users, product and the business side.',
                icon: Cpu,
              },
              {
                quote: 'I already started.',
                answer:
                  'Great. We can help you identify what to test, what to improve and what deserves attention next.',
                icon: Zap,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.quote}
                  className="bg-white/[0.045] p-7 transition-colors duration-200 hover:bg-white/[0.08] sm:p-9"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6 text-blue-400"
                  />

                  <h3 className="mt-7 text-xl font-bold text-white">
                    “{item.quote}”
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                    {item.answer}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/apply')}
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
          >
            Tell us where you are
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* =========================================================
          WHAT WE DO
      ========================================================== */}
      <section
        id="what-we-do"
        className="scroll-mt-24 py-24 sm:py-32"
      >
        <div className={container}>
          <div className="max-w-3xl">
            <SectionLabel>Practical support</SectionLabel>

            <h2 className="text-4xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-6xl">
              From the first question
              <span className="text-blue-600"> to the first version.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              We focus on the problems that actually slow builders down—not
              startup jargon for the sake of sounding like a startup.
            </p>
          </div>

          <div className="mt-16 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {support.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group border-b border-r border-slate-200 bg-white p-7 transition-colors duration-200 hover:bg-blue-50/50 sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-lg font-bold text-slate-950">
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
      </section>

      {/* =========================================================
          WHO CAN JOIN
      ========================================================== */}
      <section className="pb-24 sm:pb-32">
        <div className={container}>
          <div className="overflow-hidden rounded-[2rem] bg-blue-600 shadow-[0_30px_80px_rgba(37,99,235,0.18)]">
            <div className="grid lg:grid-cols-12">
              <div className="p-8 text-white sm:p-12 lg:col-span-5 lg:p-14">
                <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100">
                  Who can join
                </div>

                <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl">
                  You don't have to be a
                  <span className="block text-blue-200">
                    “founder” already.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-blue-100 sm:text-base">
                  You can come with an idea, a skill, a problem you want to
                  solve—or simply the willingness to build.
                </p>

                <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />

                    <p className="text-sm font-semibold leading-6 text-white">
                      No perfect pitch.
                      <br />
                      No startup degree.
                      <br />
                      No founder label required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-10 lg:col-span-7 lg:p-12">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {people.map((person) => {
                    const Icon = person.icon;

                    return (
                      <div
                        key={person.label}
                        className="flex min-h-[105px] flex-col items-center justify-center border border-slate-200 bg-slate-50 p-4 text-center transition-all duration-200 hover:border-blue-200 hover:bg-blue-50"
                      >
                        <Icon
                          aria-hidden="true"
                          className="mb-3 h-5 w-5 text-blue-600"
                        />

                        <span className="text-xs font-bold leading-4 text-slate-700 sm:text-sm">
                          {person.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('/apply')}
                  className={`${primaryButton} mt-5 w-full`}
                >
                  Join Startup Junction
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
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
        className="scroll-mt-24 border-y border-slate-200 bg-white"
      >
        <div className={container}>
          <div className="grid min-h-[620px] items-center gap-14 py-24 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <SectionLabel>Where we begin</SectionLabel>

              <h2 className="text-4xl font-black leading-[1.03] tracking-[-0.045em] text-slate-950 sm:text-6xl">
                Starting in Bihar.
                <span className="block text-blue-600">
                  Thinking beyond it.
                </span>
              </h2>

              <div className="mt-8 max-w-xl space-y-5 text-base leading-7 text-slate-600">
                <p>
                  We're starting close to home, working with students,
                  builders and ambitious young people across Bihar—especially
                  the engineering and B.Tech communities.
                </p>

                <p>
                  But great ideas are not limited by geography. You can apply
                  from any college, course, background or state in India.
                </p>

                <p className="font-bold text-slate-950">
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
                  'Across India',
                ].map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div
                aria-hidden="true"
                className="absolute inset-8 rounded-full bg-blue-100/70 blur-3xl"
              />

              <div className="relative">
                <BiharMapVisual />
              </div>
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
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel>How it works</SectionLabel>

              <h2 className="text-4xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl">
                Simple process.
                <span className="block text-blue-600">
                  Real conversation.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                We don't want a complicated application journey. We want to
                understand what you're trying to do and whether we can
                genuinely help.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-4xl border-t border-slate-200">
            {[
              {
                num: '01',
                title: 'Apply',
                desc: 'Tell us about yourself, your skills and what you want to build.',
              },
              {
                num: '02',
                title: 'Share your thinking',
                desc: 'Give us the problem, idea or opportunity you are exploring—even if it is rough.',
              },
              {
                num: '03',
                title: 'We review',
                desc: 'We look for context, intent and potential areas where we can genuinely contribute.',
              },
              {
                num: '04',
                title: 'We connect',
                desc: 'If there is a potential fit, we contact you on WhatsApp to discuss your idea and next steps.',
              },
              {
                num: '05',
                title: 'You build',
                desc: 'If we move forward together, we work through validation, people, product and execution.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="grid gap-4 border-b border-slate-200 py-7 sm:grid-cols-[70px_180px_1fr] sm:items-center sm:gap-7"
              >
                <span className="font-mono text-sm font-bold text-blue-600">
                  {step.num}
                </span>

                <h3 className="text-lg font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="text-sm leading-6 text-slate-500 sm:text-base">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/apply')}
            className={`${primaryButton} mt-10`}
          >
            Start your application
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="pb-24 sm:pb-32">
        <div className={container}>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-20 sm:px-12 sm:py-28">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-48 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl"
            />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <MessageCircle className="h-5 w-5" />
              </div>

              <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                Your next step starts here
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl">
                Have an idea
                <span className="block text-blue-400">
                  worth exploring?
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Don't leave it in your notebook. Tell us what you're thinking.
                It does not need to be polished—it just needs to be worth
                exploring.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('/apply')}
                className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
              >
                Tell us about your idea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                <span>Free to join</span>
                <span aria-hidden="true">•</span>
                <span>No perfect pitch required</span>
                <span aria-hidden="true">•</span>
                <span>Open across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="border-t border-slate-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <SectionLabel>FAQ</SectionLabel>

            <h2 className="text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Before you ask.
            </h2>

            <p className="mt-4 text-base text-slate-500">
              Straight answers about what Startup Junction is—and what it is
              not.
            </p>
          </div>

          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 py-6 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-600/10"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="text-sm font-bold text-slate-900 sm:text-base">
                      {faq.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen
                          ? 'bg-blue-600 text-white'
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
                    id={answerId}
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-12 text-sm leading-7 text-slate-500">
                        {faq.a}
                      </p>
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
