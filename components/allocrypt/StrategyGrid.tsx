'use client';

import { useState } from 'react';
import type { Strategy } from '@/types';
import { StrategyCard } from './StrategyCard';
import { StrategyDetailModal } from './StrategyDetailModal';
import { AllocationFlow } from './AllocationFlow';

export function StrategyGrid({ strategies }: { strategies: Strategy[] }) {
  const [detailStrategy, setDetailStrategy] = useState<Strategy | null>(null);
  const [deployStrategy, setDeployStrategy] = useState<Strategy | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {strategies.map((s) => (
          <StrategyCard
            key={s.id}
            strategy={s}
            onViewDetail={setDetailStrategy}
            onDeploy={setDeployStrategy}
          />
        ))}
      </div>

      {detailStrategy && (
        <StrategyDetailModal
          strategy={detailStrategy}
          onClose={() => setDetailStrategy(null)}
          onDeploy={(s) => {
            setDetailStrategy(null);
            setDeployStrategy(s);
          }}
        />
      )}

      {deployStrategy && (
        <AllocationFlow strategy={deployStrategy} onClose={() => setDeployStrategy(null)} />
      )}
    </>
  );
}
