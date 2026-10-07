import React, { useState } from 'react';
import type { UserProfile, ExperienceLevel, RiskComfortLevel, PrimaryGoalType } from '../../types';
import Button from '../common/Button';
import { X, Check, UserPlus, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SimulatedLoginModalProps {
  isOpen: boolean;
  currentProfile: UserProfile;
  onClose: () => void;
  onSelectProfile: (profile: UserProfile) => void;
}

export const PRESET_USERS: Array<{
  id: string;
  badge: string;
  tagline: string;
  profile: UserProfile;
}> = [
  {
    id: 'userA',
    badge: 'Beginner Investor',
    tagline: 'Moderate risk · Long-term wealth · ₹10k/mo SIP',
    profile: {
      name: 'Devansh',
      age: 22,
      role: 'Associate Analyst',
      experience: 'beginner',
      riskComfort: 'moderate',
      primaryGoal: 'long_term_wealth',
      monthlyInvestment: 10000,
      monthlyIncome: 45000,
      monthlyExpenses: 28000,
      investmentTypes: ['Stocks', 'Mutual Funds', 'SIPs'],
      emergencyFundCoverageMonths: 2.6
    }
  },
  {
    id: 'userB',
    badge: 'Experienced Investor',
    tagline: 'Aggressive risk · Long-term wealth · ₹30k/mo SIP',
    profile: {
      name: 'Kabir',
      age: 26,
      role: 'Senior Product Engineer',
      experience: 'experienced',
      riskComfort: 'aggressive',
      primaryGoal: 'long_term_wealth',
      monthlyInvestment: 30000,
      monthlyIncome: 95000,
      monthlyExpenses: 42000,
      investmentTypes: ['Stocks', 'Mutual Funds', 'ETFs', 'SIPs'],
      emergencyFundCoverageMonths: 5.0
    }
  },
  {
    id: 'userC',
    badge: 'Conservative Saver',
    tagline: 'Conservative risk · Safety buffer · ₹8k/mo SIP',
    profile: {
      name: 'Ananya',
      age: 23,
      role: 'Research Associate',
      experience: 'beginner',
      riskComfort: 'conservative',
      primaryGoal: 'emergency_fund',
      monthlyInvestment: 8000,
      monthlyIncome: 38000,
      monthlyExpenses: 24000,
      investmentTypes: ['SIPs', 'Mutual Funds'],
      emergencyFundCoverageMonths: 1.5
    }
  }
];

export const SimulatedLoginModal: React.FC<SimulatedLoginModalProps> = ({
  isOpen,
  currentProfile,
  onClose,
  onSelectProfile
}) => {
  const [activeTab, setActiveTab] = useState<'switch' | 'create'>('switch');

  // Form state for creating a new profile
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(23);
  const [experience, setExperience] = useState<ExperienceLevel>('beginner');
  const [riskComfort, setRiskComfort] = useState<RiskComfortLevel>('moderate');
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoalType>('long_term_wealth');
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);

  if (!isOpen) return null;

  const handleSelectPreset = (p: UserProfile) => {
    onSelectProfile(p);
    onClose();
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'New Investor';
    const newProfile: UserProfile = {
      name: finalName,
      age: age || 23,
      role: 'Investor',
      experience,
      riskComfort,
      primaryGoal,
      monthlyInvestment: Number(monthlyInvestment) || 10000,
      monthlyIncome: Number(monthlyIncome) || 50000,
      monthlyExpenses: Math.round((Number(monthlyIncome) || 50000) * 0.6),
      investmentTypes: ['Stocks', 'Mutual Funds', 'SIPs'],
      emergencyFundCoverageMonths: 3.0
    };

    onSelectProfile(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#161822] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-elevated border border-slate-200 dark:border-[#282D3B] animate-fade-slide space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D09C]" />
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Switch Account Profile
              </h3>
              <span className="text-[10px] font-bold bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] px-2 py-0.5 rounded-full border border-[#00D09C]/20 dark:border-[#00D09C]/30">
                Adaptive Context
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Select an investor account to experience how Copilot adapts reasoning to different risk profiles and goals.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#F4F5F7] dark:bg-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('switch')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'switch'
                ? 'bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C]" />
            <span>Select Account</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'create'
                ? 'bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C]" />
            <span>+ Custom Profile</span>
          </button>
        </div>

        {/* TAB 1: SWITCH PRESET PERSONA */}
        {activeTab === 'switch' && (
          <div className="space-y-3">
            <div className="space-y-2.5">
              {PRESET_USERS.map((preset) => {
                const isSelected =
                  currentProfile.name === preset.profile.name ||
                  (currentProfile.experience === preset.profile.experience &&
                    currentProfile.riskComfort === preset.profile.riskComfort &&
                    currentProfile.monthlyInvestment === preset.profile.monthlyInvestment);

                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.profile)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer card-hover ${
                      isSelected
                        ? 'bg-[#E6FAF5]/40 dark:bg-[#00D09C]/15 border-[#00D09C] ring-2 ring-[#00D09C]/25 shadow-xs'
                        : 'bg-[#FBFBFA] dark:bg-[#1D212C] border-slate-200/80 dark:border-[#282D3B] hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-[#202533]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                          {preset.profile.name[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {preset.profile.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                            {preset.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#008A68] dark:text-[#00D09C] bg-white dark:bg-[#16181F] px-2.5 py-1 rounded-full border border-[#00D09C]/30 shadow-2xs">
                            <Check className="w-3 h-3 text-[#008A68] dark:text-[#00D09C]" /> Active
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-0.5">
                            Select <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Principle Box */}
            <div className="p-3.5 rounded-2xl bg-[#F0FAF7] dark:bg-[#12221E] border border-[#00D09C]/25 dark:border-[#00D09C]/20 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#008A68] dark:text-[#00D09C] shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                <strong className="text-[#008A68] dark:text-[#00D09C]">Product Principle:</strong> The interface stays familiar. The intelligence adapts to the investor.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: CREATE / SIMULATE NEW PROFILE */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateProfile} className="space-y-4">
            {/* Name & Age */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200 dark:border-[#282D3B] text-slate-900 dark:text-white focus:outline-none focus:border-[#00D09C] focus:bg-white dark:focus:bg-[#161822] transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Age
                </label>
                <input
                  type="number"
                  min={18}
                  max={70}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200 dark:border-[#282D3B] text-slate-900 dark:text-white focus:outline-none focus:border-[#00D09C] focus:bg-white dark:focus:bg-[#161822] transition text-center"
                />
              </div>
            </div>

            {/* Primary Goal */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Primary Goal
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'long_term_wealth' as const, label: 'Long-Term Wealth' },
                  { id: 'emergency_fund' as const, label: 'Emergency Cushion' },
                  { id: 'higher_education' as const, label: 'Higher Education' },
                  { id: 'home' as const, label: 'Home Purchase' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setPrimaryGoal(g.id)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition cursor-pointer flex items-center justify-between ${
                      primaryGoal === g.id
                        ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/40 dark:border-[#00D09C]/40 shadow-xs'
                        : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{g.label}</span>
                    {primaryGoal === g.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Comfort */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Risk Comfort
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'conservative' as const, label: 'Conservative' },
                  { id: 'moderate' as const, label: 'Moderate' },
                  { id: 'aggressive' as const, label: 'Aggressive' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRiskComfort(r.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition cursor-pointer ${
                      riskComfort === r.id
                        ? 'bg-[#00D09C] text-white shadow-xs'
                        : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Investing Experience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner' as const, label: 'Beginner' },
                  { id: 'getting_started' as const, label: 'Intermediate' },
                  { id: 'experienced' as const, label: 'Experienced' },
                ].map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setExperience(exp.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition cursor-pointer ${
                      experience === exp.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                        : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Capacity */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200 dark:border-[#282D3B] text-slate-900 dark:text-white focus:outline-none focus:border-[#00D09C] transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Monthly SIP (₹)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200 dark:border-[#282D3B] text-slate-900 dark:text-white focus:outline-none focus:border-[#00D09C] transition"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={<ShieldCheck className="w-3.5 h-3.5" />}
              >
                Create & Login
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SimulatedLoginModal;
