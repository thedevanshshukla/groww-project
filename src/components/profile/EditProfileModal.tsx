import React, { useState } from 'react';
import Button from '../common/Button';
import type { UserProfile, ExperienceLevel, RiskComfortLevel, PrimaryGoalType } from '../../types';
import { X, Check } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (updated: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave
}) => {
  const [name, setName] = useState<string>(profile.name);
  const [experience, setExperience] = useState<ExperienceLevel>(profile.experience);
  const [riskComfort, setRiskComfort] = useState<RiskComfortLevel>(profile.riskComfort);
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoalType>(profile.primaryGoal);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(profile.monthlyInvestment);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...profile,
      name: name.trim() || profile.name,
      experience,
      riskComfort,
      primaryGoal,
      monthlyInvestment
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#161822] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-elevated border border-slate-200 dark:border-[#282D3B] animate-fade-slide space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Edit Investing Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Changes immediately adapt Groww Copilot's contextual reasoning
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/80 dark:border-[#282D3B] text-slate-900 dark:text-white focus:outline-none focus:border-[#00D09C] focus:bg-white dark:focus:bg-[#161822]"
          />
        </div>

        {/* Experience Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Investing Experience
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'beginner' as const, label: 'Beginner' },
              { id: 'getting_started' as const, label: 'Getting Started' },
              { id: 'experienced' as const, label: 'Experienced' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setExperience(item.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                  experience === item.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Comfort */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Risk Comfort
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'conservative' as const, label: 'Conservative' },
              { id: 'moderate' as const, label: 'Moderate' },
              { id: 'aggressive' as const, label: 'Aggressive' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRiskComfort(item.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                  riskComfort === item.id
                    ? 'bg-[#00D09C] text-white shadow-xs'
                    : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Goal */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Primary Goal
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'long_term_wealth' as const, label: 'Long-term Wealth' },
              { id: 'emergency_fund' as const, label: 'Emergency Fund' },
              { id: 'higher_education' as const, label: 'Higher Education' },
              { id: 'home' as const, label: 'Buying a Home' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPrimaryGoal(item.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition text-left cursor-pointer flex items-center justify-between ${
                  primaryGoal === item.id
                    ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/40 dark:border-[#00D09C]/40'
                    : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {primaryGoal === item.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly Investment Capacity */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Monthly Investing Capacity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[5000, 10000, 30000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setMonthlyInvestment(amt)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                  monthlyInvestment === amt
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
          >
            Save & Update Copilot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
