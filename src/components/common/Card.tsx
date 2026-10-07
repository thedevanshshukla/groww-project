import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'subtle' | 'elevated' | 'alert' | 'highlight';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'subtle':
        return 'bg-[#F9F9F8] border border-slate-200/50 shadow-none';
      case 'elevated':
        return 'bg-white border border-slate-100 shadow-elevated';
      case 'alert':
        return 'bg-amber-50/40 border border-amber-200/70 shadow-subtle';
      case 'highlight':
        return 'bg-[#F0FAF7] border border-emerald-200/70 shadow-subtle';
      case 'default':
      default:
        return 'bg-white border border-slate-200/70 shadow-card';
    }
  };

  const isInteractive = Boolean(onClick || hoverable);
  const interactiveStyles = isInteractive
    ? 'cursor-pointer card-hover active:scale-[0.99]'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all ${getVariantStyles()} ${interactiveStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
