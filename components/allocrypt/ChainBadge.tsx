import type { Chain } from '@/types';
import { cn } from '@/lib/utils';

const config: Record<Chain, { label: string; dot: string; bg: string; text: string; border: string }> = {
  monad: {
    label: 'Monad',
    dot: 'bg-[#00c8ff]',
    bg: 'bg-[#00c8ff]/10',
    text: 'text-[#00c8ff]',
    border: 'border-[#00c8ff]/25',
  },
  ethereum: {
    label: 'Ethereum',
    dot: 'bg-violet-400',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/25',
  },
  'cross-chain': {
    label: 'Cross-Chain',
    dot: 'bg-[#00ffb3]',
    bg: 'bg-[#00ffb3]/10',
    text: 'text-[#00ffb3]',
    border: 'border-[#00ffb3]/25',
  },
};

export function ChainBadge({ chain, className }: { chain: Chain; className?: string }) {
  const c = config[chain];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        c.bg,
        c.text,
        c.border,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  );
}
