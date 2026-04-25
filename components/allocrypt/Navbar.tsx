import Link from 'next/link';
import { WalletButton } from './WalletButton';

export function Navbar({ showWallet = false }: { showWallet?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080b14]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold bg-gradient-to-r from-[#00c8ff] to-[#00ffb3] bg-clip-text text-transparent">
            Allocrypt
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="/#strategies" className="hover:text-white transition-colors">
            Strategies
          </Link>
          <Link href="/#disclaimer" className="hover:text-white transition-colors">
            Risks
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {showWallet ? (
            <WalletButton />
          ) : (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#00c8ff] to-[#00ffb3] text-[#080b14] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,200,255,0.3)]"
            >
              Launch App
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
