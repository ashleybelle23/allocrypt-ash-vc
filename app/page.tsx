import Link from 'next/link';
import { Navbar } from '@/components/allocrypt/Navbar';
import { StrategyCard } from '@/components/allocrypt/StrategyCard';
import { Disclaimer } from '@/components/allocrypt/Disclaimer';
import { strategies } from '@/data/strategies';

const featuredStrategies = strategies.filter((s) => s.featured);

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Deposit',
    desc: 'Connect your wallet and fund your account. Allocrypt is fully non-custodial — your keys, your assets.',
  },
  {
    step: '02',
    title: 'Allocate',
    desc: 'Choose from curated yield strategies across Monad and Ethereum. View risk, APY, and protocol details before committing.',
  },
  {
    step: '03',
    title: 'Evolve',
    desc: 'Track performance, compound rewards, and rebalance positions. Smarter allocation tools are on the roadmap.',
  },
];

const ROADMAP = [
  { label: 'Live now', items: ['Strategy selection', 'One-click deployment', 'Portfolio overview'] },
  {
    label: 'Coming soon',
    items: ['Automatic compounding', 'Cross-chain rebalancing', 'Mobile app', 'Strategy analytics'],
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-grid">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-44 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-[#00c8ff]/8 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00c8ff]/25 bg-[#00c8ff]/8 text-[#00c8ff] text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
            Built on Monad &amp; Ethereum
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Deploy capital{' '}
            <span className="bg-gradient-to-r from-[#00c8ff] to-[#00ffb3] bg-clip-text text-transparent">
              in one click.
            </span>
            <br />
            Fully non-custodial.
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Allocrypt makes DeFi easy for everyone. Deploy into curated yield opportunities
            without managing every protocol yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-[#00c8ff] to-[#00ffb3] text-[#080b14] hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,200,255,0.35)]"
            >
              Launch App
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl border border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              How it works
            </Link>
          </div>

          <p className="text-xs text-zinc-600 pt-2">
            Experimental software. Not financial advice. Deploy only what you can afford to lose.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-14 space-y-2">
          <p className="text-xs font-medium text-[#00c8ff] uppercase tracking-widest">Process</p>
          <h2 className="text-3xl font-bold text-white">How Allocrypt works</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Three steps from zero to yield exposure across the best DeFi protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div
              key={step}
              className="relative rounded-xl border border-white/[0.08] bg-[#0d1120]/80 p-6 space-y-4 group hover:border-[#00c8ff]/20 transition-all duration-300"
            >
              <div className="text-4xl font-bold bg-gradient-to-b from-[#00c8ff]/30 to-transparent bg-clip-text text-transparent">
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00c8ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* Chain info */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-[#00c8ff]/15 bg-[#00c8ff]/5 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00c8ff]" />
              <span className="font-semibold text-[#00c8ff]">Monad</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Fast, low-cost execution. Designed for active, high-frequency DeFi allocation.
              Our primary growth chain with native Monad yield portfolios.
            </p>
            <p className="text-xs text-zinc-500">Lower fees · Faster finality · Growing ecosystem</p>
          </div>
          <div className="rounded-xl border border-violet-500/15 bg-violet-500/5 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span className="font-semibold text-violet-400">Ethereum</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The established DeFi ecosystem. Blue-chip strategies and stablecoin yield with
              higher perceived trust and protocol maturity.
            </p>
            <p className="text-xs text-zinc-500">Deep liquidity · Battle-tested protocols · Higher trust</p>
          </div>
        </div>
      </section>

      {/* Featured strategies */}
      <section id="strategies" className="px-6 py-16 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10 space-y-2">
          <p className="text-xs font-medium text-[#00c8ff] uppercase tracking-widest">Strategies</p>
          <h2 className="text-3xl font-bold text-white">Curated yield opportunities</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Each strategy is carefully selected. Understand the chain, risk, and protocols before deploying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {featuredStrategies.map((s) => (
            <StrategyCard key={s.id} strategy={s} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#00c8ff] hover:text-white transition-colors"
          >
            View all strategies in the app →
          </Link>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-white/[0.08] bg-[#0d1120]/80 p-8">
          <div className="mb-8 space-y-1">
            <p className="text-xs font-medium text-[#00c8ff] uppercase tracking-widest">Roadmap</p>
            <h2 className="text-2xl font-bold text-white">Today: simple deployment.</h2>
            <p className="text-zinc-400">Next: smarter allocation, compounding, and rebalancing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROADMAP.map(({ label, items }) => (
              <div key={label} className="space-y-3">
                <p className="text-sm font-medium text-zinc-300">{label}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          label === 'Live now' ? 'bg-emerald-400' : 'bg-zinc-600'
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section id="disclaimer" className="px-6 pb-16 max-w-5xl mx-auto w-full">
        <Disclaimer />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-8 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <span className="font-semibold bg-gradient-to-r from-[#00c8ff] to-[#00ffb3] bg-clip-text text-transparent">
            Allocrypt
          </span>
          <p>Experimental software. Not financial advice. No guarantees of yield or principal.</p>
        </div>
      </footer>
    </div>
  );
}
