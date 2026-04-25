import type { Portfolio } from '@/types';

// Mock portfolio data — replace with live on-chain reads once wallet is integrated
export const mockPortfolio: Portfolio = {
  totalValue: '$4,821.30',
  availableBalance: '$1,200.00',
  totalPnl: '+$321.30',
  totalPnlPct: '+7.1%',
  positions: [
    {
      strategyId: 'monad-defi-portfolio',
      strategyName: 'Monad DeFi Portfolio',
      chain: 'monad',
      deployed: '$2,000.00',
      currentValue: '$2,214.50',
      pnl: '+$214.50',
      pnlPct: '+10.7%',
      rewards: '$42.80',
    },
    {
      strategyId: 'eth-stable-yield',
      strategyName: 'ETH Stable Yield',
      chain: 'ethereum',
      deployed: '$1,500.00',
      currentValue: '$1,606.80',
      pnl: '+$106.80',
      pnlPct: '+7.1%',
      rewards: '$18.20',
    },
  ],
};
