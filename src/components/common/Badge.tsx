import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'slate' | 'rose' | 'purple';
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'xs',
  icon,
  className = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'amber':
        return 'bg-amber-50/80 text-amber-800 border-amber-200/60';
      case 'rose':
        return 'bg-rose-50 text-rose-800 border-rose-200/60';
      case 'blue':
        return 'bg-blue-50/80 text-blue-700 border-blue-200/60';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'slate':
        return 'bg-slate-100/80 text-slate-700 border-slate-200/60';
      case 'emerald':
      default:
        return 'bg-[#E6FAF5] text-[#008A68] border-[#00D09C]/25';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'md':
        return 'text-xs px-2.5 py-1 font-semibold rounded-lg';
      case 'sm':
        return 'text-[11px] px-2 py-0.5 font-medium rounded-md';
      case 'xs':
      default:
        return 'text-[11px] px-2 py-0.5 font-medium rounded-full';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border select-none ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
