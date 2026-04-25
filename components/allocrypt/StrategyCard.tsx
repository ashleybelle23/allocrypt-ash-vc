'use client';

import type { Strategy } from '@/types';
import { ChainBadge } from './ChainBadge';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RISK_LABELS } from '@/lib/utils';

const riskVariant: Record<string, 'green' | 'yellow' | 'orange' | 'red'> = {
  low: 'green',
  medium: 'yellow',
  high: 'orange',
  experimental: 'red',
};

interface StrategyCardProps {
  strategy: Strategy;
  onDeploy?: (strategy: Strategy) => void;
}

export function StrategyCard({ strategy, onDeploy }: StrategyCardProps) {
  const chainGradient: Record<string, string> = {
    monad: 'from-[#00c8ff]/10 to-transparent',
    ethereum: 'from-violet-500/10 to-transparent',
    'cross-chain': 'from-[#00ffb3]/10 to-transparent',
  };

  return (
    <Card
      glow
      className="relative overflow-hidden flex flex-col h-full group hover:border-white/15 transition-all duration-300"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${chainGradient[strategy.chain]} pointer-events-none`}
      />

      <div className="relative p-5 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-white leading-tight">{strategy.name}</h3>
            <div className="flex flex-wrap gap-1.5">
              <ChainBadge chain={strategy.chain} />
              <Badge variant={riskVariant[strategy.risk]}>
                {RISK_LABELS[strategy.risk]}
              </Badge>
              {strategy.comingSoon && (
                <Badge variant="default">Coming Soon</Badge>
              )}
              {strategy.featured && !strategy.comingSoon && (
                <Badge variant="teal">Featured</Badge>
              )}
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-[#00ffb3]">{strategy.apyLabel}</p>
            <p className="text-xs text-zinc-500">Est. APY</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed flex-1">{strategy.description}</p>

        {/* Assets & Protocols */}
        <div className="space-y-2 text-xs">
          <div className="flex gap-2 flex-wrap">
            <span className="text-zinc-500">Assets:</span>
            {strategy.assets.map((a) => (
              <span key={a} className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">
                {a}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-zinc-500">Protocols:</span>
            <span className="text-zinc-400">{strategy.protocols.join(', ')}</span>
          </div>
          {strategy.minDeposit && (
            <div className="flex gap-2">
              <span className="text-zinc-500">Min. deposit:</span>
              <span className="text-zinc-300">{strategy.minDeposit}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => onDeploy?.(strategy)}
          disabled={strategy.comingSoon}
          className="w-full mt-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            enabled:bg-gradient-to-r enabled:from-[#00c8ff]/20 enabled:to-[#00ffb3]/20
            enabled:border enabled:border-[#00c8ff]/30
            enabled:text-[#00c8ff]
            enabled:hover:from-[#00c8ff]/30 enabled:hover:to-[#00ffb3]/30
            enabled:hover:border-[#00c8ff]/50"
        >
          {strategy.comingSoon ? 'Coming Soon' : 'Deploy Capital'}
        </button>
      </div>
    </Card>
  );
}
