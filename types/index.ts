export type Chain = 'monad' | 'ethereum' | 'cross-chain';

export type RiskLevel = 'low' | 'medium' | 'high' | 'experimental';

export type TxState = 'idle' | 'confirming' | 'pending' | 'success' | 'failed';

export interface StrategyAsset {
  symbol: string;
  name: string;
  allocationPct: number;    // target % of capital allocated to this asset
  apyContribution: string;  // this asset's contribution to overall strategy APY
  protocol: string;
  role: string;             // e.g. "Staking", "Liquidity provision", "Lending"
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  chain: Chain;
  risk: RiskLevel;
  apyLabel: string;
  assets: string[];
  protocols: string[];
  assetBreakdown: StrategyAsset[];
  featured?: boolean;
  comingSoon?: boolean;
}

export interface PositionAsset {
  symbol: string;
  name: string;
  value: string;
  positionPct: number;  // % of this position's total value
  portfolioPct: number; // % of total portfolio value
  apyContribution: string;
  protocol: string;
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
  assets: PositionAsset[];
}

export interface Portfolio {
  totalValue: string;
  availableBalance: string;
  totalPnl: string;
  totalPnlPct: string;
  positions: Position[];
}
