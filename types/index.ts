export type Chain = 'monad' | 'ethereum' | 'cross-chain';

export type RiskLevel = 'low' | 'medium' | 'high' | 'experimental';

export type TxState = 'idle' | 'confirming' | 'pending' | 'success' | 'failed';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  chain: Chain;
  risk: RiskLevel;
  apyLabel: string;
  assets: string[];
  protocols: string[];
  minDeposit?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export interface Position {
  strategyId: string;
  strategyName: string;
  chain: Chain;
  deployed: string;
  currentValue: string;
  pnl: string;
  pnlPct: string;
  rewards: string;
}

export interface Portfolio {
  totalValue: string;
  availableBalance: string;
  totalPnl: string;
  totalPnlPct: string;
  positions: Position[];
}
