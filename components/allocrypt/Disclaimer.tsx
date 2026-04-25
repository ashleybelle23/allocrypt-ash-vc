import { cn } from '@/lib/utils';

export function Disclaimer({ className, compact }: { className?: string; compact?: boolean }) {
  if (compact) {
    return (
      <p className={cn('text-xs text-zinc-500 leading-relaxed', className)}>
        Allocrypt is experimental software. Smart contracts may be unaudited. DeFi involves risk,
        including loss of principal. Deploy only what you can afford to lose.
      </p>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-amber-500/20 bg-amber-500/5 p-5',
        className
      )}
    >
      <div className="flex gap-3">
        <span className="text-amber-400 text-lg leading-none mt-0.5">⚠</span>
        <div className="space-y-2">
          <p className="text-sm font-medium text-amber-400">Risk Disclosure</p>
          <ul className="text-sm text-zinc-400 space-y-1 leading-relaxed">
            <li>Allocrypt is experimental software in active development.</li>
            <li>Smart contracts deployed may not yet be audited by third parties.</li>
            <li>DeFi protocols carry risk including smart contract bugs, oracle failures, and market volatility.</li>
            <li>You may lose some or all of the capital you deploy.</li>
            <li>Users are solely responsible for their own investment decisions.</li>
            <li>APY figures are estimates only and not guaranteed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
