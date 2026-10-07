import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'soft-green';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#00D09C] hover:bg-[#00B386] text-white font-semibold shadow-xs active:bg-[#009e75]';
      case 'secondary':
        return 'bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs';
      case 'soft-green':
        return 'bg-[#E6FAF5] hover:bg-[#D5F5EC] text-[#008A68] font-semibold border border-[#00D09C]/20';
      case 'outline':
        return 'bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-200/90 hover:border-slate-300 shadow-subtle';
      case 'ghost':
        return 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white font-semibold shadow-xs';
      default:
        return 'bg-[#00D09C] text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5';
      case 'lg':
        return 'text-base px-6 py-3 rounded-2xl gap-2.5';
      case 'md':
      default:
        return 'text-sm px-4 py-2.5 rounded-xl gap-2';
    }
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all duration-150 active:scale-[0.98] select-none tracking-tight ${
        fullWidth ? 'w-full' : ''
      } ${getVariantStyles()} ${getSizeStyles()} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default Button;
