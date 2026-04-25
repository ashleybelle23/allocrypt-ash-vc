import { Navbar } from '@/components/allocrypt/Navbar';
import { PortfolioOverview } from '@/components/allocrypt/PortfolioOverview';
import { StrategyGrid } from '@/components/allocrypt/StrategyGrid';
import { Disclaimer } from '@/components/allocrypt/Disclaimer';
import { strategies } from '@/data/strategies';
import { mockPortfolio } from '@/data/portfolio';

export const metadata = {
  title: 'Dashboard — Allocrypt',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-grid">
      <Navbar showWallet />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-12">
        {/* Portfolio overview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Portfolio</h1>
              <p className="text-sm text-zinc-500 mt-0.5">
                {/* TODO: show real connected address */}
                Mock data — connect wallet to view live positions
              </p>
            </div>
          </div>
          <PortfolioOverview portfolio={mockPortfolio} />
        </section>

        {/* Strategies */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-white">Available Strategies</h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              Choose where Allocrypt deploys your capital.
            </p>
          </div>

          {/* Chain filter hint */}
          <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
            <span>Filter by chain:</span>
            {['All', 'Monad', 'Ethereum', 'Cross-Chain'].map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-full border border-white/[0.08] hover:border-white/20 hover:text-zinc-300 cursor-pointer transition-colors"
              >
                {/* TODO: wire up chain filter state */}
                {c}
              </span>
            ))}
          </div>

          <StrategyGrid strategies={strategies} />
        </section>

        {/* Disclaimer */}
        <section>
          <Disclaimer />
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-6 py-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <Disclaimer compact className="max-w-2xl" />
        </div>
      </footer>
    </div>
  );
}
