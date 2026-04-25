import type { Portfolio } from '@/types';
import { Card } from '@/components/ui/Card';
import { ChainBadge } from './ChainBadge';

export function PortfolioOverview({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs text-zinc-500 mb-1.5">Total Value</p>
          <p className="text-2xl font-bold text-white">{portfolio.totalValue}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-zinc-500 mb-1.5">Available</p>
          <p className="text-2xl font-bold text-white">{portfolio.availableBalance}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-zinc-500 mb-1.5">Total P&L</p>
          <p className="text-2xl font-bold text-emerald-400">{portfolio.totalPnl}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-zinc-500 mb-1.5">Return</p>
          <p className="text-2xl font-bold text-emerald-400">{portfolio.totalPnlPct}</p>
        </Card>
      </div>

      {/* Positions */}
      {portfolio.positions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Active Positions
          </h2>
          <div className="space-y-3">
            {portfolio.positions.map((pos) => (
              <Card key={pos.strategyId} className="p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{pos.strategyName}</p>
                      <ChainBadge chain={pos.chain} />
                    </div>
                    <p className="text-sm text-zinc-500">Deployed: {pos.deployed}</p>
                  </div>

                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5">Current Value</p>
                      <p className="font-semibold text-white">{pos.currentValue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5">P&L</p>
                      <p className="font-semibold text-emerald-400">
                        {pos.pnl} <span className="text-xs">({pos.pnlPct})</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5">Rewards</p>
                      <p className="font-semibold text-[#00ffb3]">{pos.rewards}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
