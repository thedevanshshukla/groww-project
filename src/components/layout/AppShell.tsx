import React, { useState } from 'react';
import type { NavTab, UserProfile } from '../../types';
import BottomNav from './BottomNav';
import SidebarNav from './SidebarNav';
import { mockUser } from '../../data/mockData';
import { formatGoal } from '../../services/financialEngine';
import { Smartphone, Monitor, CheckCircle2, Moon, Sun } from 'lucide-react';

interface AppShellProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  children: React.ReactNode;
  hasCopilotAlert?: boolean;
  toastMessage?: string | null;
  userProfile?: UserProfile;
  onOpenProfileSwitch?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  children,
  hasCopilotAlert = true,
  toastMessage = null,
  userProfile = mockUser,
  onOpenProfileSwitch,
  theme = 'dark',
  onToggleTheme
}) => {
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'mobile-mockup'>('responsive');
  const activeUser = userProfile || mockUser;

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'copilot':
        return 'Copilot';
      case 'portfolio':
        return 'Portfolio';
      case 'goals':
        return 'Goals';
      case 'profile':
        return 'Profile';
      default:
        return 'Groww Copilot';
    }
  };

  // 1. MOBILE FRAME MODE (Desktop preview with isolated phone mockup)
  if (deviceMode === 'mobile-mockup') {
    return (
      <div className="min-h-screen bg-[#181A1D] flex flex-col items-center justify-center p-4 py-6 antialiased selection:bg-[#00D09C]/20">
        {/* Floating Top Control Bar */}
        <div className="w-full max-w-[400px] mb-3 flex items-center justify-between px-2 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D09C]" />
            <span className="text-xs font-semibold tracking-wide text-slate-300">
              Mobile Frame Preview
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Groww Dark Mode'}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#00D09C]" />}
              </button>
            )}
            <button
              onClick={() => setDeviceMode('responsive')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-[#00D09C]" />
              <span>Desktop View</span>
            </button>
          </div>
        </div>

        {/* Standalone Centered Phone Frame */}
        <div className="mobile-mockup-frame w-[390px] h-[820px] max-w-full bg-[#FAFAFA] dark:bg-[#0C0D11] rounded-[48px] border-[10px] border-slate-800 shadow-2xl flex flex-col relative overflow-hidden ring-1 ring-slate-700">
          {/* Phone Island Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-50 pointer-events-none" />

          {/* Internal Mobile Top Header */}
          <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#16181F]/95 backdrop-blur-md border-b border-slate-200/70 dark:border-[#242834] px-5 pt-8 pb-3 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00D09C] flex items-center justify-center text-slate-950 font-extrabold text-xs shadow-xs">
                  G
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {getPageTitle()}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {onToggleTheme && (
                  <button
                    onClick={onToggleTheme}
                    className="p-1 rounded-xl bg-[#F4F5F7] dark:bg-[#1D212C] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#282D3B] cursor-pointer"
                    title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                  >
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#00D09C]" />}
                  </button>
                )}
                {onOpenProfileSwitch && (
                  <button
                    onClick={onOpenProfileSwitch}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F4F5F7] dark:bg-[#1D212C] hover:bg-[#E6FAF5] dark:hover:bg-[#252B3A] text-[10px] font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-[#282D3B] cursor-pointer"
                    title="Switch Account Profile"
                  >
                    <span className="font-bold">{activeUser.name.split(' ')[0]}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 dark:text-slate-400 capitalize">{activeUser.riskComfort}</span>
                    <span className="text-[9px] text-slate-400">▾</span>
                  </button>
                )}
                {activeTab === 'copilot' ? (
                  <span className="text-[10px] font-bold bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] px-2 py-0.5 rounded-full border border-[#00D09C]/25">
                    Decision layer
                  </span>
                ) : (
                  <button
                    onClick={() => onTabChange('copilot')}
                    className="px-2.5 py-1 rounded-xl bg-slate-900 dark:bg-[#00D09C] text-white dark:text-slate-950 text-[11px] font-bold cursor-pointer"
                  >
                    Ask Copilot
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Scrollable Content inside Phone */}
          <main className="flex-1 overflow-y-auto p-4 pb-20 bg-[#FAFAFA] dark:bg-[#0C0D11] text-slate-900 dark:text-white">
            {children}
          </main>

          {/* Toast Notification inside Mobile Frame */}
          {toastMessage && (
            <div className="absolute bottom-20 left-4 right-4 z-50 bg-slate-900 text-white p-3 rounded-2xl text-xs font-semibold shadow-elevated flex items-center gap-2 border border-slate-700 animate-fade-slide">
              <CheckCircle2 className="w-4 h-4 text-[#00D09C] shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Persistent Mobile Bottom Navigation inside Phone Frame */}
          <div className="shrink-0 bg-white dark:bg-[#16181F] border-t border-slate-200/70 dark:border-[#242834]">
            <BottomNav
              activeTab={activeTab}
              onTabChange={onTabChange}
              hasCopilotAlert={hasCopilotAlert}
              isStandaloneMobileFrame={true}
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. RESPONSIVE DESKTOP & MOBILE MODE
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0C0D11] text-slate-900 dark:text-white flex flex-col md:flex-row antialiased transition-colors">
      {/* Desktop Sidebar (Rendered on md+ screens in responsive mode) */}
      <SidebarNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        hasCopilotAlert={hasCopilotAlert}
        userProfile={activeUser}
        onOpenProfileSwitch={onOpenProfileSwitch}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#16181F]/90 backdrop-blur-md border-b border-slate-200/70 dark:border-[#242834] px-4 sm:px-6 py-3 transition-colors">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Brand / Section Title */}
            <div className="flex items-center gap-2.5">
              <div className="md:hidden w-8 h-8 rounded-xl bg-[#00D09C] flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-xs">
                G
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize leading-tight">
                    {getPageTitle()}
                  </h1>
                  {activeTab === 'copilot' && (
                    <span className="text-[10px] font-bold bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] px-2 py-0.5 rounded-full border border-[#00D09C]/25">
                      Decision layer
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">
                  {activeUser.name} • SIP ₹{activeUser.monthlyInvestment.toLocaleString('en-IN')}/mo
                </p>
              </div>
            </div>

            {/* Viewport Frame Mode Switcher, Theme Switcher & Profile Switcher */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="p-2 rounded-xl bg-[#F4F5F7] dark:bg-[#1D212C] hover:bg-[#E6FAF5] dark:hover:bg-[#252B3A] border border-slate-200/80 dark:border-[#282D3B] text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Groww Dark Theme'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#00D09C]" />
                  )}
                </button>
              )}

              {onOpenProfileSwitch && (
                <button
                  onClick={onOpenProfileSwitch}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F5F7] dark:bg-[#1D212C] hover:bg-[#E6FAF5] dark:hover:bg-[#252B3A] hover:border-slate-300 dark:hover:border-slate-600 border border-slate-200/80 dark:border-[#282D3B] text-xs transition cursor-pointer"
                  title="Switch Account Profile"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                    {activeUser.name[0]}
                  </span>
                  <div className="flex flex-col text-left leading-tight hidden sm:flex">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {activeUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                      {activeUser.riskComfort} risk · {formatGoal(activeUser.primaryGoal)}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 ml-0.5">▾</span>
                </button>
              )}

              <div className="hidden lg:flex items-center bg-[#F4F5F7] dark:bg-[#1D212C] rounded-xl p-0.5 border border-slate-200/80 dark:border-[#282D3B]">
                <button
                  onClick={() => setDeviceMode('responsive')}
                  title="Responsive Desktop View"
                  className={`p-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    deviceMode === 'responsive'
                      ? 'bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile-mockup')}
                  title="Mobile Frame View (Interview Presentation)"
                  className="p-1.5 rounded-lg text-xs font-medium transition cursor-pointer text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Container */}
        <main className="flex-1 mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* In-app Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-elevated flex items-center gap-2 border border-slate-700 animate-fade-slide">
          <CheckCircle2 className="w-4 h-4 text-[#00D09C] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Bottom Nav on Mobile */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        hasCopilotAlert={hasCopilotAlert}
      />
    </div>
  );
};

export default AppShell;

