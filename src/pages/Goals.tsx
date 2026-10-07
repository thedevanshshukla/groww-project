import React from 'react';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import type { NavTab } from '../types';
import {
  ShieldAlert,
  GraduationCap,
  TrendingUp
} from 'lucide-react';

interface GoalsProps {
  onNavigate: (tab: NavTab) => void;
  emergencyFundAmount?: number;
  onAllocateEmergencyFund?: () => void;
}

export const Goals: React.FC<GoalsProps> = ({
  onNavigate,
  emergencyFundAmount = 72000,
  onAllocateEmergencyFund
}) => {
  const emergencyTarget = 100000;
  const emergencyGap = Math.max(0, emergencyTarget - emergencyFundAmount);
  const emergencyPercentage = Math.min(100, Math.round((emergencyFundAmount / emergencyTarget) * 100));

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* 1. HEADER */}
      <div className="pb-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Financial Goals
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Purpose-driven investing roadmap
        </p>
      </div>

      {/* 2. PRIORITY ACTION CARD */}
      <div className="bg-[#F0FAF7] dark:bg-[#12221E] rounded-3xl p-4 sm:p-5 border border-[#00D09C]/30 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D09C]" />
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#008A68] dark:text-[#00D09C]">
              Priority Action
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Emergency Buffer
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug max-w-xl">
            Complete <strong className="text-slate-900 dark:text-white">₹{emergencyGap.toLocaleString('en-IN')}</strong> safety cushion before speculative equity bets.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (onAllocateEmergencyFund) {
                onAllocateEmergencyFund();
              }
            }}
          >
            Allocate ₹5,000
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('copilot')}
          >
            Simulate
          </Button>
        </div>
      </div>

      {/* 3. THREE CRISP GOAL CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Targets
          </h2>
          <span className="text-[11px] text-slate-400">3 Total</span>
        </div>

        {/* GOAL 1: EMERGENCY FUND */}
        <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 border border-slate-200/70 dark:border-[#242834] shadow-subtle space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-900/50">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Emergency Fund
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  3.5 Months Expenses • Target ₹1,00,000
                </span>
              </div>
            </div>

            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
              emergencyPercentage >= 80
                ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border-[#00D09C]/20 dark:border-[#00D09C]/30'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
            }`}>
              {emergencyPercentage >= 80 ? 'On Track' : 'Priority Focus'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">
                Saved: <strong className="text-slate-900 dark:text-white">₹{emergencyFundAmount.toLocaleString('en-IN')}</strong>
              </span>
              <span className="text-slate-900 dark:text-white font-extrabold text-xs">
                {emergencyPercentage}%
              </span>
            </div>
            <ProgressBar
              value={emergencyFundAmount}
              max={emergencyTarget}
              color={emergencyPercentage >= 80 ? 'emerald' : 'amber'}
              size="sm"
            />
          </div>
        </div>

        {/* GOAL 2: HIGHER STUDIES */}
        <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 border border-slate-200/70 dark:border-[#242834] shadow-subtle space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-900/50">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Higher Studies
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Masters Prep • Target ₹3,00,000 (2028)
                </span>
              </div>
            </div>

            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20 dark:border-[#00D09C]/30">
              On Track
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">
                Saved: <strong className="text-slate-900 dark:text-white">₹1,20,000</strong>
              </span>
              <span className="text-slate-900 dark:text-white font-extrabold text-xs">
                40%
              </span>
            </div>
            <ProgressBar
              value={120000}
              max={300000}
              color="emerald"
              size="sm"
            />
          </div>
        </div>

        {/* GOAL 3: LONG-TERM WEALTH */}
        <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 border border-slate-200/70 dark:border-[#242834] shadow-subtle space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] flex items-center justify-center shrink-0 border border-[#00D09C]/30">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Long-Term Wealth
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Equity Compounding • 10+ Years
                </span>
              </div>
            </div>

            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20 dark:border-[#00D09C]/30">
              Compounding
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">
                Invested: <strong className="text-slate-900 dark:text-white">₹1,84,200</strong>
              </span>
              <span className="text-slate-900 dark:text-white font-extrabold text-xs">
                Active SIP
              </span>
            </div>
            <ProgressBar
              value={184200}
              max={250000}
              color="emerald"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
