import React from 'react';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import AllocationBar from '../components/charts/AllocationBar';
import {
  mockUser,
  mockAssetAllocation,
  mockGoals,
  mockIndices,
  mockExploreStocks
} from '../data/mockData';
import {
  ArrowUpRight,
  ChevronRight,
  Search,
  Sparkles,
  TrendingUp,
  Coins,
  LineChart,
  Calendar
} from 'lucide-react';
import type { NavTab, StockItem, UserProfile } from '../types';

interface HomeProps {
  onNavigate: (tab: NavTab, targetSection?: string) => void;
  emergencyFundAmount?: number;
  onSelectStock?: (stock: StockItem) => void;
  userProfile?: UserProfile;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  emergencyFundAmount = 72000,
  onSelectStock,
  userProfile = mockUser
}) => {
  const totalValue = 184200;
  const returnPercentage = 11.4;

  const profile = userProfile || mockUser;
  const emergencyGap = Math.max(0, 100000 - emergencyFundAmount);

  const goalSummary = profile.primaryGoal === 'emergency_fund'
    ? 'Emergency Safety'
    : profile.primaryGoal === 'higher_education'
    ? 'Higher Education'
    : profile.primaryGoal === 'home'
    ? 'Home Purchase'
    : profile.primaryGoal === 'multiple'
    ? 'Multiple Goals'
    : 'Long-Term Wealth';

  return (
    <div className="space-y-5 animate-fade-slide">
      {/* SEARCH BAR */}
      <div
        onClick={() => onNavigate('explore')}
        className="flex items-center px-4 py-3 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/80 dark:border-[#242834] shadow-subtle hover:border-[#00D09C] transition cursor-pointer group"
      >
        <Search className="w-4 h-4 text-slate-400 mr-3 group-hover:text-[#008A68] dark:group-hover:text-[#00D09C] transition shrink-0" />
        <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 flex-1 truncate">
          Search stocks, mutual funds, ETFs...
        </span>
        <span className="text-[11px] font-bold text-[#008A68] dark:text-[#00D09C] bg-[#E6FAF5] dark:bg-[#00D09C]/15 px-2 py-0.5 rounded-full border border-[#00D09C]/20 shrink-0">
          Explore
        </span>
      </div>

      {/* TOPIC 1: MARKET PULSE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Market Pulse
          </h2>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Live Indices</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {mockIndices.map((idx) => (
            <div
              key={idx.symbol}
              onClick={() => onNavigate('explore')}
              className="p-3 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/70 dark:border-[#242834] shadow-subtle hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer flex flex-col justify-between min-h-[64px]"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{idx.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                  idx.change >= 0
                    ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C]'
                    : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                }`}>
                  {idx.change >= 0 ? '+' : ''}{idx.changePercent}%
                </span>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-1 block">
                ₹{idx.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* GREETING */}
      <div className="space-y-1 pt-1">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              Good morning, {profile.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              ₹{profile.monthlyInvestment.toLocaleString('en-IN')}/mo SIP • {goalSummary}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize border border-slate-200/60 dark:border-slate-700">
              {profile.riskComfort} risk · {goalSummary}
            </span>
          </div>
        </div>
      </div>

      {/* COPILOT SMART NUDGE (Sleek, Minimal, Essential) */}
      <div
        onClick={() => onNavigate('copilot')}
        className="flex items-center justify-between p-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00D09C]/10 via-[#00D09C]/5 to-transparent border border-[#00D09C]/25 hover:border-[#00D09C]/40 transition cursor-pointer group shadow-xs"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#00D09C]/15 dark:bg-[#00D09C]/20 flex items-center justify-center shrink-0 text-[#008A68] dark:text-[#00D09C] group-hover:scale-105 transition">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#008A68] dark:text-[#00D09C]">
                Copilot Heads Up
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] animate-pulse" />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 truncate font-medium">
              You have 31% in tech shares. Build safety buffer (₹{emergencyGap.toLocaleString('en-IN')} left) before high-risk bets.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#008A68] dark:text-[#00D09C] flex items-center gap-0.5 shrink-0 pl-3">
          Ask <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </span>
      </div>

      {/* TOPIC 2: PORTFOLIO SUMMARY */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 sm:p-6 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-4 transition-colors">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-0.5">
              Portfolio Value
            </span>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ₹{totalValue.toLocaleString('en-IN')}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{returnPercentage}% Total
              </span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
              1-Day Return: +₹1,240 (+0.68%)
            </span>
          </div>

          {/* Buttons Row - Dedicated full-width row on mobile, clean side-by-side without overlapping */}
          <div className="flex items-center gap-2 pt-0.5 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 justify-center"
              onClick={() => onNavigate('portfolio')}
            >
              Analytics
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1 justify-center"
              onClick={() => onNavigate('explore')}
            >
              Explore
            </Button>
          </div>
        </div>

        {/* Core Product Category Chips (2x2 on Mobile, 4 Across on Desktop to prevent truncation) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-0.5 category-grid">
          {[
            { label: 'Stocks', icon: TrendingUp },
            { label: 'Mutual Funds', icon: Coins },
            { label: 'ETFs', icon: LineChart },
            { label: 'SIPs', icon: Calendar },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate('explore')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] hover:bg-slate-100 dark:hover:bg-[#252B3A] border border-slate-200/60 dark:border-[#282D3B] text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
              >
                <Icon className="w-4 h-4 text-[#008A68] dark:text-[#00D09C] shrink-0" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Broad Asset Allocation Bar */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Asset Split</span>
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">Equity 72% • Debt 18% • Gold 10%</span>
          </div>
          <AllocationBar items={mockAssetAllocation} showLegend={false} />
        </div>
      </div>

      {/* TOPIC 3: KEY ATTENTION (Unified, Clean, Zero Redundancy) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Key Attention
          </h2>
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">1 Item Flagged</span>
        </div>

        {/* Primary Insight: Concentration Alert */}
        <div className="bg-[#FFFDF7] dark:bg-[#1C1A14] rounded-3xl p-4 sm:p-5 border border-amber-200/80 dark:border-amber-900/50 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-black text-base flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800/40">
              31%
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Tech Concentration
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 shrink-0">
                  Overweight
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                Above 20% target. TCS & Infosys overlap with Flexi Cap holdings.
              </p>
            </div>
          </div>

          <div className="self-start md:self-auto shrink-0 pt-1 md:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('portfolio', 'sector-breakdown')}
            >
              Review Exposure
            </Button>
          </div>
        </div>

        {/* Secondary Snapshot: Emergency Cushion */}
        <div
          onClick={() => onNavigate('goals')}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/60 dark:border-[#242834] shadow-subtle hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer flex items-center justify-between"
        >
          <div className="space-y-0.5 min-w-0 pr-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
              Emergency Cushion
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
              ₹{emergencyFundAmount.toLocaleString('en-IN')} of ₹1,00,000 (₹{emergencyGap.toLocaleString('en-IN')} gap)
            </span>
          </div>
          <span className="text-xs font-semibold text-[#008A68] dark:text-[#00D09C] flex items-center gap-0.5 shrink-0">
            Top Up <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* TOPIC 4: TRENDING STOCKS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Trending Stocks
          </h2>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-[#008A68] dark:text-[#00D09C] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Explore All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockExploreStocks.slice(0, 3).map((stk) => {
            const isTataTech = stk.symbol === 'TATATECH';
            return (
              <div
                key={stk.id}
                onClick={() => {
                  if (onSelectStock) {
                    onSelectStock(stk);
                  } else {
                    onNavigate('explore');
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16181F] border shadow-subtle hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer ${
                  isTataTech ? 'border-amber-200 dark:border-amber-900/40 ring-1 ring-amber-200/50 bg-[#FFFDFB] dark:bg-[#1C1A14]' : 'border-slate-200/70 dark:border-[#242834]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block truncate">{stk.name}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block truncate mt-0.5">{stk.symbol} • {stk.sector}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">₹{stk.price}</span>
                    <span className="text-[10px] font-bold text-[#008A68] dark:text-[#00D09C] bg-[#E6FAF5] dark:bg-[#00D09C]/15 px-1.5 py-0.2 rounded-md inline-block mt-0.5">
                      +{stk.changePercent}%
                    </span>
                  </div>
                </div>
                {isTataTech && (
                  <div className="mt-2 pt-2 border-t border-amber-100 dark:border-amber-950/60 flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-400">
                    <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="truncate">Copilot: High Tech Overlap</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TOPIC 5: ACTIVE GOALS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Active Goals
          </h2>
          <button
            onClick={() => onNavigate('goals')}
            className="text-xs font-semibold text-[#008A68] dark:text-[#00D09C] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockGoals.slice(0, 2).map((goal) => {
            const isEmergency = goal.id === 'g1';
            const currentAmount = isEmergency ? emergencyFundAmount : goal.currentAmount;
            const progress = Math.round((currentAmount / goal.targetAmount) * 100);

            return (
              <div
                key={goal.id}
                onClick={() => onNavigate('goals')}
                className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/70 dark:border-[#242834] shadow-subtle hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block truncate">
                      {goal.title}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                      ₹{currentAmount.toLocaleString('en-IN')} of ₹{goal.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0">
                    {progress}%
                  </span>
                </div>

                <ProgressBar
                  value={currentAmount}
                  max={goal.targetAmount}
                  color={isEmergency && progress < 80 ? 'amber' : 'emerald'}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
