'use client';

// TODO: Replace with real wallet connection (e.g. wagmi + ConnectKit or RainbowKit)
// This is a UI placeholder only — no blockchain interaction occurs

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function WalletButton() {
  // TODO: Replace this local state with wallet connection state from wagmi/viem
  const [connected, setConnected] = useState(false);
  const [address] = useState('0x71C7...3Fa8');

  if (connected) {
    return (
      <button
        onClick={() => setConnected(false)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-zinc-300 font-mono">{address}</span>
      </button>
    );
  }

  return (
    <Button variant="primary" size="sm" onClick={() => setConnected(true)}>
      Connect Wallet
    </Button>
  );
}
