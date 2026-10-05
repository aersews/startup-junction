import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { submitApplication } from '../services/applicationService';
import type { Application } from '../types';

interface ApplyPageProps {
  onSuccess: (app: Application) => void;
  onNavigate: (path: string) => void;
}

const INDIAN_STATES = [
  'Bihar',
  'Jharkhand',
  'Uttar Pradesh',
  'Delhi NCR',
  'West Bengal',
  'Maharashtra',
  'Karnataka',
  'Telangana',
  'Tamil Nadu',
  'Rajasthan',
  'Madhya Pradesh',
  'Gujarat',
  'Odisha',
  'Punjab',
  'Haryana',
  'Assam',
  'Uttarakhand',
  'Himachal Pradesh',
  'Chhattisgarh',
  'Kerala',
  'Andhra Pradesh',
  'Other State / UT',
];

const TECHNICAL_SKILLS_LIST = [
  'Web Development',
  'App Development',
  'Frontend',
  'Backend',
  'AI/ML',
  'Data Science',
  'UI/UX',
  'DevOps',
  'Cybersecurity',
  'IoT',
  'Robotics',
  'Cloud Architecture',
  'Embedded Systems',
  'Other',
];

const BUSINESS_SKILLS_LIST = [
  'Marketing',
  'Sales',
  'Business Development',
  'Finance',
  'Operations',
  'Research',
  'Content',
  'Social Media',
  'Design',
  'Communication',
  'Community Building',
  'Other',
];

const NEEDS_LIST = [
  'Idea validation',
  'Mentorship',
  'Technical development',
  'Product/MVP development',
  'Finding teammates',
  'Business strategy',
  'Market research',
  'Marketing',
  'Sales',
  'Networking',
  'Funding guidance',
  'Other',
];

const DRAFT_KEY = 'sj_application_draft';

const stepLabels = [
  'About You',
  'Education',
  'Skills',
  'Your Idea',
  'Needs & Time',
  'Review',
];

const stepDescriptions = [
  'Your contact details',
  'Your academic background',
  'Skills & experience',
  'What you want to build',
  'Support & commitment',
  'Check everything',
];

const inputBase =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200';

const inputNormal =
  `${inputBase} border-slate-200 hover:border-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100`;

const inputError =
  `${inputBase} border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-4 focus:ring-red-100`;

const selectBase =
  'w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100';

const labelClass =
  'mb-2 block text-sm font-semibold text-slate-800';

const optionalClass =
  'ml-1.5 text-xs font-normal text-slate-400';

const requiredClass =
  'ml-1 text-red-500';

const errorTextClass =
  'mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600';

const SectionHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <div className="mb-8">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
      {eyebrow}
    </div>

    <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
      {title}
    </h2>

    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
      {description}
    </p>
  </div>
);

const Field = ({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && <span className={requiredClass}>*</span>}
      {optional && <span className={optionalClass}>(Optional)</span>}
    </label>

    {children}

    {error && (
      <p className={errorTextClass}>
        <AlertCircle className="h-3.5 w-3.5" />
        {error}
      </p>
    )}
  </div>
);

const SelectionCard = ({
  selected,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative rounded-2xl border p-4 text-left transition-all duration-200 ${
      selected
        ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md shadow-cyan-100'
        : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
    }`}
  >
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected
            ? 'border-cyan-500 bg-cyan-500 text-white'
            : 'border-slate-300 bg-white group-hover:border-slate-400'
        }`}
      >
        {selected && <Check className="h-3 w-3 stroke-[3]" />}
      </div>

      <div>
        <span className="block text-sm font-bold text-slate-900">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      </div>
    </div>
  </button>
);

export const ApplyPage: React.FC<ApplyPageProps> = ({
  onSuccess,
  onNavigate,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Personal
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Bihar');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');

  // Education
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('');
  const [currentYear, setCurrentYear] = useState('3rd Year');
  const [currentSemester, setCurrentSemester] = useState('5th Semester');
  const [expectedGraduationYear, setExpectedGraduationYear] =
    useState('2026');

  // Skills
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [businessCreativeSkills, setBusinessCreativeSkills] = useState<
    string[]
  >([]);
  const [projectsBuilt, setProjectsBuilt] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');

  // Idea
  const [ideaStatus, setIdeaStatus] = useState<
    'yes' | 'multiple' | 'building' | 'no_idea_yet'
  >('yes');

  const [ideaTitle, setIdeaTitle] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  const [solutionDescription, setSolutionDescription] = useState('');
  const [stage, setStage] = useState('Just an idea');
  const [teamStatus, setTeamStatus] = useState("I'm working alone");

  // Needs
  const [needs, setNeeds] = useState<string[]>([
    'Idea validation',
    'Mentorship',
  ]);
  const [seriousness, setSeriousness] = useState(
    'I want to work on it seriously'
  );
  const [timeCommitment, setTimeCommitment] =
    useState('10–20 hours/week');
  const [motivation, setMotivation] = useState('');

  // Submission
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Anti-spam. The honeypot is hidden from humans but a bot filling every
  // input will populate it; the timer rejects submissions completed implausibly
  // fast. Neither is visible or announced to assistive technology.
  const [website, setWebsite] = useState('');
  const formStartedAt = useRef(Date.now());
  const MIN_FILL_MS = 8000;

  const completion =
    Math.round(((step - 1) / (totalSteps - 1)) * 100);

  // Restore draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);

      if (!saved) return;

      const d = JSON.parse(saved);

      if (d.fullName) setFullName(d.fullName);
      if (d.email) setEmail(d.email);
      if (d.whatsapp) setWhatsapp(d.whatsapp);
      if (d.city) setCity(d.city);
      if (d.state) setState(d.state);
      if (d.linkedin) setLinkedin(d.linkedin);
      if (d.portfolio) setPortfolio(d.portfolio);

      if (d.college) setCollege(d.college);
      if (d.degree) setDegree(d.degree);
      if (d.branch) setBranch(d.branch);
      if (d.currentYear) setCurrentYear(d.currentYear);
      if (d.currentSemester) setCurrentSemester(d.currentSemester);
      if (d.expectedGraduationYear)
        setExpectedGraduationYear(d.expectedGraduationYear);

      if (d.technicalSkills)
        setTechnicalSkills(d.technicalSkills);

      if (d.businessCreativeSkills)
        setBusinessCreativeSkills(d.businessCreativeSkills);

      if (d.projectsBuilt)
        setProjectsBuilt(d.projectsBuilt);

      if (d.previousExperience)
        setPreviousExperience(d.previousExperience);

      if (d.ideaStatus)
        setIdeaStatus(d.ideaStatus);

      if (d.ideaTitle)
        setIdeaTitle(d.ideaTitle);

      if (d.problemStatement)
        setProblemStatement(d.problemStatement);

      if (d.targetUsers)
        setTargetUsers(d.targetUsers);

      if (d.solutionDescription)
        setSolutionDescription(d.solutionDescription);

      if (d.stage)
        setStage(d.stage);

      if (d.teamStatus)
        setTeamStatus(d.teamStatus);

      if (d.needs)
        setNeeds(d.needs);

      if (d.seriousness)
        setSeriousness(d.seriousness);

      if (d.timeCommitment)
        setTimeCommitment(d.timeCommitment);

      if (d.motivation)
        setMotivation(d.motivation);
    } catch (error) {
      console.warn('Could not restore application draft.', error);
    }
  }, []);

  // Autosave
  useEffect(() => {
    const draft = {
      fullName,
      email,
      whatsapp,
      city,
      state,
      linkedin,
      portfolio,
      college,
      degree,
      branch,
      currentYear,
      currentSemester,
      expectedGraduationYear,
      technicalSkills,
      businessCreativeSkills,
      projectsBuilt,
      previousExperience,
      ideaStatus,
      ideaTitle,
      problemStatement,
      targetUsers,
      solutionDescription,
      stage,
      teamStatus,
      needs,
      seriousness,
      timeCommitment,
      motivation,
    };

    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Ignore storage errors.
    }
  }, [
    fullName,
    email,
    whatsapp,
    city,
    state,
    linkedin,
    portfolio,
    college,
    degree,
    branch,
    currentYear,
    currentSemester,
    expectedGraduationYear,
    technicalSkills,
    businessCreativeSkills,
    projectsBuilt,
    previousExperience,
    ideaStatus,
    ideaTitle,
    problemStatement,
    targetUsers,
    solutionDescription,
    stage,
    teamStatus,
    needs,
    seriousness,
    timeCommitment,
    motivation,
  ]);

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!fullName.trim()) {
        newErrors.fullName = 'Please enter your full name.';
      }

      if (!email.trim()) {
        newErrors.email = 'Please enter your email address.';
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        newErrors.email = 'Please enter a valid email address.';
      }

      if (!whatsapp.trim()) {
        newErrors.whatsapp =
          'Please enter your WhatsApp contact number.';
      } else {
        const cleanPhone = whatsapp.replace(/\D/g, '');

        if (cleanPhone.length < 10) {
          newErrors.whatsapp =
            'Please enter a valid 10-digit phone number.';
        }
      }

      if (!city.trim()) {
        newErrors.city = 'Please enter your current city or town.';
      }

      if (!state.trim()) {
        newErrors.state = 'Please select your state.';
      }
    }

    if (currentStep === 2) {
      if (!college.trim()) {
        newErrors.college =
          'Please enter your college or institute name.';
      }

      if (!degree.trim()) {
        newErrors.degree =
          'Please select your degree or program.';
      }
    }

    if (currentStep === 4) {
      if (ideaStatus !== 'no_idea_yet') {
        if (!ideaTitle.trim()) {
          newErrors.ideaTitle =
            'Please enter a title or one-line summary.';
        }

        if (!problemStatement.trim()) {
          newErrors.problemStatement =
            'Please describe the problem you want to solve.';
        }
      }
    }

    if (currentStep === 5) {
      if (needs.length === 0) {
        newErrors.needs =
          'Please choose at least one area where we can help.';
      }

      if (!motivation.trim()) {
        newErrors.motivation =
          'Please briefly share why you want to build this.';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setGlobalError(null);

    if (!validateStep(step)) return;

    setStep((previous) =>
      Math.min(previous + 1, totalSteps)
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrevious = () => {
    setGlobalError(null);

    setStep((previous) =>
      Math.max(previous - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToStep = (targetStep: number) => {
    if (targetStep >= step) return;

    setErrors({});
    setGlobalError(null);
    setStep(targetStep);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleArrayItem = (
    list: string[],
    setList: (value: string[]) => void,
    item: string
  ) => {
    if (list.includes(item)) {
      setList(list.filter((value) => value !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = async () => {
    // Silent accept-and-drop for bots: report nothing, write nothing.
    if (website.trim() !== '' || Date.now() - formStartedAt.current < MIN_FILL_MS) {
      setSubmitting(false);
      return;
    }

    if (!confirmed) {
      setErrors({
        confirmed:
          'Please confirm that your information is accurate.',
      });
      return;
    }

    if (
      !fullName.trim() ||
      !email.trim() ||
      !whatsapp.trim() ||
      !city.trim() ||
      !college.trim()
    ) {
      setGlobalError(
        'Please review your application and complete the required fields.'
      );
      return;
    }

    setSubmitting(true);
    setGlobalError(null);

    try {
      const application = await submitApplication({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim(),
        city: city.trim(),
        state,
        linkedin: linkedin.trim(),
        portfolio: portfolio.trim(),
        college: college.trim(),
        degree,
        branch: branch.trim(),
        currentYear,
        currentSemester,
        expectedGraduationYear,
        technicalSkills,
        businessCreativeSkills,
        projectsBuilt: projectsBuilt.trim(),
        previousExperience: previousExperience.trim(),
        ideaStatus,
        ideaTitle: ideaTitle.trim(),
        problemStatement: problemStatement.trim(),
        targetUsers: targetUsers.trim(),
        solutionDescription: solutionDescription.trim(),
        stage,
        teamStatus,
        needs,
        seriousness,
        timeCommitment,
        motivation: motivation.trim(),
      });

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Ignore.
      }

      onSuccess(application);
    } catch (error) {
      console.error('Submission failed:', error);

      // The applicant is only told it worked when Firestore actually accepted
      // the write. Never claim success for an application we do not hold.
      setGlobalError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting your application. Your draft has been preserved on this device — please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderError = (key: string) => {
    if (!errors[key]) return null;

    return (
      <p className={errorTextClass}>
        <AlertCircle className="h-3.5 w-3.5" />
        {errors[key]}
      </p>
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fafc]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Honeypot: off-screen, not focusable, hidden from assistive tech.
            Real applicants never see or tab into this field. */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none left-[-9999px]">
          <label htmlFor="sj-website">Website</label>
          <input
            id="sj-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="nope"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Header */}
        <header className="mb-8 text-center sm:mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-bold text-cyan-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Founder & Builder Application
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Apply to{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Startup Junction
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            No perfect pitch. No polished business plan required.
            Tell us where you are today, what you can bring, and
            what you want to build.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Your information stays private
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-500" />
              Takes about 5 minutes
            </span>
          </div>
        </header>

        {/* Progress */}
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Step {step} of {totalSteps}
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
                {stepLabels[step - 1]}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-black text-cyan-600">
                {completion}%
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                complete
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 transition-all duration-500"
              style={{
                width: `${completion}%`,
              }}
            />
          </div>

          {/* Desktop steps */}
          <div className="hidden grid-cols-6 gap-2 sm:grid">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1;
              const isCurrent = stepNumber === step;
              const isDone = stepNumber < step;

              return (
                <button
                  key={label}
                  type="button"
                  disabled={stepNumber > step}
                  onClick={() => goToStep(stepNumber)}
                  className={`group rounded-xl p-2 text-left transition ${
                    stepNumber < step
                      ? 'cursor-pointer hover:bg-slate-50'
                      : stepNumber > step
                        ? 'cursor-not-allowed'
                        : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-700'
                          : isCurrent
                            ? 'bg-cyan-500 text-white shadow-md shadow-cyan-200'
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      ) : (
                        stepNumber
                      )}
                    </span>

                    <div className="min-w-0">
                      <p
                        className={`truncate text-xs font-bold ${
                          isCurrent
                            ? 'text-cyan-600'
                            : isDone
                              ? 'text-slate-700'
                              : 'text-slate-400'
                        }`}
                      >
                        {label}
                      </p>

                      <p className="truncate text-[10px] text-slate-400">
                        {stepDescriptions[index]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile step indicator */}
          <div className="flex items-center justify-between sm:hidden">
            {stepLabels.map((_, index) => {
              const stepNumber = index + 1;
              const isDone = stepNumber < step;
              const isCurrent = stepNumber === step;

              return (
                <div
                  key={stepNumber}
                  className={`h-1.5 flex-1 rounded-full ${
                    index !== 0 ? 'ml-1.5' : ''
                  } ${
                    isDone || isCurrent
                      ? 'bg-cyan-500'
                      : 'bg-slate-100'
                  }`}
                />
              );
            })}
          </div>
        </section>

        {/* Form */}
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600" />

          <div className="p-5 sm:p-8 lg:p-10">
            {/* Autosave */}
            <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                Draft automatically saved
              </div>

              <div className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">
                <HelpCircle className="h-3.5 w-3.5" />
                You can come back later
              </div>
            </div>

            {/* Global error */}
            {globalError && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                <div>
                  <p className="font-bold">
                    Something needs attention
                  </p>

                  <p className="mt-1 leading-5">
                    {globalError}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-in fade-in duration-300">
                <SectionHeader
                  eyebrow="01 · About you"
                  title="Let's start with you."
                  description="Tell us who you are and how our team can reach you."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field
                      label="Full name"
                      required
                      error={errors.fullName}
                    >
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) =>
                          setFullName(e.target.value)
                        }
                        placeholder="e.g. Aarav Kumar"
                        className={
                          errors.fullName
                            ? inputError
                            : inputNormal
                        }
                      />
                    </Field>
                  </div>

                  <Field
                    label="Email address"
                    required
                    error={errors.email}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      className={
                        errors.email
                          ? inputError
                          : inputNormal
                      }
                    />
                  </Field>

                  <Field
                    label="WhatsApp number"
                    required
                    error={errors.whatsapp}
                  >
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) =>
                        setWhatsapp(e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className={
                        errors.whatsapp
                          ? inputError
                          : inputNormal
                      }
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      We'll use WhatsApp to discuss your
                      application and idea.
                    </p>
                  </Field>

                  <Field
                    label="City / town"
                    required
                    error={errors.city}
                  >
                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="e.g. Patna"
                      className={
                        errors.city
                          ? inputError
                          : inputNormal
                      }
                    />
                  </Field>

                  <Field
                    label="State"
                    required
                    error={errors.state}
                  >
                    <select
                      value={state}
                      onChange={(e) =>
                        setState(e.target.value)
                      }
                      className={selectBase}
                    >
                      {INDIAN_STATES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="LinkedIn profile"
                    optional
                  >
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) =>
                        setLinkedin(e.target.value)
                      }
                      placeholder="https://linkedin.com/in/..."
                      className={inputNormal}
                    />
                  </Field>

                  <Field
                    label="GitHub / Portfolio"
                    optional
                  >
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) =>
                        setPortfolio(e.target.value)
                      }
                      placeholder="https://github.com/... or website"
                      className={inputNormal}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                <SectionHeader
                  eyebrow="02 · Education"
                  title="Tell us about your background."
                  description="Your degree doesn't define your potential. Students, graduates, professionals and self-taught builders are all welcome."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field
                      label="College / University / Institution"
                      required
                      error={errors.college}
                    >
                      <input
                        type="text"
                        value={college}
                        onChange={(e) =>
                          setCollege(e.target.value)
                        }
                        placeholder="e.g. NIT Patna, BCE Bhagalpur..."
                        className={
                          errors.college
                            ? inputError
                            : inputNormal
                        }
                      />
                    </Field>
                  </div>

                  <Field
                    label="Degree / Program"
                    required
                    error={errors.degree}
                  >
                    <select
                      value={degree}
                      onChange={(e) =>
                        setDegree(e.target.value)
                      }
                      className={selectBase}
                    >
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.E.">B.E.</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="BBA">BBA</option>
                      <option value="MBA">MBA</option>
                      <option value="Diploma">
                        Diploma / Polytechnic
                      </option>
                      <option value="B.Sc / M.Sc">
                        B.Sc / M.Sc
                      </option>
                      <option value="Other">
                        Other Degree
                      </option>
                      <option value="Not Applicable">
                        Not Applicable / Self-Taught
                      </option>
                    </select>
                  </Field>

                  <Field label="Branch / specialization">
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) =>
                        setBranch(e.target.value)
                      }
                      placeholder="e.g. Computer Science"
                      className={inputNormal}
                    />
                  </Field>

                  <Field label="Current year">
                    <select
                      value={currentYear}
                      onChange={(e) =>
                        setCurrentYear(e.target.value)
                      }
                      className={selectBase}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="Final Year">
                        Final Year
                      </option>
                      <option value="Graduated">
                        Graduated / Working Professional
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>

                  <Field label="Current semester">
                    <input
                      type="text"
                      value={currentSemester}
                      onChange={(e) =>
                        setCurrentSemester(e.target.value)
                      }
                      placeholder="e.g. 5th Semester"
                      className={inputNormal}
                    />
                  </Field>

                  <Field label="Expected graduation">
                    <select
                      value={expectedGraduationYear}
                      onChange={(e) =>
                        setExpectedGraduationYear(
                          e.target.value
                        )
                      }
                      className={selectBase}
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="Graduated">
                        Already Graduated
                      </option>
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <SectionHeader
                  eyebrow="03 · Skills"
                  title="What can you bring to the table?"
                  description="Select the skills you already have or are actively developing. You don't need to be an expert."
                />

                <div className="space-y-8">
                  <div>
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Technical skills
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          Select everything that applies.
                        </p>
                      </div>

                      {technicalSkills.length > 0 && (
                        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700">
                          {technicalSkills.length} selected
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {TECHNICAL_SKILLS_LIST.map((skill) => {
                        const selected =
                          technicalSkills.includes(skill);

                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() =>
                              toggleArrayItem(
                                technicalSkills,
                                setTechnicalSkills,
                                skill
                              )
                            }
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                              selected
                                ? 'border-cyan-400 bg-cyan-500 text-white shadow-md shadow-cyan-100'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {selected && (
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            )}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Business & creative skills
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          Builders need more than technical skills.
                        </p>
                      </div>

                      {businessCreativeSkills.length > 0 && (
                        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700">
                          {businessCreativeSkills.length} selected
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {BUSINESS_SKILLS_LIST.map((skill) => {
                        const selected =
                          businessCreativeSkills.includes(
                            skill
                          );

                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() =>
                              toggleArrayItem(
                                businessCreativeSkills,
                                setBusinessCreativeSkills,
                                skill
                              )
                            }
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                              selected
                                ? 'border-cyan-400 bg-cyan-500 text-white shadow-md shadow-cyan-100'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {selected && (
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            )}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <Field label="Something you've built or worked on">
                      <textarea
                        rows={4}
                        value={projectsBuilt}
                        onChange={(e) =>
                          setProjectsBuilt(e.target.value)
                        }
                        placeholder="College projects, hackathons, websites, apps, businesses, communities, research, or anything you're proud of..."
                        className={`${inputNormal} resize-none`}
                      />

                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        It doesn't have to be impressive or famous.
                        We care about initiative.
                      </p>
                    </Field>

                    <Field
                      label="Previous experience / extracurriculars"
                      optional
                    >
                      <textarea
                        rows={3}
                        value={previousExperience}
                        onChange={(e) =>
                          setPreviousExperience(e.target.value)
                        }
                        placeholder="Internships, college clubs, freelancing, volunteering..."
                        className={`${inputNormal} resize-none`}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <SectionHeader
                  eyebrow="04 · Your idea"
                  title="What do you want to build?"
                  description="You don't need a perfect startup idea. We want to understand what you're thinking about right now."
                />

                <div className="space-y-8">
                  <div>
                    <div className="mb-3">
                      <h3 className="text-sm font-bold text-slate-900">
                        Where are you right now?
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Pick the option that best describes you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <SelectionCard
                        selected={ideaStatus === 'yes'}
                        title="Yes, I have an idea"
                        description="I have a specific concept in mind."
                        onClick={() =>
                          setIdeaStatus('yes')
                        }
                      />

                      <SelectionCard
                        selected={ideaStatus === 'multiple'}
                        title="I have multiple ideas"
                        description="I need help choosing the right one."
                        onClick={() =>
                          setIdeaStatus('multiple')
                        }
                      />

                      <SelectionCard
                        selected={ideaStatus === 'building'}
                        title="I'm already building"
                        description="I have a prototype or MVP in progress."
                        onClick={() =>
                          setIdeaStatus('building')
                        }
                      />

                      <SelectionCard
                        selected={
                          ideaStatus === 'no_idea_yet'
                        }
                        title="I don't have an idea yet"
                        description="I want to find a problem, team or opportunity."
                        onClick={() =>
                          setIdeaStatus('no_idea_yet')
                        }
                      />
                    </div>
                  </div>

                  {ideaStatus !== 'no_idea_yet' ? (
                    <div className="space-y-5 rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-6">
                      <Field
                        label="Idea / project name"
                        required
                        error={errors.ideaTitle}
                      >
                        <input
                          type="text"
                          value={ideaTitle}
                          onChange={(e) =>
                            setIdeaTitle(e.target.value)
                          }
                          placeholder="e.g. KisanLink — direct produce pipeline for Bihar farmers"
                          className={
                            errors.ideaTitle
                              ? inputError
                              : inputNormal
                          }
                        />
                      </Field>

                      <Field
                        label="What problem are you trying to solve?"
                        required
                        error={errors.problemStatement}
                      >
                        <textarea
                          rows={4}
                          value={problemStatement}
                          onChange={(e) =>
                            setProblemStatement(
                              e.target.value
                            )
                          }
                          placeholder="Describe the real difficulty, pain point, inefficiency or opportunity you've observed..."
                          className={`${
                            errors.problemStatement
                              ? inputError
                              : inputNormal
                          } resize-none`}
                        />
                      </Field>

                      <Field label="Who experiences this problem?">
                        <input
                          type="text"
                          value={targetUsers}
                          onChange={(e) =>
                            setTargetUsers(e.target.value)
                          }
                          placeholder="e.g. College students, farmers, small retailers..."
                          className={inputNormal}
                        />
                      </Field>

                      <Field label="How would your solution work?">
                        <textarea
                          rows={4}
                          value={solutionDescription}
                          onChange={(e) =>
                            setSolutionDescription(
                              e.target.value
                            )
                          }
                          placeholder="Explain what you want to build — web app, mobile app, marketplace, hardware, service, etc."
                          className={`${inputNormal} resize-none`}
                        />
                      </Field>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field label="How far have you taken it?">
                          <select
                            value={stage}
                            onChange={(e) =>
                              setStage(e.target.value)
                            }
                            className={selectBase}
                          >
                            <option value="Just an idea">
                              Just an idea / Raw thought
                            </option>
                            <option value="Research/concept">
                              Research / Conceptual notes
                            </option>
                            <option value="Prototype">
                              Prototype / Wireframe
                            </option>
                            <option value="MVP">
                              MVP / Working basic product
                            </option>
                            <option value="Live product">
                              Live product
                            </option>
                            <option value="Already have users">
                              Already have users
                            </option>
                            <option value="Already generating revenue">
                              Already generating revenue
                            </option>
                          </select>
                        </Field>

                        <Field label="Do you already have a team?">
                          <select
                            value={teamStatus}
                            onChange={(e) =>
                              setTeamStatus(e.target.value)
                            }
                            className={selectBase}
                          >
                            <option value="I'm working alone">
                              I'm working alone
                            </option>
                            <option value="I have a team">
                              I have a team / co-founders
                            </option>
                            <option value="I'm looking for teammates">
                              I'm looking for teammates
                            </option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-5 sm:p-6">
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                          <Sparkles className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900">
                            That's completely fine.
                          </h3>

                          <p className="mt-1.5 text-sm leading-6 text-slate-600">
                            You don't need an idea to join
                            Startup Junction. We can help you
                            explore problems, meet potential
                            co-founders and discover projects
                            where your skills can contribute.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Your idea is treated as private application
                    information.
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="animate-in fade-in duration-300">
                <SectionHeader
                  eyebrow="05 · Support & commitment"
                  title="What would help you move forward?"
                  description="Tell us where Startup Junction can create the most value for you."
                />

                <div className="space-y-8">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          What kind of support do you need?
                          <span className="ml-1 text-red-500">
                            *
                          </span>
                        </h3>
                      </div>

                      {needs.length > 0 && (
                        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700">
                          {needs.length} selected
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {NEEDS_LIST.map((item) => {
                        const selected =
                          needs.includes(item);

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              toggleArrayItem(
                                needs,
                                setNeeds,
                                item
                              )
                            }
                            className={`rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${
                              selected
                                ? 'border-cyan-400 bg-cyan-50 text-cyan-700 shadow-sm'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-start gap-2">
                              <span
                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                  selected
                                    ? 'border-cyan-500 bg-cyan-500 text-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {selected && (
                                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                                )}
                              </span>

                              {item}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {renderError('needs')}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="How serious are you about building this?">
                      <select
                        value={seriousness}
                        onChange={(e) =>
                          setSeriousness(e.target.value)
                        }
                        className={selectBase}
                      >
                        <option value="Just exploring">
                          Just exploring
                        </option>
                        <option value="I want to learn">
                          I want to learn
                        </option>
                        <option value="I want to work on it seriously">
                          I want to work on it seriously
                        </option>
                        <option value="I'm ready to start building">
                          I'm ready to start building
                        </option>
                        <option value="I'm already building">
                          I'm already building
                        </option>
                      </select>
                    </Field>

                    <Field label="How much time can you realistically give?">
                      <select
                        value={timeCommitment}
                        onChange={(e) =>
                          setTimeCommitment(e.target.value)
                        }
                        className={selectBase}
                      >
                        <option value="2–5 hours/week">
                          2–5 hours/week
                        </option>
                        <option value="5–10 hours/week">
                          5–10 hours/week
                        </option>
                        <option value="10–20 hours/week">
                          10–20 hours/week
                        </option>
                        <option value="20+ hours/week">
                          20+ hours/week
                        </option>
                      </select>
                    </Field>
                  </div>

                  <Field
                    label="Why do you want to build this?"
                    required
                    error={errors.motivation}
                  >
                    <textarea
                      rows={5}
                      value={motivation}
                      onChange={(e) =>
                        setMotivation(e.target.value)
                      }
                      placeholder="What excites you about solving this problem? Why does it matter to you?"
                      className={`${
                        errors.motivation
                          ? inputError
                          : inputNormal
                      } resize-none`}
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Honest answers are more useful than formal
                      business jargon.
                    </p>
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="animate-in fade-in duration-300">
                <SectionHeader
                  eyebrow="06 · Final review"
                  title="You're almost there."
                  description="Review your application below. You can edit any section before submitting."
                />

                <div className="space-y-4">
                  {/* Personal */}
                  <ReviewCard
                    number="01"
                    title="Your information"
                    onEdit={() => setStep(1)}
                  >
                    <ReviewGrid>
                      <ReviewItem
                        label="Name"
                        value={fullName}
                      />
                      <ReviewItem
                        label="Email"
                        value={email}
                      />
                      <ReviewItem
                        label="WhatsApp"
                        value={whatsapp}
                      />
                      <ReviewItem
                        label="Location"
                        value={`${city}, ${state}`}
                      />
                    </ReviewGrid>
                  </ReviewCard>

                  {/* Education */}
                  <ReviewCard
                    number="02"
                    title="Education"
                    onEdit={() => setStep(2)}
                  >
                    <ReviewGrid>
                      <ReviewItem
                        label="College"
                        value={college}
                        wide
                      />
                      <ReviewItem
                        label="Degree"
                        value={degree}
                      />
                      <ReviewItem
                        label="Branch"
                        value={branch || 'Not specified'}
                      />
                      <ReviewItem
                        label="Current year"
                        value={currentYear}
                      />
                      <ReviewItem
                        label="Graduation"
                        value={expectedGraduationYear}
                      />
                    </ReviewGrid>
                  </ReviewCard>

                  {/* Skills */}
                  <ReviewCard
                    number="03"
                    title="Skills & experience"
                    onEdit={() => setStep(3)}
                  >
                    <div className="space-y-5">
                      <ReviewTags
                        label="Technical skills"
                        items={technicalSkills}
                      />

                      <ReviewTags
                        label="Business & creative skills"
                        items={businessCreativeSkills}
                      />

                      {projectsBuilt && (
                        <ReviewItem
                          label="Projects / things built"
                          value={projectsBuilt}
                          multiline
                        />
                      )}
                    </div>
                  </ReviewCard>

                  {/* Idea */}
                  <ReviewCard
                    number="04"
                    title="Your idea"
                    onEdit={() => setStep(4)}
                  >
                    {ideaStatus === 'no_idea_yet' ? (
                      <div className="rounded-2xl bg-cyan-50 p-4 text-sm text-cyan-800">
                        Applying without a specific idea yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ReviewItem
                          label="Project"
                          value={
                            ideaTitle || 'Untitled idea'
                          }
                        />

                        <ReviewItem
                          label="Problem"
                          value={problemStatement}
                          multiline
                        />

                        <ReviewGrid>
                          <ReviewItem
                            label="Stage"
                            value={stage}
                          />
                          <ReviewItem
                            label="Team"
                            value={teamStatus}
                          />
                        </ReviewGrid>
                      </div>
                    )}
                  </ReviewCard>

                  {/* Needs */}
                  <ReviewCard
                    number="05"
                    title="Support & commitment"
                    onEdit={() => setStep(5)}
                  >
                    <div className="space-y-5">
                      <ReviewTags
                        label="Requested support"
                        items={needs}
                        cyan
                      />

                      <ReviewGrid>
                        <ReviewItem
                          label="Seriousness"
                          value={seriousness}
                        />
                        <ReviewItem
                          label="Time commitment"
                          value={timeCommitment}
                        />
                      </ReviewGrid>

                      <ReviewItem
                        label="Motivation"
                        value={motivation}
                        multiline
                      />
                    </div>
                  </ReviewCard>
                </div>

                {/* Confirmation */}
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => {
                        setConfirmed(e.target.checked);

                        if (e.target.checked) {
                          setErrors((previous) => {
                            const next = {
                              ...previous,
                            };
                          delete next.confirmed;
                          return next;
                          });
                        }
                      }}
                      className="mt-1 h-5 w-5 cursor-pointer rounded border-slate-300 text-cyan-500 accent-cyan-500 focus:ring-cyan-400"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      I confirm that the information I've
                      provided is accurate and I agree to be
                      contacted by Startup Junction regarding my
                      application. I understand that my idea is
                      treated as private application information.
                    </span>
                  </label>

                  {errors.confirmed && (
                    <p className={errorTextClass}>
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.confirmed}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={submitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="text-sm font-semibold text-slate-400 transition hover:text-slate-700"
                >
                  ← Back to home
                </button>
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-cyan-200/50 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-200/60 active:translate-y-0"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-base font-extrabold text-white shadow-xl shadow-cyan-200/50 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-200/60 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit application
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Footer reassurance */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center text-xs text-slate-400 sm:flex-row">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>
            Your application information is only used to evaluate
            your fit with Startup Junction.
          </span>
        </div>
      </div>
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/* Review Components                                                          */
/* -------------------------------------------------------------------------- */

const ReviewCard = ({
  number,
  title,
  onEdit,
  children,
}: {
  number: string;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm sm:p-6">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-500">
          {number}
        </span>

        <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
          {title}
        </h3>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-cyan-50 hover:text-cyan-600"
      >
        <Edit2 className="h-3.5 w-3.5" />
        Edit
      </button>
    </div>

    {children}
  </div>
);

const ReviewGrid = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {children}
  </div>
);

const ReviewItem = ({
  label,
  value,
  wide,
  multiline,
}: {
  label: string;
  value?: string;
  wide?: boolean;
  multiline?: boolean;
}) => (
  <div className={wide ? 'sm:col-span-2' : ''}>
    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
      {label}
    </span>

    {multiline ? (
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
        {value || '—'}
      </p>
    ) : (
      <p className="break-words text-sm font-semibold text-slate-800">
        {value || '—'}
      </p>
    )}
  </div>
);

const ReviewTags = ({
  label,
  items,
  cyan = false,
}: {
  label: string;
  items: string[];
  cyan?: boolean;
}) => (
  <div>
    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
      {label}
    </span>

    {items.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${
              cyan
                ? 'border-cyan-100 bg-cyan-50 text-cyan-700'
                : 'border-slate-200 bg-slate-50 text-slate-700'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <span className="text-xs italic text-slate-400">
        None specified
      </span>
    )}
  </div>
);
