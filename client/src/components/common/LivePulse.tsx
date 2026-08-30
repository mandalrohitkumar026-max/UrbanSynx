import React from 'react';

interface LivePulseProps {
  color?: 'cyan' | 'emerald' | 'amber' | 'red' | 'purple';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LivePulse: React.FC<LivePulseProps> = ({
  color = 'cyan',
  label = 'LIVE',
  size = 'md'
}) => {
  const colorMap = {
    cyan: { bg: 'bg-cyan-500', glow: 'shadow-glow-cyan', text: 'text-cyan-400', ring: 'bg-cyan-400' },
    emerald: { bg: 'bg-emerald-500', glow: 'shadow-glow-emerald', text: 'text-emerald-400', ring: 'bg-emerald-400' },
    amber: { bg: 'bg-amber-500', glow: 'shadow-glow-amber', text: 'text-amber-400', ring: 'bg-amber-400' },
    red: { bg: 'bg-red-500', glow: 'shadow-glow-red', text: 'text-red-400', ring: 'bg-red-400' },
    purple: { bg: 'bg-purple-500', glow: 'shadow-glow-purple', text: 'text-purple-400', ring: 'bg-purple-400' },
  };

  const current = colorMap[color];
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  return (
    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-mono">
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.ring} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full ${dotSize} ${current.bg} ${current.glow}`}></span>
      </span>
      {label && <span className={`font-semibold tracking-wider ${current.text}`}>{label}</span>}
    </div>
  );
};
