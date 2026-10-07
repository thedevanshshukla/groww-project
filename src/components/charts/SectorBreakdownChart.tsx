import React from 'react';
import type { EquitySector } from '../../types';

interface SectorBreakdownChartProps {
  sectors: EquitySector[];
  highlightConcentration?: boolean;
}

export const SectorBreakdownChart: React.FC<SectorBreakdownChartProps> = ({
  sectors,
  highlightConcentration = true,
}) => {
  return (
    <div className="w-full space-y-3">
      {sectors.map((sector) => {
        const isTechAlert = highlightConcentration && sector.sector === 'Technology';
        const isElevated = sector.status === 'elevated';

        return (
          <div
            key={sector.sector}
            className={`p-4 rounded-2xl border transition-all ${
              isTechAlert
                ? 'bg-[#FFFDF7] border-amber-200 shadow-subtle'
                : 'bg-white border-slate-200/70 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${isElevated ? 'text-amber-950 text-sm' : 'text-slate-900'}`}>
                  {sector.sector}
                </span>
                {isElevated && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Above target
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 text-[11px]">
                  Target: {sector.benchmarkPercentage}%
                </span>
                <span className={`text-sm font-extrabold ${isElevated ? 'text-amber-900' : 'text-slate-900'}`}>
                  {sector.percentage}%
                </span>
              </div>
            </div>

            {/* Elegant horizontal bar */}
            <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              {/* Benchmark marker line indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                style={{ left: `${sector.benchmarkPercentage}%` }}
                title={`Target: ${sector.benchmarkPercentage}%`}
              />
              {/* Actual percentage bar */}
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isElevated ? 'bg-amber-500' : 'bg-[#00D09C]'
                }`}
                style={{ width: `${sector.percentage}%` }}
              />
            </div>

            {isTechAlert && (
              <p className="mt-2.5 text-xs text-amber-900 leading-relaxed font-medium bg-amber-100/40 p-2.5 rounded-xl border border-amber-200/60">
                Your technology exposure is above the 20% target you selected. Sector concentration can increase the impact of a downturn in that sector.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectorBreakdownChart;
