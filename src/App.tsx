import { useState, useEffect } from 'react';
import type { NavTab, StockItem, UserProfile } from './types';
import { mockUser } from './data/mockData';
import AppShell from './components/layout/AppShell';
import OnboardingModal from './components/onboarding/OnboardingModal';
import SimulatedLoginModal from './components/profile/SimulatedLoginModal';
import Home from './pages/Home';
import Explore from './pages/Explore';
import StockDetail from './pages/StockDetail';
import Copilot from './pages/Copilot';
import Portfolio from './pages/Portfolio';
import Goals from './pages/Goals';
import Profile from './pages/Profile';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const [emergencyFundAmount, setEmergencyFundAmount] = useState<number>(72000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // User Profile state with localStorage persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('groww_copilot_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.experience) {
          return parsed as UserProfile;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return mockUser;
  });

  // Theme state defaulting to Groww signature dark mode
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('groww_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark'; // Default to Groww signature dark theme
  });

  // Apply dark class to <html> for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('groww_theme', theme);
    } catch {}
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Show onboarding if no profile was saved in localStorage
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('groww_copilot_user_profile');
    } catch {
      return false;
    }
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  const handleAllocateEmergencyFund = () => {
    setEmergencyFundAmount((prev) => Math.min(100000, prev + 5000));
    showToast('₹5,000 allocated to your Emergency Fund');
  };

  const handleNavigate = (tab: NavTab, target?: string) => {
    setSelectedStock(null);
    setActiveTab(tab);
    setTargetSection(target || null);
  };

  const handleSelectStock = (stock: StockItem) => {
    setSelectedStock(stock);
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem('groww_copilot_user_profile', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
    setShowOnboarding(false);
    showToast(`Welcome to Groww, ${newProfile.name}! Your investing profile is active.`);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('groww_copilot_user_profile', JSON.stringify(updatedProfile));
    } catch {
      // ignore
    }
    if (updatedProfile.name.toLowerCase().includes('kabir') || updatedProfile.riskComfort === 'aggressive') {
      setEmergencyFundAmount(100000);
    } else if (updatedProfile.name.toLowerCase().includes('ananya') || updatedProfile.riskComfort === 'conservative') {
      setEmergencyFundAmount(42000);
    } else {
      setEmergencyFundAmount(72000);
    }
    showToast(`Active account: ${updatedProfile.name.split(' ')[0]} · ${updatedProfile.riskComfort} risk`);
  };

  const handleResetOnboarding = () => {
    try {
      localStorage.removeItem('groww_copilot_user_profile');
    } catch {
      // ignore
    }
    setShowOnboarding(true);
  };

  return (
    <>
      <AppShell
        activeTab={activeTab}
        onTabChange={(tab) => handleNavigate(tab)}
        hasCopilotAlert={true}
        toastMessage={toastMessage}
        userProfile={userProfile}
        onOpenProfileSwitch={() => setShowLoginModal(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      >
        {selectedStock ? (
          <StockDetail
            stock={selectedStock}
            onBack={() => setSelectedStock(null)}
            onShowToast={showToast}
            onNavigateToGoals={() => {
              setSelectedStock(null);
              handleNavigate('goals');
            }}
            userProfile={userProfile}
            emergencyFundAmount={emergencyFundAmount}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <Home
                onNavigate={handleNavigate}
                emergencyFundAmount={emergencyFundAmount}
                onSelectStock={handleSelectStock}
                userProfile={userProfile}
              />
            )}
            {activeTab === 'explore' && (
              <Explore
                onSelectStock={handleSelectStock}
                onNavigateToCopilot={() => handleNavigate('copilot')}
              />
            )}
            {activeTab === 'copilot' && (
              <Copilot
                onNavigate={(tab) => handleNavigate(tab)}
                onShowToast={showToast}
                userProfile={userProfile}
                emergencyFundAmount={emergencyFundAmount}
              />
            )}
            {activeTab === 'portfolio' && (
              <Portfolio
                onNavigate={(tab) => handleNavigate(tab)}
                targetSection={targetSection}
              />
            )}
            {activeTab === 'goals' && (
              <Goals
                onNavigate={(tab) => handleNavigate(tab)}
                emergencyFundAmount={emergencyFundAmount}
                onAllocateEmergencyFund={handleAllocateEmergencyFund}
              />
            )}
            {activeTab === 'profile' && (
              <Profile
                onNavigate={(tab) => handleNavigate(tab)}
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                onResetOnboarding={handleResetOnboarding}
              />
            )}
          </>
        )}
      </AppShell>

      {/* SIMULATED LOGIN & PROFILE SWITCH MODAL */}
      <SimulatedLoginModal
        isOpen={showLoginModal}
        currentProfile={userProfile}
        onClose={() => setShowLoginModal(false)}
        onSelectProfile={handleUpdateProfile}
      />

      {/* LIGHTWEIGHT ONBOARDING MODAL ON FIRST VISIT */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
}

export default App;
