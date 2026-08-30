import React, { ReactNode } from 'react';
import { TrendBadge } from './TrendBadge';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'stable';
  sentiment?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  subtext?: string;
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'blue';
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendDirection = 'stable',
  sentiment,
  icon,
  subtext,
  accentColor = 'cyan',
  className = '',
  onClick
}) => {
  const accentBorders = {
    cyan: 'hover:border-cyan-500/50 group-hover:text-cyan-400',
    emerald: 'hover:border-emerald-500/50 group-hover:text-emerald-400',
    amber: 'hover:border-amber-500/50 group-hover:text-amber-400',
    rose: 'hover:border-rose-500/50 group-hover:text-rose-400',
    purple: 'hover:border-purple-500/50 group-hover:text-purple-400',
    blue: 'hover:border-blue-500/50 group-hover:text-blue-400',
  };

  const accentIcons = {
    cyan: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40',
    emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
    amber: 'text-amber-400 bg-amber-950/40 border-amber-800/40',
    rose: 'text-rose-400 bg-rose-950/40 border-rose-800/40',
    purple: 'text-purple-400 bg-purple-950/40 border-purple-800/40',
    blue: 'text-blue-400 bg-blue-950/40 border-blue-800/40',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-4 rounded-lg relative overflow-hidden transition-all duration-200 group ${accentBorders[accentColor]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-2xl font-bold font-mono text-white tracking-tight">
              {value}
            </span>
            {unit && <span className="text-xs font-mono text-slate-400">{unit}</span>}
          </div>
        </div>

        {icon && (
          <div className={`p-2 rounded-md border ${accentIcons[accentColor]}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
        {trend ? (
          <TrendBadge trend={trend} direction={trendDirection} sentiment={sentiment} />
        ) : (
          <span className="text-[11px] font-mono text-slate-500">Live Telemetry</span>
        )}

        {subtext && (
          <span className="text-[11px] text-slate-400 truncate max-w-[55%] text-right font-sans">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
