import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface TrendBadgeProps {
  trend: string;
  direction?: 'up' | 'down' | 'stable';
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export const TrendBadge: React.FC<TrendBadgeProps> = ({
  trend,
  direction = 'stable',
  sentiment
}) => {
  let colorClasses = 'text-slate-400 bg-slate-800/60 border-slate-700/50';
  
  if (sentiment === 'positive') {
    colorClasses = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
  } else if (sentiment === 'negative') {
    colorClasses = 'text-rose-400 bg-rose-950/40 border-rose-800/40';
  } else if (direction === 'up') {
    colorClasses = 'text-amber-400 bg-amber-950/40 border-amber-800/40';
  } else if (direction === 'down') {
    colorClasses = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono border ${colorClasses}`}>
      {direction === 'up' && <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />}
      {direction === 'down' && <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />}
      {direction === 'stable' && <Minus className="w-3 h-3 stroke-[2]" />}
      <span>{trend}</span>
    </span>
  );
};
