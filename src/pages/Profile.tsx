import React, { useState } from 'react';
import Button from '../components/common/Button';
import EditProfileModal from '../components/profile/EditProfileModal';
import SimulatedLoginModal from '../components/profile/SimulatedLoginModal';
import { mockUser, mockProductCaseStudyInfo } from '../data/mockData';
import type { NavTab, UserProfile } from '../types';
import {
  Check,
  X,
  ArrowRight,
  Edit3,
  UserCheck,
  RotateCcw,
  UserPlus
} from 'lucide-react';

interface ProfileProps {
  onNavigate: (tab: NavTab) => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  onResetOnboarding?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  onNavigate,
  userProfile = mockUser,
  onUpdateProfile,
  onResetOnboarding
}) => {
  const [fomoSensitivity, setFomoSensitivity] = useState<'high' | 'medium'>('high');
  const [preTradePromptSetting, setPreTradePromptSetting] = useState<number>(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const activeProfile = userProfile || mockUser;

  const handleSaveProfile = (updated: UserProfile) => {
    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }
  };

  const handleApplyPreset = (preset: 'userA' | 'userB' | 'userC') => {
    let presetProfile: UserProfile;
    if (preset === 'userA') {
      presetProfile = {
        name: 'Devansh',
        age: 22,
        experience: 'beginner',
        riskComfort: 'moderate',
        primaryGoal: 'long_term_wealth',
        monthlyInvestment: 10000,
        investmentTypes: ['Stocks', 'Mutual Funds', 'SIPs'],
        monthlyIncome: 45000,
        monthlyExpenses: 28000
      };
    } else if (preset === 'userB') {
      presetProfile = {
        name: 'Kabir',
        age: 26,
        experience: 'experienced',
        riskComfort: 'aggressive',
        primaryGoal: 'long_term_wealth',
        monthlyInvestment: 30000,
        investmentTypes: ['Stocks', 'Mutual Funds', 'ETFs', 'SIPs'],
        monthlyIncome: 95000,
        monthlyExpenses: 42000
      };
    } else {
      presetProfile = {
        name: 'Ananya',
        age: 23,
        experience: 'beginner',
        riskComfort: 'conservative',
        primaryGoal: 'emergency_fund',
        monthlyInvestment: 8000,
        investmentTypes: ['SIPs', 'Mutual Funds'],
        monthlyIncome: 38000,
        monthlyExpenses: 24000
      };
    }

    handleSaveProfile(presetProfile);
  };

  return (
    <div className="space-y-5 animate-fade-slide">
      {/* 1. TOPIC: INVESTOR PROFILE */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 sm:p-6 border border-slate-200/70 dark:border-[#242834] shadow-card transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-lg shadow-xs shrink-0">
              {activeProfile.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Investor Profile
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C]">
                  Active Context
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                {activeProfile.name.split(' ')[0]} • Age {activeProfile.age || 22}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 md:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              icon={<Edit3 className="w-3.5 h-3.5" />}
            >
              Edit Profile
            </Button>
            {onResetOnboarding && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetOnboarding}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Rerun Setup
              </Button>
            )}
          </div>
        </div>

        {/* Serial Profile Attributes (Clean, Full-Width Rows - No Truncation) */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Investing Experience</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white capitalize">
              {activeProfile.experience?.replace('_', ' ') || 'Beginner'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Risk Comfort</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white capitalize">
              {activeProfile.riskComfort || 'Moderate'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Primary Goal</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white capitalize">
              {activeProfile.primaryGoal?.replace(/_/g, ' ') || 'Long-Term Wealth'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monthly SIP</span>
            <span className="text-xs sm:text-sm font-bold text-[#008A68] dark:text-[#00D09C]">
              ₹{(activeProfile.monthlyInvestment || 10000).toLocaleString('en-IN')}/mo
            </span>
          </div>
        </div>

        {/* Current Investments */}
        <div className="mt-3 pt-2 flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Investments:</span>
          {(activeProfile.investmentTypes || ['Stocks', 'Mutual Funds', 'SIPs']).map((inv) => (
            <span key={inv} className="px-2.5 py-0.5 rounded-full bg-[#F4F5F7] dark:bg-[#1D212C] text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-[#282D3B]">
              {inv}
            </span>
          ))}
        </div>
      </div>

      {/* 2. TOPIC: SWITCH PROFILE (Instant Preset Archetypes for Evaluation) */}
      <div className="bg-gradient-to-r from-[#F0FAF7] via-white to-[#F4F5F7] dark:from-[#151922] dark:via-[#191D26] dark:to-[#121418] rounded-3xl p-4 sm:p-6 border border-[#00D09C]/30 shadow-subtle space-y-3 transition-colors">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#008A68] dark:text-[#00D09C] shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Switch Profile
            </h3>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-[11px] font-bold text-[#008A68] dark:text-[#00D09C] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Simulate Login</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-0.5">
          <button
            onClick={() => handleApplyPreset('userA')}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
              activeProfile.name === 'Devansh' || (activeProfile.experience === 'beginner' && activeProfile.riskComfort === 'moderate')
                ? 'bg-white dark:bg-[#16181F] border-[#00D09C] shadow-xs ring-2 ring-[#00D09C]/20'
                : 'bg-white/70 dark:bg-[#1D212C]/70 hover:bg-white dark:hover:bg-[#1D212C] border-slate-200/70 dark:border-[#282D3B]'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Devansh (Beginner)</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 truncate">Moderate risk · ₹10k/mo</span>
            <span className="text-[10px] font-bold text-[#008A68] dark:text-[#00D09C] mt-1.5 inline-block">
              Core Building
            </span>
          </button>

          <button
            onClick={() => handleApplyPreset('userB')}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
              activeProfile.name === 'Kabir' || (activeProfile.experience === 'experienced' && activeProfile.riskComfort === 'aggressive')
                ? 'bg-white dark:bg-[#16181F] border-[#00D09C] shadow-xs ring-2 ring-[#00D09C]/20'
                : 'bg-white/70 dark:bg-[#1D212C]/70 hover:bg-white dark:hover:bg-[#1D212C] border-slate-200/70 dark:border-[#282D3B]'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Kabir (Experienced)</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 truncate">Aggressive risk · ₹30k/mo</span>
            <span className="text-[10px] font-bold text-[#008A68] dark:text-[#00D09C] mt-1.5 inline-block">
              Valuation & Tilt
            </span>
          </button>

          <button
            onClick={() => handleApplyPreset('userC')}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
              activeProfile.name === 'Ananya' || activeProfile.riskComfort === 'conservative' || activeProfile.primaryGoal === 'emergency_fund'
                ? 'bg-white dark:bg-[#16181F] border-[#00D09C] shadow-xs ring-2 ring-[#00D09C]/20'
                : 'bg-white/70 dark:bg-[#1D212C]/70 hover:bg-white dark:hover:bg-[#1D212C] border-slate-200/70 dark:border-[#282D3B]'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Ananya (Conservative)</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 truncate">Safety buffer · ₹8k/mo</span>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-1.5 inline-block">
              Capital Safety
            </span>
          </button>
        </div>
      </div>

      {/* 3. TOPIC: COPILOT SCOPE */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 sm:p-6 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-3.5 transition-colors">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Copilot Scope
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent data inputs and ethical boundaries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
          {/* Data Used */}
          <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B] space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Data Used
            </span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C] shrink-0" />
                <span>Experience & risk comfort</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C] shrink-0" />
                <span>Financial goals & target dates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C] shrink-0" />
                <span>Holdings & sector concentration</span>
              </li>
            </ul>
          </div>

          {/* Copilot Does Not */}
          <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B] space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Copilot Excludes
            </span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <li className="flex items-center gap-2">
                <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>No price speculation</span>
              </li>
              <li className="flex items-center gap-2">
                <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>No guaranteed returns</span>
              </li>
              <li className="flex items-center gap-2">
                <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>No sponsored recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. TOPIC: DECISION CONTROLS */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 sm:p-6 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-3 transition-colors">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Decision Controls
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <div className="min-w-0 pr-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                Social Context
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                Flags trends discovered through social media
              </span>
            </div>
            <select
              value={fomoSensitivity}
              onChange={(e) => setFomoSensitivity(e.target.value as 'high' | 'medium')}
              className="text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-300 dark:border-[#282D3B] bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shrink-0 cursor-pointer"
            >
              <option value="high">Active</option>
              <option value="medium">Minimal</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <div className="min-w-0 pr-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                Pre-Trade Review
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                Shows decision review card before order execution
              </span>
            </div>
            <select
              value={preTradePromptSetting}
              onChange={(e) => setPreTradePromptSetting(Number(e.target.value))}
              className="text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-300 dark:border-[#282D3B] bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shrink-0 cursor-pointer"
            >
              <option value="1">Always</option>
              <option value="2">High Risk Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. TOPIC: CASE STUDY */}
      <div className="bg-slate-900 rounded-3xl p-5 text-white space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#00D09C] uppercase tracking-wider">
            Case Study
          </span>
          <Button
            variant="soft-green"
            size="sm"
            onClick={() => onNavigate('copilot')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Launch Copilot
          </Button>
        </div>
        <p className="text-xs text-slate-300 leading-snug">
          "{mockProductCaseStudyInfo.coreThesis}"
        </p>
      </div>

      {/* EDIT PROFILE MODAL */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        profile={activeProfile}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* SIMULATED LOGIN MODAL */}
      <SimulatedLoginModal
        isOpen={isLoginModalOpen}
        currentProfile={activeProfile}
        onClose={() => setIsLoginModalOpen(false)}
        onSelectProfile={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
