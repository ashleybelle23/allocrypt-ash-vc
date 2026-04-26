import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ children, className, glow, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.08] bg-[#0d1120]/80 backdrop-blur-sm',
        glow && 'shadow-[0_0_30px_rgba(0,200,255,0.07)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
