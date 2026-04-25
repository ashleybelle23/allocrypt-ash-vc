import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'purple' | 'teal';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-white/10 text-zinc-300',
        variant === 'green' && 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
        variant === 'yellow' && 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
        variant === 'orange' && 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
        variant === 'red' && 'bg-red-500/15 text-red-400 border border-red-500/20',
        variant === 'blue' && 'bg-[#00c8ff]/15 text-[#00c8ff] border border-[#00c8ff]/20',
        variant === 'purple' && 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
        variant === 'teal' && 'bg-[#00ffb3]/15 text-[#00ffb3] border border-[#00ffb3]/20',
        className
      )}
    >
      {children}
    </span>
  );
}
