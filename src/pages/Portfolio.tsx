import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AllocationBar from '../components/charts/AllocationBar';
import SectorBreakdownChart from '../components/charts/SectorBreakdownChart';
import {
  mockAssetAllocation,
  mockEquitySectors,
  mockHoldings
} from '../data/mockData';
import type { NavTab } from '../types';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PortfolioProps {
  onNavigate: (tab: NavTab) => void;
  targetSection?: string | null;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onNavigate, targetSection }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Equity' | 'Debt' | 'Gold'>('All');
  const [showOverlapDetails, setShowOverlapDetails] = useState<boolean>(false);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const sectorSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetSection === 'sector-breakdown' && sectorSectionRef.current) {
      sectorSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [targetSection]);

  const filteredHoldings = activeFilter === 'All'
    ? mockHoldings
    : mockHoldings.filter(h => h.category === activeFilter);

  const totalCurrent = 184200;
  const totalInvested = 166000;
  const totalGain = totalCurrent - totalInvested;
  const gainPercentage = ((totalGain / totalInvested) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* 1. PORTFOLIO VALUE (Hero Card) */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-5 sm:p-6 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-0.5">
              Portfolio Value
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ₹{totalCurrent.toLocaleString('en-IN')}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6FAF5] dark:bg-[#00D09C]/15 text-[#008A68] dark:text-[#00D09C] border border-[#00D09C]/20 dark:border-[#00D09C]/30">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{gainPercentage}% (₹{totalGain.toLocaleString('en-IN')})
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Invested ₹{totalInvested.toLocaleString('en-IN')} • 1-Day: +0.68%
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('copilot')}
          >
            Ask Copilot
          </Button>
        </div>

        {/* TOPIC: ASSET SPLIT */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-200">Asset Split</span>
            <span className="text-slate-400 text-[11px] font-medium">Equity 72% • Debt 18% • Gold 10%</span>
          </div>
          <AllocationBar items={mockAssetAllocation} showLegend={true} />
        </div>
      </div>

      {/* 2. TOPIC: SECTOR CONCENTRATION */}
      <div className="bg-[#FFFDF7] dark:bg-[#1C1813] rounded-3xl p-5 border border-amber-200/80 dark:border-amber-900/40 shadow-subtle space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Sector Concentration
            </h3>
          </div>
          <Badge variant="amber">
            Tech: 31%
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug">
          Tech at 31% (20% target). TCS & Infosys overlap with Flexi Cap holdings.
        </p>

        {/* MUTUAL FUND OVERLAP SECTION */}
        <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              Fund Overlap
            </span>
            <button
              onClick={() => setShowOverlapDetails(!showOverlapDetails)}
              className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-300 flex items-center gap-1 focus:outline-none cursor-pointer"
            >
              <span>{showOverlapDetails ? 'Hide details' : 'See details'}</span>
              {showOverlapDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showOverlapDetails && (
            <div className="mt-2.5 p-3.5 rounded-2xl bg-white dark:bg-[#161822] border border-amber-200 dark:border-amber-900/40 shadow-subtle space-y-2.5 animate-fade-slide">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Direct Stocks
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    18%
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    TCS + Infosys
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FBFBFA] dark:bg-[#1D212C] border border-slate-200/60 dark:border-[#282D3B]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Funds Exposure
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    13%
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Flexi Cap
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 block uppercase">
                    Total Tech
                  </span>
                  <span className="text-sm font-extrabold text-amber-950 dark:text-amber-200 block mt-0.5">
                    31%
                  </span>
                  <span className="text-[10px] text-amber-800 dark:text-amber-400 font-semibold block">
                    Overweight
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-0.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('copilot')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Ask Copilot
          </Button>
        </div>
      </div>

      {/* 3. TOPIC: SECTOR BREAKDOWN */}
      <div
        id="sector-breakdown"
        ref={sectorSectionRef}
        className={`bg-white dark:bg-[#16181F] rounded-3xl p-6 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-3.5 transition-all duration-300 ${
          isHighlighted ? 'ring-2 ring-[#00D09C] bg-[#F0FAF7]/30 dark:bg-[#00D09C]/10' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sector Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Comparison against market benchmarks
            </p>
          </div>
          {isHighlighted && (
            <Badge variant="emerald" size="xs">
              Highlighted
            </Badge>
          )}
        </div>

        <SectorBreakdownChart sectors={mockEquitySectors} highlightConcentration={true} />
      </div>

      {/* 4. TOPIC: PORTFOLIO HOLDINGS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Portfolio Holdings
          </h2>

          {/* Minimal Filter Pills */}
          <div className="flex items-center gap-1 bg-[#F4F5F7] dark:bg-slate-800 p-1 rounded-full">
            {(['All', 'Equity', 'Debt', 'Gold'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium transition cursor-pointer select-none ${
                  activeFilter === cat
                    ? 'bg-white dark:bg-[#16181F] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredHoldings.map((holding) => (
            <div
              key={holding.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/70 dark:border-[#242834] shadow-subtle flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-600 transition"
            >
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {holding.name}
                  </span>
                  {holding.sector === 'Technology' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      Tech
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {holding.category} • Invested ₹{holding.investedAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                  ₹{holding.currentValue.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-bold text-[#008A68] dark:text-[#00D09C] flex items-center justify-end gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +{holding.returnsPercentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
