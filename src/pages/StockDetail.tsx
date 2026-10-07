import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import type { StockItem, UserProfile, CopilotResponse, CopilotDecisionContext } from '../types';
import { mockUser, mockPortfolio, mockGoals } from '../data/mockData';
import { computeDeterministicFacts, formatGoal } from '../services/financialEngine';
import { analyzeInvestmentDecision, generateProfileAdaptiveResponse } from '../services/copilotService';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  X,
  Bookmark,
  Sparkles,
  TrendingUp,
  Info,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';

interface StockDetailProps {
  stock: StockItem;
  onBack: () => void;
  onShowToast: (message: string) => void;
  onNavigateToGoals?: () => void;
  userProfile?: UserProfile;
  emergencyFundAmount?: number;
}

export const StockDetail: React.FC<StockDetailProps> = ({
  stock,
  onBack,
  onShowToast,
  onNavigateToGoals,
  userProfile = mockUser,
  emergencyFundAmount = 72000
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y' | 'All'>('1D');
  const [showChecklistModal, setShowChecklistModal] = useState<boolean>(false);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderAmount, setOrderAmount] = useState<number>(15000);
  const [inWatchlist, setInWatchlist] = useState<boolean>(true);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  // Copilot Dynamic State
  const [copilotData, setCopilotData] = useState<CopilotResponse | null>(null);
  const [isLoadingCopilot, setIsLoadingCopilot] = useState<boolean>(true);
  const [copilotError, setCopilotError] = useState<boolean>(false);

  // Dynamic checklist toggle state
  const [checklistChecks, setChecklistChecks] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: true,
    3: false
  });

  const activeProfile = userProfile || mockUser;

  // Fetch or recompute Copilot decision context whenever stock, profile, or orderAmount changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingCopilot(true);
    setCopilotError(false);

    const facts = computeDeterministicFacts(
      mockPortfolio.totalValue,
      mockPortfolio.holdings,
      mockGoals,
      stock,
      orderAmount,
      activeProfile.monthlyInvestment,
      emergencyFundAmount
    );

    const context: CopilotDecisionContext = {
      userProfile: activeProfile,
      portfolio: mockPortfolio,
      goals: mockGoals,
      asset: stock,
      intendedAmount: orderAmount,
      deterministicFacts: facts,
      decisionContext: {
        source: 'instagram',
        queryOrPrompt: 'Discovered on Instagram'
      }
    };

    analyzeInvestmentDecision(context)
      .then((data) => {
        if (isMounted) {
          setCopilotData(data);
          setIsLoadingCopilot(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          // Graceful fallback to deterministic engine
          setCopilotData(generateProfileAdaptiveResponse(context));
          setCopilotError(false);
          setIsLoadingCopilot(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [stock, activeProfile, orderAmount, emergencyFundAmount]);

  const timeframes: Array<'1D' | '1W' | '1M' | '1Y' | '5Y' | 'All'> = ['1D', '1W', '1M', '1Y', '5Y', 'All'];

  const handleToggleWatchlist = () => {
    setInWatchlist(!inWatchlist);
    onShowToast(inWatchlist ? `${stock.symbol} removed from Watchlist` : `${stock.symbol} saved to Watchlist`);
  };

  const handleExecuteBuy = () => {
    setOrderModalOpen(false);
    onShowToast(`Decision logged: ₹${orderAmount.toLocaleString('en-IN')} simulated in ${stock.symbol}`);
  };

  // Fallback data if needed
  const fallbackFacts = computeDeterministicFacts(
    mockPortfolio.totalValue,
    mockPortfolio.holdings,
    mockGoals,
    stock,
    orderAmount,
    activeProfile.monthlyInvestment,
    emergencyFundAmount
  );

  const displayData: CopilotResponse = copilotData || generateProfileAdaptiveResponse({
    userProfile: activeProfile,
    portfolio: mockPortfolio,
    goals: mockGoals,
    asset: stock,
    intendedAmount: orderAmount,
    deterministicFacts: fallbackFacts,
    decisionContext: { source: 'instagram' }
  });

  return (
    <div className="space-y-6 animate-fade-slide pb-12">
      {/* 1. TOP NAVIGATION / BACK BUTTON */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="slate" size="xs">
            NSE: {stock.symbol}
          </Badge>
          <Badge variant="emerald" size="xs">
            Live
          </Badge>
        </div>
      </div>

      {/* 2. GROWW-STYLE STOCK HEADER & PRICE */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-6 sm:p-7 border border-slate-200/70 dark:border-[#242834] shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#00D09C]/10 dark:bg-[#00D09C]/20 text-[#008A68] dark:text-[#00D09C] font-black text-lg flex items-center justify-center border border-[#00D09C]/20 dark:border-[#00D09C]/30 shrink-0">
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stock.name}
                </h1>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stock.category} • {stock.sector}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                stock.change >= 0
                  ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20 dark:border-[#00D09C]/30'
                  : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50'
              }`}>
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{stock.change} (+{stock.changePercent}%) 1D
              </span>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleToggleWatchlist}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
                inWatchlist
                  ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border-[#00D09C]/30 dark:border-[#00D09C]/40'
                  : 'bg-[#FBFBFA] dark:bg-[#1D212C] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-[#282D3B]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1.5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                selectedTimeframe === tf
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* SVG Price Chart Graphic (Groww Clean Style) */}
        <div className="pt-4 pb-2">
          <div className="h-44 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="stockChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D09C" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#00D09C" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area */}
              <path
                d="M 0,110 Q 50,115 100,95 T 200,80 T 300,50 T 400,65 T 500,20 L 500,150 L 0,150 Z"
                fill="url(#stockChartGrad)"
              />
              {/* Line */}
              <path
                d="M 0,110 Q 50,115 100,95 T 200,80 T 300,50 T 400,65 T 500,20"
                fill="none"
                stroke="#00D09C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium px-1 pt-1">
            <span>9:15 AM (Open ₹1,014)</span>
            <span>Current ₹1,048.50</span>
            <span>3:30 PM (Close)</span>
          </div>
        </div>

        {/* 52W & Today's Range Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Today's Low: ₹{stock.todayLow}</span>
              <span>Today's High: ₹{stock.todayHigh}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-[20%] right-[15%] bg-[#00D09C] rounded-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>52W Low: ₹{stock.low52}</span>
              <span>52W High: ₹{stock.high52}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-[35%] right-[25%] bg-slate-400 dark:bg-slate-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. GROWW FUNDAMENTALS GRID */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-6 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Key Fundamentals
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium block">Market Cap</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{stock.marketCap}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium block">P/E Ratio</span>
            <span className="text-sm font-bold text-amber-800 dark:text-amber-400 block mt-0.5">{stock.pe}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium block">Industry P/E</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{stock.industryPe}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
            <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium block">Volume (Today)</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{stock.volume}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. ✨ COPILOT: "BEFORE INVESTING" CONTEXTUAL DECISION LAYER
          ========================================================================= */}
      <div className="bg-gradient-to-b from-[#F0FAF7]/90 via-white to-[#FFFDF7] dark:from-[#131D1E] dark:via-[#161822] dark:to-[#13161F] rounded-3xl p-6 border-2 border-[#00D09C]/40 dark:border-[#00D09C]/30 shadow-card space-y-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-emerald-100 dark:border-emerald-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00D09C] text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Before Investing
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20 dark:border-[#00D09C]/30">
                  Copilot Analysis
                </span>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 capitalize bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-200/70 dark:border-slate-700">
                  {activeProfile.riskComfort} risk · {formatGoal(activeProfile.primaryGoal)}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Personalized for {activeProfile.name.split(' ')[0]} • ₹{(activeProfile.monthlyInvestment || 10000).toLocaleString('en-IN')}/mo SIP
              </p>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoadingCopilot && (
          <div className="py-6 space-y-3 text-center">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 animate-pulse">
              Analyzing fit for your portfolio...
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto pt-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* ERROR FALLBACK BANNER */}
        {!isLoadingCopilot && copilotError && (
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Copilot is temporarily offline. Showing deterministic portfolio analysis.</span>
          </div>
        )}

        {/* MAIN COPILOT CONTENT WHEN READY */}
        {!isLoadingCopilot && (
          <>
            {/* 1. Context Summary Callout (Plain English) */}
            <div className="p-4 rounded-2xl bg-[#E6FAF5]/70 dark:bg-[#00D09C]/15 border border-[#00D09C]/35 dark:border-[#00D09C]/35 space-y-1 shadow-subtle">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#008A68] dark:text-[#00D09C] block">
                Copilot Gut-Check
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                {displayData.summary}
              </p>
            </div>

            {/* 2. Key Gut-Check Badges (Clean, Responsive, No Truncation) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                displayData.portfolioFit.status === 'good'
                  ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 border-[#00D09C]/30 dark:border-[#00D09C]/35 text-[#008A68] dark:text-[#00D09C]'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300'
              }`}>
                <span>{displayData.portfolioFit.label}</span>
              </div>

              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                displayData.goalFit.status === 'good'
                  ? 'bg-[#E6FAF5] dark:bg-[#00D09C]/15 border-[#00D09C]/30 dark:border-[#00D09C]/35 text-[#008A68] dark:text-[#00D09C]'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300'
              }`}>
                <span>{displayData.goalFit.label}</span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] text-xs font-bold text-slate-700 dark:text-slate-200">
                <span>Impact: {displayData.portfolioImpact.before} → {displayData.portfolioImpact.after} Tech</span>
              </div>
            </div>

            {/* 3. Key Trade-Offs (Plain Everyday English) */}
            <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Things to Consider
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-200 space-y-1.5 leading-relaxed font-medium">
                {displayData.tradeoffs.map((tradeoff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#008A68] dark:text-[#00D09C] font-bold shrink-0 mt-0.5">•</span>
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Questions to Ask Yourself Before Deciding */}
            <div className="p-3.5 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Questions to Ask Yourself
              </span>
              <div className="space-y-1.5">
                {displayData.researchChecklist.slice(0, 3).map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#161822] border border-slate-200/60 dark:border-[#282D3B] text-xs text-slate-700 dark:text-slate-200 font-medium shadow-2xs">
                    <span className="w-4 h-4 rounded-full bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] font-black text-[10px] flex items-center justify-center shrink-0">
                      ?
                    </span>
                    <span className="leading-snug">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. TOGGLE BUTTON: VIEW TECHNICAL DETAILS */}
            <div>
              <button
                type="button"
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F9F9F8] dark:bg-[#1D212C] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-[#282D3B] text-xs font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#008A68] dark:text-[#00D09C]" />
                  <span>
                    {showTechnicalDetails
                      ? 'Hide Technical Details'
                      : 'View Technical Details (P/E, Beta, Sector Delta)'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#008A68] dark:text-[#00D09C] flex items-center gap-0.5">
                  {showTechnicalDetails ? 'Less' : 'View'}
                  {showTechnicalDetails ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              {/* EXPANDED TECHNICAL BREAKDOWN */}
              {showTechnicalDetails && (
                <div className="mt-2.5 p-4 rounded-2xl bg-[#F5F6F8] dark:bg-[#141620] border border-slate-200/80 dark:border-[#242834] space-y-3 animate-fade-slide">
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Quantitative Financial Data
                    </span>
                    <span className="text-[10px] font-bold text-[#008A68] dark:text-[#00D09C]">
                      Verified Engine Facts
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1D27] border border-slate-200/60 dark:border-[#282D3B]">
                      <span className="text-[10px] text-slate-400 block">Valuation Multiple (P/E)</span>
                      <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                        {stock.pe ?? 62.4}x <span className="text-[10px] font-normal text-slate-400">(vs {stock.industryPe ?? 28.6}x IT Avg)</span>
                      </span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                        High Valuation Multiple
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1D27] border border-slate-200/60 dark:border-[#282D3B]">
                      <span className="text-[10px] text-slate-400 block">Sector Concentration</span>
                      <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                        {displayData.portfolioImpact.before} → {displayData.portfolioImpact.after}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        Tech = {displayData.portfolioImpact.after} of portfolio
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1D27] border border-slate-200/60 dark:border-[#282D3B]">
                      <span className="text-[10px] text-slate-400 block">Order Sizing Capacity</span>
                      <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                        {Math.round((orderAmount / Math.max(1, activeProfile.monthlyInvestment)) * 100)}% of monthly SIP
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        ₹{orderAmount.toLocaleString('en-IN')} vs ₹{activeProfile.monthlyInvestment.toLocaleString('en-IN')} SIP
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1D27] border border-slate-200/60 dark:border-[#282D3B]">
                      <span className="text-[10px] text-slate-400 block">Emergency Cushion Gap</span>
                      <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">
                        ₹{Math.max(0, 100000 - emergencyFundAmount).toLocaleString('en-IN')} Deficit
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        ₹{emergencyFundAmount.toLocaleString('en-IN')} / ₹1,00,000 target
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1D27] border border-slate-200/60 dark:border-[#282D3B] text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-800 dark:text-white">Direct vs Fund Overlap:</strong> Your current portfolio already holds technology exposure through TCS, Infosys, and flexi-cap mutual fund holdings.
                  </div>
                </div>
              )}
            </div>

            {/* Copilot Action Choices */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowChecklistModal(true)}
              >
                Research Checklist
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleWatchlist}
              >
                {inWatchlist ? 'Saved in Watchlist' : 'Add to Watchlist'}
              </Button>

              {onNavigateToGoals && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNavigateToGoals}
                >
                  Top Up Emergency Fund
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      {/* 5. GROWW BUY ORDER ACTION DOCK */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-4 sm:p-6 border border-slate-200/70 dark:border-[#242834] shadow-card flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="space-y-0.5 mb-2 md:mb-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
            Order Execution
          </span>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Amount to invest: ₹{orderAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              (~{Math.round(orderAmount / stock.price)} shares @ ₹{stock.price})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-2.5 pt-1 md:pt-0">
          <div className="flex items-center gap-1 bg-[#F4F5F7] dark:bg-slate-800 p-1 rounded-2xl shrink-0">
            {[5000, 10000, 15000].map((amt) => (
              <button
                key={amt}
                onClick={() => setOrderAmount(amt)}
                className={`text-xs px-2.5 py-1 rounded-xl font-bold transition cursor-pointer ${
                  orderAmount === amt
                    ? 'bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ₹{(amt / 1000)}k
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setOrderModalOpen(true)}
            icon={<TrendingUp className="w-4 h-4" />}
            className="shrink-0"
          >
            Buy {stock.symbol}
          </Button>
        </div>
      </div>

      {/* IN-APP RESEARCH CHECKLIST MODAL */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161822] rounded-3xl max-w-md w-full p-6 shadow-elevated border border-slate-200 dark:border-[#262B3A] animate-fade-slide space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Quick Research Checklist
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Contextual sanity check adapted for your {activeProfile.experience.replace('_', ' ')} profile
                </p>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {displayData.researchChecklist.map((itemText, index) => {
                const isChecked = Boolean(checklistChecks[index]);
                return (
                  <label
                    key={index}
                    onClick={() => setChecklistChecks(prev => ({ ...prev, [index]: !prev[index] }))}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/70 dark:border-[#282D3B] hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="w-4 h-4 text-[#00D09C] rounded border-slate-300 dark:border-slate-600 focus:ring-[#00D09C]"
                    />
                    <span className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-snug">
                      {itemText}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Score: {Object.values(checklistChecks).filter(Boolean).length}/{displayData.researchChecklist.length} checks completed
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowChecklistModal(false);
                  onShowToast('Checklist completed');
                }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP BUY ORDER MODAL */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161822] rounded-3xl max-w-sm w-full p-6 shadow-elevated border border-slate-200 dark:border-[#262B3A] animate-fade-slide space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Decision Logged
                  </h4>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Simulated Investment Decision
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2 space-y-3">
              <div className="p-3 rounded-2xl bg-[#F9F9F8] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B] flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Asset</span>
                <span className="font-bold text-slate-900 dark:text-white">{stock.name} ({stock.symbol})</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F9F9F8] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B] flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Proposed Amount</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{orderAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/50 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1 text-[#008A68] dark:text-[#00D09C]">
                  <Info className="w-3.5 h-3.5" />
                  <span>Trade-off Acknowledged:</span>
                </div>
                <p>
                  You reviewed the {displayData.portfolioImpact.before} → {displayData.portfolioImpact.after} tech exposure impact. Investment simulated in demo portfolio.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleExecuteBuy}
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

export default StockDetail;
