import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/common/Button';
import { mockUser } from '../data/mockData';
import type { NavTab, UserProfile, CopilotResponse } from '../types';
import { askCopilotQuestion } from '../services/copilotService';
import {
  Send,
  X,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';

interface CopilotProps {
  onNavigate: (tab: NavTab) => void;
  onShowToast?: (message: string) => void;
  userProfile?: UserProfile;
  emergencyFundAmount?: number;
}

interface ChatExchange {
  id: string;
  timestamp: string;
  question: string;
  isLoading: boolean;
  response?: CopilotResponse;
  loadingStep?: string;
}

export const Copilot: React.FC<CopilotProps> = ({
  onNavigate,
  onShowToast,
  userProfile = mockUser,
  emergencyFundAmount = 72000
}) => {
  const [customInput, setCustomInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Per-exchange technical details toggle state
  const [expandedTechnicalIds, setExpandedTechnicalIds] = useState<Record<string, boolean>>({});

  const toggleTechnical = (id: string) => {
    setExpandedTechnicalIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // In-app confirmation modal
  const [confirmedAction, setConfirmedAction] = useState<{
    label: string;
    description: string;
  } | null>(null);

  // Suggested Gen Z Scenario Chips
  const promptChips = [
    {
      id: 'instagram',
      label: '🔥 Is Tata Tech social media hype?',
      prompt: 'Should I invest ₹15,000 in Tata Tech? Saw it trending on Instagram.'
    },
    {
      id: 'sip',
      label: '💰 Can I bump my monthly SIP to ₹15k?',
      prompt: 'Should I increase my monthly SIP from ₹10,000 to ₹15,000 on my salary?'
    },
    {
      id: 'emergency',
      label: '🛡️ Emergency buffer vs buying single stocks?',
      prompt: 'Should I prioritize my ₹72,000 emergency fund target or buy trending stocks?'
    },
    {
      id: 'market_dip',
      label: '📉 Market is falling today—should I pause SIP?',
      prompt: 'The market is down 1.8% today. Should I pause my SIP or panic sell?'
    },
    {
      id: 'crypto',
      label: '🪙 Crypto vs Mutual Funds for wealth?',
      prompt: 'Should I put ₹10,000 in crypto or a diversified Nifty index fund for long-term growth?'
    }
  ];

  // Initial featured conversation exchange in clear, friendly Gen Z English
  const [exchanges, setExchanges] = useState<ChatExchange[]>([
    {
      id: 'initial-demo',
      timestamp: 'Just now',
      question: 'Should I invest ₹15,000 in Tata Tech? Saw it trending on Instagram.',
      isLoading: false,
      response: {
        summary: `You already own a lot of tech shares (31%). Adding more means any tech dip will hit your savings harder. Plus, you still have a ₹28,000 gap in your emergency fund.`,
        portfolioFit: {
          label: '⚠️ Tech Overload',
          status: 'caution',
          explanation: '31% of your holdings are already in IT (TCS, Infosys). Adding Tata Tech concentrates you further in one sector.'
        },
        goalFit: {
          label: '🛡️ Safety Net First',
          status: 'caution',
          explanation: 'Finishing your emergency cushion should come before chasing single stock hypes.'
        },
        portfolioImpact: {
          before: '31.0%',
          after: '36.2%',
          explanation: '+5.2% sector increase. Tech becomes over 36% of your portfolio.'
        },
        purchaseContext: {
          label: 'Social Media Hype',
          explanation: 'Discovered via reels. Viral hype often peaks after most of the rally has already happened.'
        },
        tradeoffs: [
          'Too much in one basket: If tech stocks drop 10%, more than a third of your total savings takes the hit.',
          'Priced on hype: Tata Tech trades at a 62.4 P/E vs 28.6 industry avg—it is priced very high.',
          `Safety buffer priority: You still need ₹${(100000 - emergencyFundAmount).toLocaleString('en-IN')} to finish your ₹1 Lakh emergency cushion.`
        ],
        researchChecklist: [
          'Do I know how Tata Tech actually makes money?',
          'Would I still buy this if I hadn’t seen it on Instagram reels?',
          'Can I comfortably hold this if it drops 15% next week?'
        ]
      }
    }
  ]);

  // Scroll smoothly to bottom when new exchange is added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [exchanges]);

  const handleAskQuestion = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isSubmitting) return;

    const exchangeId = `msg-${Date.now()}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append new exchange in loading state
    const newExchange: ChatExchange = {
      id: exchangeId,
      timestamp: timeStr,
      question: trimmed,
      isLoading: true,
      loadingStep: 'Checking your holdings...'
    };

    setExchanges((prev) => [...prev, newExchange]);
    setCustomInput('');
    setIsSubmitting(true);

    if (onShowToast) {
      onShowToast('Copilot is checking your portfolio...');
    }

    // Dynamic stepped loading progress simulation
    const timer1 = setTimeout(() => {
      setExchanges((prev) =>
        prev.map((item) =>
          item.id === exchangeId
            ? { ...item, loadingStep: 'Checking safety cushion & capacity...' }
            : item
        )
      );
    }, 300);

    const timer2 = setTimeout(() => {
      setExchanges((prev) =>
        prev.map((item) =>
          item.id === exchangeId
            ? { ...item, loadingStep: 'Formulating simple trade-offs...' }
            : item
        )
      );
    }, 700);

    try {
      const response = await askCopilotQuestion(trimmed, userProfile, emergencyFundAmount);

      clearTimeout(timer1);
      clearTimeout(timer2);

      setExchanges((prev) =>
        prev.map((item) =>
          item.id === exchangeId
            ? {
                ...item,
                isLoading: false,
                response,
                loadingStep: undefined
              }
            : item
        )
      );

      if (onShowToast) {
        onShowToast('Analysis complete! Check Copilot’s tailored advice below.');
      }
    } catch {
      clearTimeout(timer1);
      clearTimeout(timer2);

      setExchanges((prev) =>
        prev.map((item) =>
          item.id === exchangeId
            ? {
                ...item,
                isLoading: false,
                loadingStep: undefined
              }
            : item
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskQuestion(customInput);
  };

  const handleClearHistory = () => {
    setExchanges([]);
    if (onShowToast) {
      onShowToast('Copilot session reset');
    }
  };

  return (
    <div className="space-y-4 relative animate-fade-slide pb-10">
      {/* 1. COMPACT COPILOT HEADER */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#00D09C] text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Copilot
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20">
                Decision Layer
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Objective gut-check for your investments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('profile')}
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 transition cursor-pointer capitalize"
          >
            {userProfile.name.split(' ')[0]} · {userProfile.riskComfort} risk
          </button>
          {exchanges.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              title="Clear chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. ASK INPUT & PROMPT CHIPS */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-4 sm:p-5 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-3 transition-colors">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. Should I buy Tata Tech or put into emergency fund?"
              disabled={isSubmitting}
              className="w-full text-xs sm:text-sm pl-4 pr-10 py-3 rounded-2xl bg-[#F9F9F8] dark:bg-[#1D212C] border border-slate-200/80 dark:border-[#282D3B] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#00D09C] focus:ring-2 focus:ring-[#00D09C]/20 transition"
            />
            {customInput && (
              <button
                type="button"
                onClick={() => setCustomInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!customInput.trim() || isSubmitting}
            icon={<Send className="w-3.5 h-3.5" />}
            className="shrink-0 px-4 py-3"
          >
            {isSubmitting ? '...' : 'Ask'}
          </Button>
        </form>

        {/* Quick Gen Z Prompt Pills (Horizontal scrollable, clean) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {promptChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleAskQuestion(chip.prompt)}
              disabled={isSubmitting}
              className="text-[11px] px-3 py-1.5 rounded-full font-semibold transition cursor-pointer shrink-0 select-none bg-[#F4F5F7] dark:bg-[#1D212C] hover:bg-[#E6FAF5] dark:hover:bg-[#00D09C]/15 text-slate-700 dark:text-slate-300 hover:text-[#008A68] dark:hover:text-[#00D09C] border border-slate-200/60 dark:border-[#282D3B] hover:border-[#00D09C]/30"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ADVICE FEED & Q&A THREAD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Copilot Decisions ({exchanges.length})
          </h2>
          <span className="text-[11px] font-semibold text-[#008A68] dark:text-[#00D09C]">
            Live Decision Stream
          </span>
        </div>

        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className="space-y-3.5 bg-white dark:bg-[#16181F] rounded-3xl p-4 sm:p-5 border border-slate-200/70 dark:border-[#242834] shadow-card transition-colors"
          >
            {/* User Question Row */}
            <div className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-[#F9F9F8] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {userProfile.name[0]}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">
                    {userProfile.name.split(' ')[0]} asked:
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    "{exchange.question}"
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-medium">
                {exchange.timestamp}
              </span>
            </div>

            {/* Modern Thinking / Reasoning Layer */}
            {exchange.isLoading && (
              <div className="p-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00D09C]/10 via-[#00D09C]/5 to-transparent border border-[#00D09C]/30 flex items-center justify-between gap-3 animate-fade-slide shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-[#00D09C] flex items-center justify-center text-slate-950 shrink-0 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-spin" style={{ animationDuration: '3.5s' }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {exchange.loadingStep || 'Checking your holdings...'}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      Formulating simple trade-offs
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse delay-150" />
                  <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse delay-300" />
                </div>
              </div>
            )}

            {/* Copilot Completed Response */}
            {!exchange.isLoading && exchange.response && (
              <div className="space-y-3.5 animate-fade-slide">
                {/* 1. Bottom-Line Take (Normal Gen Z English) */}
                <div className="p-4 rounded-2xl bg-[#E6FAF5]/60 dark:bg-[#00D09C]/10 border border-[#00D09C]/35 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-[#00D09C] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-xs">
                      <Sparkles className="w-4 h-4 text-slate-950" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-[#008A68] dark:text-[#00D09C] uppercase tracking-wider">
                          Copilot Take
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                        {exchange.response.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Key Gut-Check Badges (Clean, Responsive, No Truncation) */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                    exchange.response.portfolioFit.status === 'good'
                      ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 border-[#00D09C]/30 text-[#008A68] dark:text-[#00D09C]'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300'
                  }`}>
                    <span>{exchange.response.portfolioFit.label}</span>
                  </div>

                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                    exchange.response.goalFit.status === 'good'
                      ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 border-[#00D09C]/30 text-[#008A68] dark:text-[#00D09C]'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300'
                  }`}>
                    <span>{exchange.response.goalFit.label}</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Impact: {exchange.response.portfolioImpact.before} → {exchange.response.portfolioImpact.after} Tech</span>
                  </div>
                </div>

                {/* 3. Simple Takeaways (Normal Everyday English) */}
                <div className="p-4 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    What You Should Consider
                  </span>
                  <div className="space-y-2">
                    {exchange.response.tradeoffs.map((item, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-snug"
                      >
                        <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {tIdx + 1}
                        </span>
                        <p className="flex-1 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. TOGGLE BUTTON: VIEW TECHNICAL DETAILS */}
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => toggleTechnical(exchange.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F9F9F8] dark:bg-[#1D212C] hover:bg-slate-100 dark:hover:bg-[#252B3A] border border-slate-200/70 dark:border-[#282D3B] text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C]" />
                      <span>
                        {expandedTechnicalIds[exchange.id]
                          ? 'Hide Technical Details'
                          : 'View Technical Details (P/E, Beta, Exposure)'}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#008A68] dark:text-[#00D09C] flex items-center gap-0.5">
                      {expandedTechnicalIds[exchange.id] ? 'Less' : 'View'}
                      {expandedTechnicalIds[exchange.id] ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {/* EXPANDED TECHNICAL BREAKDOWN */}
                  {expandedTechnicalIds[exchange.id] && (
                    <div className="mt-2.5 p-4 rounded-2xl bg-[#F5F6F8] dark:bg-[#171A23] border border-slate-200/80 dark:border-[#282D3B] space-y-3 animate-fade-slide">
                      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Quantitative Financial Data
                        </span>
                        <span className="text-[10px] font-bold text-[#008A68] dark:text-[#00D09C]">
                          Deterministic Facts
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Valuation Multiple (P/E)</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                            62.4x <span className="text-[10px] font-normal text-slate-400">(vs 28.6x IT Avg)</span>
                          </span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                            118% Premium
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Sector Concentration</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                            {exchange.response.portfolioImpact.before} → {exchange.response.portfolioImpact.after}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            Tech = {exchange.response.portfolioImpact.after} of portfolio
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Order Sizing Capacity</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                            150% of monthly SIP
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            ₹15,000 order vs ₹10,000 SIP
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Safety Cushion Gap</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                            ₹{(100000 - emergencyFundAmount).toLocaleString('en-IN')} Deficit
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            ₹{emergencyFundAmount.toLocaleString('en-IN')} / ₹1,00,000 target
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B] text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                        <strong className="text-slate-800 dark:text-slate-200">Holdings Overlap Note:</strong> Direct TCS and Infosys holdings combined with underlying IT shares in Flexi Cap mutual funds constitute your baseline 31.0% IT exposure.
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Fast Gut-Check Questions */}
                <div className="p-4 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Ask Yourself Before Deciding
                  </span>
                  <div className="space-y-2">
                    {exchange.response.researchChecklist.slice(0, 3).map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-3 rounded-xl bg-white dark:bg-[#16181F] border border-slate-200/60 dark:border-[#282D3B] text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2.5 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] font-black text-xs flex items-center justify-center shrink-0">
                          ?
                        </span>
                        <span className="leading-snug">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Action Choices (Clear Buttons) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-0.5">
                  <button
                    onClick={() => onNavigate('goals')}
                    className="p-3 rounded-2xl bg-white dark:bg-[#16181F] hover:bg-slate-50 dark:hover:bg-[#202533] border border-slate-200/80 dark:border-[#282D3B] text-left transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Top up Safety Net
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 block">
                        Add ₹5,000 to emergency fund
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#008A68] dark:text-[#00D09C] mt-2 inline-flex items-center gap-0.5">
                      Open Goals <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate('explore')}
                    className="p-3 rounded-2xl bg-white dark:bg-[#16181F] hover:bg-slate-50 dark:hover:bg-[#202533] border border-slate-200/80 dark:border-[#282D3B] text-left transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Browse Index Funds
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 block">
                        Diversified 50-stock basket
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-2 inline-flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>

                  <button
                    onClick={() => setConfirmedAction({
                      label: 'Saved to Watchlist',
                      description: 'Added to your watchlist. Copilot will remind you to review next quarterly earnings before buying.'
                    })}
                    className="p-3 rounded-2xl bg-white dark:bg-[#16181F] hover:bg-slate-50 dark:hover:bg-[#202533] border border-slate-200/80 dark:border-[#282D3B] text-left transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Add to Watchlist
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 block">
                        Cool off & track later
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-2 inline-flex items-center gap-0.5">
                      Watchlist <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* 4. IN-APP CONFIRMATION MODAL */}
      {confirmedAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#16181F] rounded-3xl max-w-sm w-full p-6 shadow-elevated border border-slate-200 dark:border-[#282D3B] animate-fade-slide">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/20 text-[#008A68] dark:text-[#00D09C] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Action Logged
                  </h4>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Decision recorded
                  </span>
                </div>
              </div>
              <button
                onClick={() => setConfirmedAction(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-1.5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {confirmedAction.label}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {confirmedAction.description}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setConfirmedAction(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Copilot;
