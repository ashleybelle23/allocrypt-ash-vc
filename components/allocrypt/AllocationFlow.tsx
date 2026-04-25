'use client';

// TODO: Replace mock tx states with real wagmi/viem transaction hooks
// This component is UI-only — no blockchain interaction occurs

import { useState } from 'react';
import type { Strategy, TxState } from '@/types';
import { Button } from '@/components/ui/Button';
import { ChainBadge } from './ChainBadge';
import { RISK_LABELS } from '@/lib/utils';

interface AllocationFlowProps {
  strategy: Strategy;
  onClose: () => void;
}

const TX_MESSAGES: Record<TxState, string> = {
  idle: '',
  confirming: 'Confirm the transaction in your wallet...',
  pending: 'Transaction submitted. Waiting for confirmation...',
  success: 'Capital deployed successfully.',
  failed: 'Transaction failed. Please try again.',
};

export function AllocationFlow({ strategy, onClose }: AllocationFlowProps) {
  const [amount, setAmount] = useState('');
  const [txState, setTxState] = useState<TxState>('idle');

  // TODO: Replace this simulation with real tx flow via wagmi writeContract
  function handleDeploy() {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    setTxState('confirming');
    setTimeout(() => setTxState('pending'), 1500);
    setTimeout(() => setTxState('success'), 4000);
  }

  function handleClose() {
    setTxState('idle');
    setAmount('');
    onClose();
  }

  const isProcessing = txState === 'confirming' || txState === 'pending';
  const isDone = txState === 'success' || txState === 'failed';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && !isProcessing && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0d1120] shadow-[0_0_60px_rgba(0,200,255,0.12)] overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00c8ff]/50 to-transparent" />

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <h2 className="text-lg font-semibold text-white">{strategy.name}</h2>
              <div className="flex gap-2">
                <ChainBadge chain={strategy.chain} />
                <span className="text-xs text-zinc-500 self-center">
                  {RISK_LABELS[strategy.risk]}
                </span>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={handleClose}
                className="text-zinc-500 hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Strategy info */}
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Estimated APY</span>
              <span className="text-[#00ffb3] font-semibold">{strategy.apyLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Assets</span>
              <span className="text-zinc-300">{strategy.assets.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Protocols</span>
              <span className="text-zinc-300 text-right max-w-[55%]">
                {strategy.protocols.join(', ')}
              </span>
            </div>
            {strategy.minDeposit && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Min. deposit</span>
                <span className="text-zinc-300">{strategy.minDeposit}</span>
              </div>
            )}
          </div>

          {/* Amount input */}
          {txState === 'idle' && (
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Amount to deploy (USD)</label>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 py-3 focus-within:border-[#00c8ff]/50 transition-colors">
                <span className="text-zinc-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  className="flex-1 bg-transparent text-white placeholder-zinc-600 outline-none text-sm"
                />
                <span className="text-xs text-zinc-500">USDC</span>
              </div>
              <p className="text-xs text-zinc-600">
                Available: $1,200.00 · {/* TODO: pull from wallet balance */}
                <span className="text-[#00c8ff] cursor-pointer hover:underline" onClick={() => setAmount('1200')}>
                  Max
                </span>
              </p>
            </div>
          )}

          {/* Transaction state */}
          {txState !== 'idle' && (
            <div
              className={`rounded-lg border p-4 text-sm text-center space-y-2 ${
                txState === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : txState === 'failed'
                  ? 'border-red-500/30 bg-red-500/10 text-red-400'
                  : 'border-[#00c8ff]/20 bg-[#00c8ff]/5 text-[#00c8ff]'
              }`}
            >
              {isProcessing && (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-[#00c8ff]/30 border-t-[#00c8ff] rounded-full animate-spin" />
                </div>
              )}
              <p>{TX_MESSAGES[txState]}</p>
              {txState === 'success' && (
                <p className="text-zinc-400 text-xs">
                  ${amount} deployed into {strategy.name}.{' '}
                  {/* TODO: link to tx hash on block explorer */}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!isDone && (
              <>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={handleClose}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleDeploy}
                  disabled={isProcessing || !amount || Number(amount) <= 0}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Deploy'}
                </Button>
              </>
            )}
            {isDone && (
              <Button variant="secondary" className="flex-1" onClick={handleClose}>
                Close
              </Button>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-zinc-600 text-center leading-relaxed">
            Smart contracts may be unaudited. Deploy only what you can afford to lose.
          </p>
        </div>
      </div>
    </div>
  );
}
