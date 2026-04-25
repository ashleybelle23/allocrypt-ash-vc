import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/40 disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-7 py-3.5 text-base',
        variant === 'primary' &&
          'bg-gradient-to-r from-[#00c8ff] to-[#00ffb3] text-[#080b14] font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(0,200,255,0.3)]',
        variant === 'secondary' &&
          'border border-[#00c8ff]/40 text-[#00c8ff] hover:bg-[#00c8ff]/10 hover:border-[#00c8ff]/70',
        variant === 'ghost' &&
          'text-zinc-400 hover:text-white hover:bg-white/5',
        variant === 'danger' &&
          'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
