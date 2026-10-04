import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ApplyPage } from './pages/ApplyPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminApplicationDetailPage } from './pages/admin/AdminApplicationDetailPage';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { subscribeToAuth, logoutAdmin, getStoredAdmin } from './services/authService';
import type { Application, AdminUser } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [submittedApplication, setSubmittedApplication] = useState<Application | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getStoredAdmin());
  const [firebaseModalOpen, setFirebaseModalOpen] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auth listener
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setAdminUser(user);
    });
    return () => unsubscribe();
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

  // Route matching
  const renderContent = () => {
    // Admin Routes
    if (currentPath === '/admin/login') {
      if (adminUser) {
        // already authenticated
        return (
          <AdminDashboardPage
            admin={adminUser}
            onLogout={handleAdminLogout}
            onOpenApplication={(id) => navigate(`/admin/applications/${id}`)}
            onOpenFirebaseConfig={() => setFirebaseModalOpen(true)}
          />
        );
      }
      return (
        <AdminLoginPage
          onLoginSuccess={(user) => {
            setAdminUser(user);
            navigate('/admin');
          }}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath.startsWith('/admin/applications/')) {
      const appId = currentPath.replace('/admin/applications/', '');
      if (!adminUser) {
        return (
          <AdminLoginPage
            onLoginSuccess={(user) => {
              setAdminUser(user);
              navigate(currentPath);
            }}
            onNavigate={navigate}
          />
        );
      }
      return (
        <AdminApplicationDetailPage
          applicationId={appId}
          admin={adminUser}
          onBack={() => navigate('/admin')}
        />
      );
    }

    if (currentPath === '/admin' || currentPath === '/admin/applications') {
      if (!adminUser) {
        return (
          <AdminLoginPage
            onLoginSuccess={(user) => {
              setAdminUser(user);
              navigate('/admin');
            }}
            onNavigate={navigate}
          />
        );
      }
      return (
        <AdminDashboardPage
          admin={adminUser}
          onLogout={handleAdminLogout}
          onOpenApplication={(id) => navigate(`/admin/applications/${id}`)}
          onOpenFirebaseConfig={() => setFirebaseModalOpen(true)}
        />
      );
    }

    // Public Routes
    switch (currentPath) {
      case '/apply':
        return (
          <ApplyPage
            onSuccess={handleApplicationSuccess}
            onNavigate={navigate}
          />
        );

      case '/thank-you':
        return (
          <ThankYouPage
            application={submittedApplication}
            onNavigate={navigate}
          />
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
      {/* Show regular header on public routes */}
      {!isAdminRoute && <Navbar currentPath={currentPath} onNavigate={navigate} />}

      <main className="grow">{renderContent()}</main>

      {/* Show regular footer on public routes */}
      {!isAdminRoute && <Footer onNavigate={navigate} />}

      {/* Firebase Configuration Modal */}
      <FirebaseConfigModal
        isOpen={firebaseModalOpen}
        onClose={() => setFirebaseModalOpen(false)}
      />
    </div>
  );
}
