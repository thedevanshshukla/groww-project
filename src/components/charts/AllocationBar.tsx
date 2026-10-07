import React from 'react';
import type { AssetAllocationItem } from '../../types';

interface AllocationBarProps {
  items: AssetAllocationItem[];
  showLegend?: boolean;
}

export const AllocationBar: React.FC<AllocationBarProps> = ({
  items,
  showLegend = true,
}) => {
  const total = items.reduce((acc, curr) => acc + curr.percentage, 0);

  return (
    <div className="w-full space-y-3">
      {/* Sleek Segmented Bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex gap-[2px]">
        {items.map((item) => (
          <div
            key={item.name}
            className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${(item.percentage / total) * 100}%`,
              backgroundColor: item.color
            }}
            title={`${item.name}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Clean Legend */}
      {showLegend && (
        <div className="flex items-center justify-between gap-3 pt-1 text-xs">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-slate-600">
                {item.name}
              </span>
              <span className="font-bold text-slate-900">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllocationBar;
