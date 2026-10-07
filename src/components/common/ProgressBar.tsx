import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'emerald' | 'amber' | 'blue' | 'rose' | 'slate' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'emerald',
  size = 'md',
  showPercentage = false,
  label,
  sublabel,
  className = ''
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const getHeightClass = () => {
    switch (size) {
      case 'xs':
        return 'h-1.5';
      case 'sm':
        return 'h-2';
      case 'lg':
        return 'h-3.5';
      case 'md':
      default:
        return 'h-2.5';
    }
  };

  const getBarColorStyle = () => {
    if (color.startsWith('#')) {
      return { backgroundColor: color };
    }
    switch (color) {
      case 'amber':
        return { backgroundColor: '#F59E0B' };
      case 'blue':
        return { backgroundColor: '#3B82F6' };
      case 'rose':
        return { backgroundColor: '#EF4444' };
      case 'slate':
        return { backgroundColor: '#64748B' };
      case 'emerald':
      default:
        return { backgroundColor: '#00D09C' };
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || sublabel) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          {label && <span className="text-slate-700">{label}</span>}
          <div className="flex items-center gap-2 ml-auto">
            {sublabel && <span className="text-slate-500 font-normal">{sublabel}</span>}
            {showPercentage && (
              <span className="text-slate-900 font-semibold">{percentage}%</span>
            )}
          </div>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${getHeightClass()}`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            ...getBarColorStyle()
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
