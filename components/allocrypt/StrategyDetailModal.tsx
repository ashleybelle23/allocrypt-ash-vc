'use client';

import type { Strategy } from '@/types';
import { ChainBadge } from './ChainBadge';
import { Badge } from '@/components/ui/Badge';
import { RISK_LABELS } from '@/lib/utils';

const CHAIN_BAR_COLOR: Record<string, string> = {
  monad: 'bg-[#00c8ff]',
  ethereum: 'bg-violet-400',
  'cross-chain': 'bg-[#00ffb3]',
};

const riskVariant: Record<string, 'green' | 'yellow' | 'orange' | 'red'> = {
  low: 'green',
  medium: 'yellow',
  high: 'orange',
  experimental: 'red',
};

interface StrategyDetailModalProps {
  strategy: Strategy;
  onClose: () => void;
  onDeploy: (strategy: Strategy) => void;
}

export function StrategyDetailModal({ strategy, onClose, onDeploy }: StrategyDetailModalProps) {
  const barColor = CHAIN_BAR_COLOR[strategy.chain] ?? 'bg-zinc-400';

  function handleDeploy() {
    onClose();
    onDeploy(strategy);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0d1120] shadow-[0_0_60px_rgba(0,200,255,0.1)] overflow-hidden max-h-[90vh] flex flex-col">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00c8ff]/50 to-transparent shrink-0" />

        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">{strategy.name}</h2>
              <div className="flex flex-wrap gap-2">
                <ChainBadge chain={strategy.chain} />
                <Badge variant={riskVariant[strategy.risk]}>{RISK_LABELS[strategy.risk]}</Badge>
                {strategy.comingSoon && <Badge variant="default">Coming Soon</Badge>}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-right">
                <p className="text-xl font-bold text-[#00ffb3]">{strategy.apyLabel}</p>
                <p className="text-xs text-zinc-500">Est. APY</p>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors text-xl leading-none mt-0.5"
              >
                ×
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed">{strategy.description}</p>

          {/* Asset breakdown */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Asset Allocation
            </p>

            <div className="space-y-3">
              {strategy.assetBreakdown.map((asset) => (
                <div
                  key={asset.symbol}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3"
                >
                  {/* Asset header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{asset.symbol}</p>
                        <p className="text-xs text-zinc-500">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{asset.allocationPct}%</p>
                      <p className="text-xs text-zinc-500">{asset.role}</p>
                    </div>
                  </div>

                  {/* Allocation bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Allocation</span>
                      <span className="text-zinc-300 font-medium">{asset.allocationPct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-500`}
                        style={{ width: `${asset.allocationPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Protocol + APY */}
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">
                      Protocol:{' '}
                      <span className="text-zinc-300 font-medium">{asset.protocol}</span>
                    </span>
                    <span className="text-zinc-500">
                      APY contribution:{' '}
                      <span className="text-[#00ffb3] font-medium">{asset.apyContribution}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined allocation bar */}
          <div className="space-y-2">
            <p className="text-xs text-zinc-500">Combined allocation</p>
            <div className="flex h-2 w-full rounded-full overflow-hidden gap-px">
              {strategy.assetBreakdown.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`h-full ${barColor}`}
                  style={{ width: `${asset.allocationPct}%`, opacity: 0.4 + asset.allocationPct / 100 }}
                  title={`${asset.symbol}: ${asset.allocationPct}%`}
                />
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {strategy.assetBreakdown.map((asset) => (
                <div key={asset.symbol} className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span
                    className={`w-2 h-2 rounded-full ${barColor}`}
                    style={{ opacity: 0.4 + asset.allocationPct / 100 }}
                  />
                  {asset.symbol} {asset.allocationPct}%
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-4 space-y-2 text-sm">

            <div className="flex justify-between">
              <span className="text-zinc-500">Protocols</span>
              <span className="text-zinc-300 text-right">{strategy.protocols.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Sticky footer CTA */}
        <div className="shrink-0 p-6 pt-0">
          <button
            onClick={handleDeploy}
            disabled={strategy.comingSoon}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed
              enabled:bg-gradient-to-r enabled:from-[#00c8ff] enabled:to-[#00ffb3]
              enabled:text-[#080b14]
              enabled:hover:opacity-90
              enabled:shadow-[0_0_20px_rgba(0,200,255,0.3)]"
          >
            {strategy.comingSoon ? 'Coming Soon' : 'Deploy Capital'}
          </button>
        </div>
      </div>
    </div>
  );
}
