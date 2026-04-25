export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const CHAIN_LABELS: Record<string, string> = {
  monad: 'Monad',
  ethereum: 'Ethereum',
  'cross-chain': 'Cross-Chain',
};

export const RISK_LABELS: Record<string, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  experimental: 'Experimental',
};
