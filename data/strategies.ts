import type { Strategy } from '@/types';

export const strategies: Strategy[] = [
  {
    id: 'monad-defi-portfolio',
    name: 'Monad DeFi Portfolio',
    description:
      'Deploy into a curated basket of Monad-native yield protocols. Optimized for high-frequency, low-cost execution across lending, liquidity, and staking.',
    chain: 'monad',
    risk: 'medium',
    apyLabel: '12–18%',
    assets: ['MON', 'USDC', 'WETH'],
    protocols: ['Ambient', 'Kuru', 'Apriori'],
    minDeposit: '$50',
    featured: true,
  },
  {
    id: 'eth-stable-yield',
    name: 'ETH Stable Yield',
    description:
      'Capital-preserving stablecoin yield on Ethereum. Focused on blue-chip lending protocols with deep liquidity and long track records.',
    chain: 'ethereum',
    risk: 'low',
    apyLabel: '4–7%',
    assets: ['USDC', 'DAI', 'USDT'],
    protocols: ['Aave', 'Compound', 'Curve'],
    minDeposit: '$100',
    featured: true,
  },
  {
    id: 'eth-bluechip-defi',
    name: 'ETH Blue-Chip DeFi',
    description:
      'Broad exposure to established Ethereum DeFi protocols. Higher yield potential through liquidity provision and yield farming in battle-tested ecosystems.',
    chain: 'ethereum',
    risk: 'medium',
    apyLabel: '8–14%',
    assets: ['ETH', 'WBTC', 'USDC'],
    protocols: ['Uniswap', 'Aave', 'Lido', 'Convex'],
    minDeposit: '$200',
  },
  {
    id: 'cross-chain-yield',
    name: 'Cross-Chain Yield',
    description:
      'Capture yield opportunities across both Monad and Ethereum. Automatically routes capital to the highest-performing chains and protocols.',
    chain: 'cross-chain',
    risk: 'high',
    apyLabel: '15–25%',
    assets: ['ETH', 'MON', 'USDC'],
    protocols: ['Stargate', 'LayerZero', 'Ambient'],
    minDeposit: '$500',
    comingSoon: true,
  },
  {
    id: 'monad-experimental',
    name: 'Experimental Monad',
    description:
      'Early-stage Monad ecosystem opportunities. Higher risk, higher potential return. Suitable only for users comfortable with experimental protocols.',
    chain: 'monad',
    risk: 'experimental',
    apyLabel: '25–60%',
    assets: ['MON', 'Various'],
    protocols: ['Early-stage Monad protocols'],
    minDeposit: '$25',
    comingSoon: true,
  },
];
