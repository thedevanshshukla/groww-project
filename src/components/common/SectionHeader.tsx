import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  action,
  icon,
  className = ''
}) => {
  return (
    <div className={`flex items-start justify-between gap-2 mb-3.5 ${className}`}>
      <div className="flex items-start gap-2.5">
        {icon && (
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs font-semibold text-[#00D09C] hover:text-[#00B386] hover:underline shrink-0 pt-0.5"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
