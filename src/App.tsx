import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { subscribeToAuth, logoutAdmin, getStoredAdmin } from './services/authService';
import { applyRouteMeta, getRouteMeta } from './services/seo';
import type { Application, AdminUser } from './types';

// Only the landing page ships in the initial chunk. Everything a visitor
// reaches by clicking is split out, so someone landing on the homepage does
// not download the 2,000-line application form or the Firebase SDK.
const ApplyPage = lazy(() => import('./pages/ApplyPage').then((m) => ({ default: m.ApplyPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const HowItWorksPage = lazy(() =>
  import('./pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage }))
);
const FaqPage = lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })));
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const ThankYouPage = lazy(() =>
  import('./pages/ThankYouPage').then((m) => ({ default: m.ThankYouPage }))
);
const AdminLoginPage = lazy(() =>
  import('./pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
);
const AdminDashboardPage = lazy(() =>
  import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminApplicationDetailPage = lazy(() =>
  import('./pages/admin/AdminApplicationDetailPage').then((m) => ({
    default: m.AdminApplicationDetailPage,
  }))
);

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
      <div className="w-8 h-8 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [submittedApplication, setSubmittedApplication] = useState<Application | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auth listener. The cached session is only trusted while a matching Firebase
  // user is signed in, so we wait for the first callback before rendering any
  // admin route.
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setAdminUser(user);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Per-route document title, description, canonical and social tags.
  useEffect(() => {
    applyRouteMeta(getRouteMeta(currentPath));
  }, [currentPath]);

  // Keep the tab title in sync for browsers that surface it while the SPA loads.
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplicationSuccess = (app: Application) => {
    setSubmittedApplication(app);
    navigate('/thank-you');
  };

  const handleAdminLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
    navigate('/admin/login');
  };

  const renderLogin = (returnPath: string) => (
    <AdminLoginPage
      onLoginSuccess={(user) => {
        setAdminUser(user);
        navigate(returnPath);
      }}
      onNavigate={navigate}
    />
  );

  const renderDashboard = () => (
    <AdminDashboardPage admin={adminUser!} onLogout={handleAdminLogout} onOpenApplication={(id) => navigate(`/admin/applications/${id}`)} />
  );

  const renderContent = () => {
    if (currentPath.startsWith('/admin')) {
      if (!authReady) return <RouteFallback />;

      if (currentPath.startsWith('/admin/applications/')) {
        const appId = decodeURIComponent(currentPath.replace('/admin/applications/', ''));
        if (!adminUser) return renderLogin(currentPath);
        return (
          <AdminApplicationDetailPage
            applicationId={appId}
            admin={adminUser}
            onBack={() => navigate('/admin')}
          />
        );
      }

      // /admin, /admin/login, /admin/applications
      if (!adminUser) return renderLogin('/admin');
      return renderDashboard();
    }

    switch (currentPath) {
      case '/apply':
        return <ApplyPage onSuccess={handleApplicationSuccess} onNavigate={navigate} />;
      case '/thank-you':
        return (
          <ThankYouPage application={submittedApplication} onNavigate={navigate} />
        );
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/how-it-works':
        return <HowItWorksPage onNavigate={navigate} />;
      case '/faq':
        return <FaqPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/terms':
        return <TermsPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {!isAdminRoute && <Navbar currentPath={currentPath} onNavigate={navigate} />}

      <main className="grow">
        <Suspense fallback={<RouteFallback />}>{renderContent()}</Suspense>
      </main>

      {!isAdminRoute && <Footer onNavigate={navigate} />}
    </div>
  );
}