import React, { useState } from 'react';
import Button from '../common/Button';
import type { UserProfile, ExperienceLevel, RiskComfortLevel, PrimaryGoalType } from '../../types';
import {
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('Devansh');
  const [age, setAge] = useState<number>(22);
  const [experience, setExperience] = useState<ExperienceLevel>('beginner');
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoalType>('long_term_wealth');
  const [riskComfort, setRiskComfort] = useState<RiskComfortLevel>('moderate');
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomSelected, setIsCustomSelected] = useState<boolean>(false);
  const [investmentTypes, setInvestmentTypes] = useState<string[]>(['Stocks', 'Mutual Funds', 'SIPs']);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleToggleType = (type: string) => {
    if (type === "I'm just getting started") {
      setInvestmentTypes(["I'm just getting started"]);
      return;
    }
    const filtered = investmentTypes.filter((t) => t !== "I'm just getting started");
    if (filtered.includes(type)) {
      const next = filtered.filter((t) => t !== type);
      setInvestmentTypes(next.length === 0 ? ["I'm just getting started"] : next);
    } else {
      setInvestmentTypes([...filtered, type]);
    }
  };

  const handleFinish = () => {
    const finalProfile: UserProfile = {
      name: name.trim() || 'Devansh',
      age: age || 22,
      role: 'Associate Analyst',
      experience,
      riskComfort,
      primaryGoal,
      monthlyInvestment: isCustomSelected && Number(customAmount) > 0 ? Number(customAmount) : monthlyInvestment,
      monthlyIncome: 45000,
      monthlyExpenses: 28000,
      currentSavings: 120000,
      investmentTypes
    };
    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-slate-200 animate-fade-slide relative overflow-hidden">
        {/* Brand Accent */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00D09C] text-white flex items-center justify-center font-black text-sm">
              G
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-base">
              Groww
            </span>
          </div>

          {step <= totalSteps && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Step {step} of {totalSteps}</span>
            </div>
          )}
        </div>

        {/* Step Progress Line */}
        {step <= totalSteps && (
          <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#00D09C] h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        )}

        <div className="py-5">
          {/* STEP 1: INVESTING EXPERIENCE */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Let's personalize your Groww
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Answer a few questions so Copilot can give you more relevant context.
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  1. What is your investing experience?
                </label>
                <div className="space-y-2 pt-1">
                  {[
                    { id: 'beginner' as const, label: 'New to investing', desc: 'First time buying stocks or mutual funds' },
                    { id: 'getting_started' as const, label: 'Getting started', desc: 'Invested a few times, learning fundamentals' },
                    { id: 'experienced' as const, label: 'Experienced', desc: 'Active investor comfortable with market movements' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setExperience(item.id)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        experience === item.id
                          ? 'border-[#00D09C] bg-[#F0FAF7] ring-1 ring-[#00D09C]'
                          : 'border-slate-200/80 bg-[#FBFBFA] hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{item.label}</span>
                        <span className="text-xs text-slate-500 block mt-0.5">{item.desc}</span>
                      </div>
                      {experience === item.id && (
                        <div className="w-5 h-5 rounded-full bg-[#00D09C] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PRIMARY GOAL */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  What is your primary goal?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Copilot maps your asset allocation against this purpose.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { id: 'long_term_wealth' as const, label: 'Long-term wealth', desc: '10+ year compounding with equity focus' },
                  { id: 'emergency_fund' as const, label: 'Emergency fund', desc: 'Liquid buffer covering 3–6 months of expenses' },
                  { id: 'higher_education' as const, label: 'Higher education', desc: 'Medium-term goal (MBA / Masters prep)' },
                  { id: 'home' as const, label: 'Buying a home', desc: 'Savings target for property down payment' },
                  { id: 'multiple' as const, label: 'Multiple goals', desc: 'Balancing safety reserves and long-term equity' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPrimaryGoal(item.id)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      primaryGoal === item.id
                        ? 'border-[#00D09C] bg-[#F0FAF7] ring-1 ring-[#00D09C]'
                        : 'border-slate-200/80 bg-[#FBFBFA] hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-[11px] text-slate-500 block">{item.desc}</span>
                    </div>
                    {primaryGoal === item.id && (
                      <div className="w-4 h-4 rounded-full bg-[#00D09C] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: RISK COMFORT */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  What is your risk comfort?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  How comfortable are you with portfolio fluctuations?
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {[
                  {
                    id: 'conservative' as const,
                    label: 'Conservative',
                    desc: 'Capital protection is priority. Uncomfortable with sudden double-digit drops.'
                  },
                  {
                    id: 'moderate' as const,
                    label: 'Moderate',
                    desc: 'Balanced approach. Accept normal market volatility for long-term growth.'
                  },
                  {
                    id: 'aggressive' as const,
                    label: 'Aggressive',
                    desc: 'High growth focus. Comfortable with high equity drawdowns for maximum compounding.'
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setRiskComfort(item.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      riskComfort === item.id
                        ? 'border-[#00D09C] bg-[#F0FAF7] ring-1 ring-[#00D09C]'
                        : 'border-slate-200/80 bg-[#FBFBFA] hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-xs text-slate-500 block mt-0.5">{item.desc}</span>
                    </div>
                    {riskComfort === item.id && (
                      <div className="w-5 h-5 rounded-full bg-[#00D09C] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: MONTHLY INVESTMENT AMOUNT */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Monthly investment capacity
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Roughly how much do you plan to invest each month?
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {[5000, 10000, 25000].map((amt) => (
                  <div
                    key={amt}
                    onClick={() => {
                      setMonthlyInvestment(amt);
                      setIsCustomSelected(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                      !isCustomSelected && monthlyInvestment === amt
                        ? 'border-[#00D09C] bg-[#F0FAF7] ring-1 ring-[#00D09C]'
                        : 'border-slate-200/80 bg-[#FBFBFA] hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs text-slate-400 block font-medium">Monthly</span>
                    <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                      ₹{amt.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomSelected(true)}
                  className={`w-full text-left p-3 rounded-2xl border transition ${
                    isCustomSelected ? 'border-[#00D09C] bg-white' : 'border-slate-200/80 bg-[#FBFBFA]'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    Custom monthly amount
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 15000"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setIsCustomSelected(true);
                      }}
                      className="w-full text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: WHAT DO YOU CURRENTLY INVEST IN? + OPTIONAL AGE */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  What do you currently invest in?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select all that apply to your current portfolio.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {['Stocks', 'Mutual Funds', 'ETFs', 'SIPs', "I'm just getting started"].map((type) => {
                  const isChecked = investmentTypes.includes(type);
                  return (
                    <div
                      key={type}
                      onClick={() => handleToggleType(type)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'border-[#00D09C] bg-[#F0FAF7]'
                          : 'border-slate-200/80 bg-[#FBFBFA] hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900">{type}</span>
                      {isChecked && (
                        <div className="w-4 h-4 rounded-full bg-[#00D09C] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Optional Name & Age */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Devansh"
                    className="w-full mt-1 px-3 py-2 text-xs font-bold text-slate-900 rounded-xl bg-[#FBFBFA] border border-slate-200/80 focus:outline-none focus:border-[#00D09C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block">Age (Optional)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="22"
                    className="w-full mt-1 px-3 py-2 text-xs font-bold text-slate-900 rounded-xl bg-[#FBFBFA] border border-slate-200/80 focus:outline-none focus:border-[#00D09C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: READY COMPLETION VIEW */}
          {step === 6 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E6FAF5] text-[#008A68] mx-auto flex items-center justify-center shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Your investing profile is ready.
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Groww Copilot is personalized with your risk preferences and goals.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-slate-200/70 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Experience</span>
                  <span className="font-bold text-slate-900 capitalize">{experience.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Risk comfort</span>
                  <span className="font-bold text-slate-900 capitalize">{riskComfort}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Primary goal</span>
                  <span className="font-bold text-slate-900 capitalize">{primaryGoal.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly investing</span>
                  <span className="font-bold text-[#008A68]">
                    ₹{(isCustomSelected && Number(customAmount) > 0 ? Number(customAmount) : monthlyInvestment).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleFinish}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Explore Groww
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        {step <= totalSteps && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={() => setStep(step + 1)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              {step === totalSteps ? 'Complete Profile' : 'Continue'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;
