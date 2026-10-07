import React from 'react';
import type { NavTab } from '../../types';
import { Home, Compass, PieChart, Target, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  hasCopilotAlert?: boolean;
  isStandaloneMobileFrame?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  hasCopilotAlert = true,
  isStandaloneMobileFrame = false,
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
    { id: 'portfolio' as NavTab, label: 'Portfolio', icon: PieChart },
    { id: 'goals' as NavTab, label: 'Goals', icon: Target },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  const containerClasses = isStandaloneMobileFrame
    ? 'relative w-full z-40 bg-white/95 dark:bg-[#16181F]/95 backdrop-blur-md px-3 py-2 border-t border-slate-200/80 dark:border-[#242834] transition-colors'
    : 'fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#16181F]/95 backdrop-blur-md border-t border-slate-200/80 dark:border-[#242834] px-3 py-2 md:hidden shadow-subtle transition-colors';

  return (
    <nav className={containerClasses}>
      <div className="max-w-md mx-auto flex items-center justify-between px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all duration-150 focus:outline-none cursor-pointer relative ${
                isActive
                  ? 'text-[#008A68] dark:text-[#00D09C]'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {tab.id === 'explore' && hasCopilotAlert && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00D09C] ring-2 ring-white dark:ring-slate-900 rounded-full" />
                )}
              </div>
              <span
                className={`text-[11px] mt-1 font-semibold tracking-tight ${
                  isActive ? 'text-[#008A68] dark:text-[#00D09C]' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
