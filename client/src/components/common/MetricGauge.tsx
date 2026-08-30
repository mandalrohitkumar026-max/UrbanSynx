import React from 'react';

interface MetricGaugeProps {
  value: number; // 0 to 100
  label: string;
  sublabel?: string;
  size?: number;
  color?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple';
  showPercentage?: boolean;
}

export const MetricGauge: React.FC<MetricGaugeProps> = ({
  value,
  label,
  sublabel,
  size = 110,
  color = 'cyan',
  showPercentage = true,
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorStyles = {
    cyan: { stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)', text: 'text-cyan-400' },
    emerald: { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', text: 'text-emerald-400' },
    amber: { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', text: 'text-amber-400' },
    rose: { stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)', text: 'text-rose-400' },
    purple: { stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', text: 'text-purple-400' },
  };

  const current = colorStyles[color];

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle with glow filter */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={current.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 6px ${current.glow})`,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold font-mono text-white tracking-tight">
            {value}{showPercentage && <span className="text-xs text-slate-400 font-normal ml-0.5">%</span>}
          </span>
          {sublabel && (
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      <span className="text-xs font-medium text-slate-300 tracking-wide mt-2 text-center">
        {label}
      </span>
    </div>
  );
};
