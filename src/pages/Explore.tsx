import React, { useState } from 'react';
import {
  mockIndices,
  mockExploreStocks
} from '../data/mockData';
import type { StockItem } from '../types';
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ExploreProps {
  onSelectStock: (stock: StockItem) => void;
  onNavigateToCopilot?: () => void;
}

export const Explore: React.FC<ExploreProps> = ({
  onSelectStock,
  onNavigateToCopilot
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Trending');

  const categories = [
    { id: 'Trending', label: 'Trending' },
    { id: 'Technology', label: 'Tech' },
    { id: 'Banking', label: 'Banking' },
    { id: 'ETFs', label: 'ETFs' },
    { id: 'Mutual Funds', label: 'Funds' },
    { id: 'All', label: 'All' }
  ];

  const filteredStocks = mockExploreStocks.filter((stock) => {
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'Trending') return stock.isTrending || stock.symbol === 'TATATECH';
    if (selectedCategory === 'Technology') return stock.sector === 'Technology';
    if (selectedCategory === 'Banking') return stock.sector === 'Financials';
    if (selectedCategory === 'ETFs') return stock.category === 'ETFs';
    if (selectedCategory === 'Mutual Funds') return stock.category === 'Mutual Funds';
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-slide">
      {/* 1. SEARCH BAR */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stocks, mutual funds, ETFs..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/80 dark:border-[#242834] text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-subtle focus:outline-none focus:border-[#00D09C] focus:ring-2 focus:ring-[#00D09C]/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* TOPIC 1: MARKET PULSE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Market Pulse
          </h2>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Live Quotes</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {mockIndices.map((idx) => (
            <div
              key={idx.symbol}
              className="p-3 rounded-2xl bg-white dark:bg-[#16181F] border border-slate-200/70 dark:border-[#242834] shadow-subtle flex flex-col justify-between min-h-[64px]"
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

      {/* CATEGORY PILLS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold shrink-0 transition cursor-pointer select-none ${
              selectedCategory === cat.id
                ? 'bg-slate-900 dark:bg-[#00D09C] text-white dark:text-slate-950 shadow-xs'
                : 'bg-white dark:bg-[#1D212C] hover:bg-slate-100 dark:hover:bg-[#252B3A] text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-[#282D3B]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* TOPIC 2: TRENDING ASSETS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Trending Assets
          </h2>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {filteredStocks.length} Assets
          </span>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 trending-assets-container">
          {filteredStocks.map((stock) => {
            const isTataTech = stock.symbol === 'TATATECH';

            return (
              <div
                key={stock.id}
                onClick={() => onSelectStock(stock)}
                className={`p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#16181F] border transition-all cursor-pointer shadow-subtle hover:border-slate-300 dark:hover:border-slate-600 card-hover ${
                  isTataTech ? 'border-amber-200 dark:border-amber-900/40 ring-1 ring-amber-200/50 bg-[#FFFDFB] dark:bg-[#1C1A14]' : 'border-slate-200/70 dark:border-[#242834]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700">
                      {stock.symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug truncate">
                        {stock.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 block truncate">
                        {stock.symbol} • {stock.sector}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block whitespace-nowrap">
                      ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                    </span>
                    <span className={`text-[10px] font-bold inline-flex items-center gap-0.5 mt-0.5 whitespace-nowrap ${
                      stock.change >= 0 ? 'text-[#008A68] dark:text-[#00D09C]' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stock.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      +{stock.changePercent}%
                    </span>
                  </div>
                </div>

                {/* Copilot Alert Tag */}
                {stock.copilotAlert && (
                  <div className="mt-2.5 pt-2 border-t border-amber-100 dark:border-amber-950/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-400 font-semibold text-[11px] truncate pr-2">
                      <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="truncate">{stock.copilotAlert}</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#008A68] dark:text-[#00D09C] flex items-center shrink-0">
                      Review <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TOPIC 3: MY WATCHLIST */}
      <div className="bg-white dark:bg-[#16181F] rounded-3xl p-4 sm:p-5 border border-slate-200/70 dark:border-[#242834] shadow-card space-y-3 transition-colors">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            My Watchlist
          </h2>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            {mockExploreStocks.filter(s => s.isInWatchlist).length} Saved
          </span>
        </div>

        <div className="space-y-2">
          {mockExploreStocks.filter(s => s.isInWatchlist).map((stk) => {
            const isTataTech = stk.symbol === 'TATATECH';
            return (
              <div
                key={stk.id}
                onClick={() => onSelectStock(stk)}
                className={`p-3 rounded-2xl border flex items-center justify-between transition cursor-pointer card-hover ${
                  isTataTech ? 'bg-[#FFFDFB] dark:bg-[#1C1A14] border-amber-200/80 dark:border-amber-900/40' : 'bg-[#FBFBFA] dark:bg-[#1D212C] border-slate-200/60 dark:border-[#282D3B] hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{stk.name}</span>
                    {isTataTech && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
                        Review Fit
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block truncate mt-0.5">{stk.symbol} • {stk.category}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">₹{stk.price}</span>
                  <span className="text-[11px] font-bold text-[#008A68] dark:text-[#00D09C]">+{stk.changePercent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOPIC 4: DECISION SUPPORT */}
      <div className="bg-[#F0FAF7] dark:bg-[#00D09C]/10 rounded-3xl p-4 sm:p-5 border border-[#00D09C]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#00D09C] text-slate-950 flex items-center justify-center shrink-0 font-bold">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Decision Support
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Evaluates portfolio impact and safety buffers before trades.
            </p>
          </div>
        </div>

        {onNavigateToCopilot && (
          <button
            onClick={onNavigateToCopilot}
            className="text-xs font-bold text-[#008A68] dark:text-[#00D09C] hover:underline self-start sm:self-auto cursor-pointer shrink-0"
          >
            Decision Hub →
          </button>
        )}
      </div>
    </div>
  );
};

export default Explore;
