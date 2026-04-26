'use client';

import type { Position } from '@/types';
import { ChainBadge } from './ChainBadge';

const CHAIN_BAR_COLOR: Record<string, string> = {
  monad: 'bg-[#00c8ff]',
  ethereum: 'bg-violet-400',
  'cross-chain': 'bg-[#00ffb3]',
};

export function PositionDetailModal({
  position,
  onClose,
}: {
  position: Position;
  onClose: () => void;
}) {
  const barColor = CHAIN_BAR_COLOR[position.chain] ?? 'bg-zinc-400';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0d1120] shadow-[0_0_60px_rgba(0,200,255,0.1)] overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00c8ff]/50 to-transparent" />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <h2 className="text-lg font-semibold text-white">{position.strategyName}</h2>
              <ChainBadge chain={position.chain} />
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Deployed', value: position.deployed },
              { label: 'Current Value', value: position.currentValue },
              { label: 'P&L', value: position.pnl, green: true },
              { label: 'Rewards', value: position.rewards, teal: true },
            ].map(({ label, value, green, teal }) => (
              <div
                key={label}
                className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 text-center"
              >
                <p className="text-[10px] text-zinc-500 mb-1">{label}</p>
                <p
                  className={`text-sm font-semibold ${
                    green ? 'text-emerald-400' : teal ? 'text-[#00ffb3]' : 'text-white'
                  }`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Asset breakdown */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Asset Allocation
            </p>

            <div className="space-y-3">
              {position.assets.map((asset) => (
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
                      <p className="text-sm font-semibold text-white">{asset.value}</p>
                      <p className="text-xs text-zinc-500">{asset.protocol}</p>
                    </div>
                  </div>

                  {/* Allocation bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Position allocation</span>
                      <span className="text-zinc-300 font-medium">{asset.positionPct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-500`}
                        style={{ width: `${asset.positionPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Portfolio % + APY */}
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">
                      Portfolio share:{' '}
                      <span className="text-zinc-300 font-medium">{asset.portfolioPct}%</span>
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

          {/* Visual allocation summary */}
          <div className="space-y-2">
            <p className="text-xs text-zinc-500">Combined position allocation</p>
            <div className="flex h-2 w-full rounded-full overflow-hidden gap-px">
              {position.assets.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`h-full ${barColor} transition-all duration-500`}
                  style={{ width: `${asset.positionPct}%`, opacity: 0.4 + asset.positionPct / 100 }}
                  title={`${asset.symbol}: ${asset.positionPct}%`}
                />
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {position.assets.map((asset) => (
                <div key={asset.symbol} className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span
                    className={`w-2 h-2 rounded-full ${barColor}`}
                    style={{ opacity: 0.4 + asset.positionPct / 100 }}
                  />
                  {asset.symbol} {asset.positionPct}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
