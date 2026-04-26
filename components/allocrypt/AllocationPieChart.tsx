'use client';

import { useState } from 'react';
import type { Portfolio } from '@/types';
import { Card } from '@/components/ui/Card';

const CHAIN_COLORS: Record<string, string> = {
  monad: '#00c8ff',
  ethereum: '#a78bfa',
  'cross-chain': '#00ffb3',
};
const AVAILABLE_COLOR = '#2d3348';

function parseDollar(s: string): number {
  return parseFloat(s.replace(/[$,+\s]/g, '')) || 0;
}

function formatDollar(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number,
): string {
  // Clamp to avoid degenerate full-circle arcs
  const end = Math.min(endAngle, startAngle + 359.999);
  const largeArc = end - startAngle > 180 ? 1 : 0;
  const o1 = polarToCartesian(cx, cy, outerR, startAngle);
  const o2 = polarToCartesian(cx, cy, outerR, end);
  const i1 = polarToCartesian(cx, cy, innerR, startAngle);
  const i2 = polarToCartesian(cx, cy, innerR, end);
  return [
    `M ${o1.x.toFixed(3)} ${o1.y.toFixed(3)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${o2.x.toFixed(3)} ${o2.y.toFixed(3)}`,
    `L ${i2.x.toFixed(3)} ${i2.y.toFixed(3)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${i1.x.toFixed(3)} ${i1.y.toFixed(3)}`,
    'Z',
  ].join(' ');
}

export function AllocationPieChart({ portfolio }: { portfolio: Portfolio }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const slices = [
    ...portfolio.positions.map((p) => ({
      label: p.strategyName,
      value: parseDollar(p.currentValue),
      color: CHAIN_COLORS[p.chain] ?? '#6b7280',
    })),
    {
      label: 'Available',
      value: parseDollar(portfolio.availableBalance),
      color: AVAILABLE_COLOR,
    },
  ];

  const total = slices.reduce((s, x) => s + x.value, 0);

  let cumAngle = 0;
  const segments = slices.map((s, i) => {
    const startAngle = cumAngle;
    const sweep = (s.value / total) * 360;
    cumAngle += sweep;
    return { ...s, startAngle, endAngle: cumAngle, sweep, pct: (s.value / total) * 100, index: i };
  });

  const cx = 110, cy = 110, outerR = 88, innerR = 60;
  const hoveredSeg = hovered !== null ? segments[hovered] : null;

  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-5">
        Allocation by Strategy
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* SVG donut */}
        <div className="relative shrink-0">
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="overflow-visible"
          >
            {/* Soft background ring */}
            <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="white" strokeOpacity="0.04" strokeWidth={outerR - innerR} />

            {segments.map((seg) => {
              if (seg.sweep < 0.5) return null;
              const isHovered = hovered === seg.index;
              const r = isHovered ? outerR + 5 : outerR;
              return (
                <path
                  key={seg.label}
                  d={donutPath(cx, cy, r, innerR, seg.startAngle, seg.endAngle)}
                  fill={seg.color}
                  opacity={hovered === null ? 0.9 : isHovered ? 1 : 0.35}
                  style={{ transition: 'opacity 0.15s, d 0.15s', cursor: 'pointer', filter: isHovered ? `drop-shadow(0 0 8px ${seg.color}88)` : 'none' }}
                  onMouseEnter={() => setHovered(seg.index)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

            {/* Center label */}
            {hoveredSeg ? (
              <>
                <text x={cx} y={cy - 10} textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="inherit">
                  {hoveredSeg.pct.toFixed(1)}%
                </text>
                <text x={cx} y={cy + 8} textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="inherit">
                  {formatDollar(hoveredSeg.value)}
                </text>
                <text x={cx} y={cy + 23} textAnchor="middle" fill="#71717a" fontSize="9" fontFamily="inherit">
                  {hoveredSeg.label.length > 18 ? hoveredSeg.label.slice(0, 16) + '…' : hoveredSeg.label}
                </text>
              </>
            ) : (
              <>
                <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="17" fontWeight="700" fontFamily="inherit">
                  {portfolio.totalValue}
                </text>
                <text x={cx} y={cy + 12} textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="inherit">
                  Total Value
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2.5">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className="flex items-center justify-between gap-3 cursor-default rounded-lg px-2 py-1.5 transition-colors duration-150"
              style={{ backgroundColor: hovered === seg.index ? `${seg.color}12` : 'transparent' }}
              onMouseEnter={() => setHovered(seg.index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span
                  className="text-sm truncate transition-colors duration-150"
                  style={{ color: hovered === seg.index ? 'white' : '#a1a1aa' }}
                >
                  {seg.label}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-right">
                <span className="text-sm font-medium text-white">{formatDollar(seg.value)}</span>
                <span className="text-xs text-zinc-500 w-10 text-right">
                  {seg.pct.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
