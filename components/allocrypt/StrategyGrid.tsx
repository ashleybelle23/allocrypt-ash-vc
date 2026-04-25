'use client';

import { useState } from 'react';
import type { Strategy } from '@/types';
import { StrategyCard } from './StrategyCard';
import { AllocationFlow } from './AllocationFlow';

export function StrategyGrid({ strategies }: { strategies: Strategy[] }) {
  const [selected, setSelected] = useState<Strategy | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {strategies.map((s) => (
          <StrategyCard key={s.id} strategy={s} onDeploy={setSelected} />
        ))}
      </div>

      {selected && (
        <AllocationFlow strategy={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
