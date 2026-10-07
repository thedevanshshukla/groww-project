import type { NavTab, UserProfile } from '../../types';
import { Home, Compass, PieChart, Target, User, ShieldCheck, Sparkles } from 'lucide-react';
import { mockUser } from '../../data/mockData';
import { formatGoal } from '../../services/financialEngine';

interface SidebarNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  hasCopilotAlert?: boolean;
  userProfile?: UserProfile;
  onOpenProfileSwitch?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onTabChange,
  hasCopilotAlert = true,
  userProfile = mockUser,
  onOpenProfileSwitch
}) => {
  const activeUser = userProfile || mockUser;

  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home, desc: 'Portfolio summary & market pulses' },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass, desc: 'Stocks, funds, ETFs & watchlist', badge: hasCopilotAlert ? 'Active' : undefined },
    { id: 'portfolio' as NavTab, label: 'Portfolio', icon: PieChart, desc: 'Asset & sector exposure' },
    { id: 'goals' as NavTab, label: 'Goals', icon: Target, desc: 'Safety nets & target roadmap' },
    { id: 'profile' as NavTab, label: 'Profile', icon: User, desc: 'Preferences & how Copilot works' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white dark:bg-[#16181F] border-r border-slate-200/70 dark:border-[#242834] min-h-screen p-5 shrink-0 justify-between select-none transition-colors">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-7 px-1.5">
          <div className="w-9 h-9 rounded-xl bg-[#00D09C] flex items-center justify-center text-slate-950 font-black text-lg shadow-xs">
            G
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base">
                Groww
              </span>
              <span className="text-[10px] font-bold bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] px-1.5 py-0.5 rounded-full border border-[#00D09C]/25">
                COPILOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Gen Z Decision Layer</p>
          </div>
        </div>

        {/* User Mini Profile */}
        <div
          onClick={() => {
            if (onOpenProfileSwitch) {
              onOpenProfileSwitch();
            } else {
              onTabChange('profile');
            }
          }}
          className="bg-[#F9F9F8] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B] rounded-2xl p-3 mb-6 hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                {activeUser.name[0]}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {activeUser.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate capitalize font-medium">
                  {activeUser.riskComfort} risk · {formatGoal(activeUser.primaryGoal)}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700 group-hover:border-[#00D09C]/40 group-hover:text-[#008A68] dark:group-hover:text-[#00D09C] transition">
              Switch
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] font-bold border border-[#00D09C]/25 dark:border-[#00D09C]/35'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-[#F9F9F8] dark:hover:bg-[#1D212C] hover:text-slate-900 dark:hover:text-white font-medium'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl ${
                    isActive
                      ? 'bg-[#00D09C] text-slate-950 shadow-xs'
                      : 'bg-slate-100/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                    {tab.badge && (
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 font-bold px-1.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal truncate block">
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Contextual Copilot Trigger */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onTabChange('copilot')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              activeTab === 'copilot'
                ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 border-[#00D09C]/40 text-[#008A68] dark:text-[#00D09C]'
                : 'bg-[#FBFBFA] dark:bg-[#1D212C] border-slate-200/70 dark:border-[#282D3B] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-slate-900 dark:bg-[#00D09C] text-[#00D09C] dark:text-slate-950 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold block text-slate-900 dark:text-white">
                  Copilot Decision Hub
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                  Interactive Advisor
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Live
            </span>
          </button>
        </div>
      </div>

      {/* Case Study Callout Box */}
      <div className="p-3.5 bg-[#F9F9F8] dark:bg-[#1D212C] rounded-2xl border border-slate-200/60 dark:border-[#282D3B] mt-6">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C]" />
          <span>Product Intern Case Study</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
          "Groww should help Gen Z investors make better financial decisions, not simply give them more choices."
        </p>
      </div>
    </aside>
  );
};

export default SidebarNav;
