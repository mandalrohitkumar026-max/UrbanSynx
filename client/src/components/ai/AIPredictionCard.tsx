import React, { useState } from 'react';
import { AIPrediction } from '../../types/city';
import { Brain, Zap, Clock, AlertTriangle, ShieldCheck, ChevronRight, CheckCircle2, Cpu } from 'lucide-react';
import { useCity } from '../../context/CityContext';

interface AIPredictionCardProps {
  prediction: AIPrediction;
}

export const AIPredictionCard: React.FC<AIPredictionCardProps> = ({ prediction }) => {
  const { executePredictionAction } = useCity();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    const success = await executePredictionAction(prediction.id);
    setIsExecuting(false);
    if (success) {
      setIsExecuted(true);
    }
  };

  const domainColors = {
    traffic: { border: 'border-amber-500/30', badge: 'text-amber-400 bg-amber-950/40 border-amber-800/40', accent: 'text-amber-400', glow: 'shadow-glow-amber' },
    water: { border: 'border-cyan-500/30', badge: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40', accent: 'text-cyan-400', glow: 'shadow-glow-cyan' },
    energy: { border: 'border-purple-500/30', badge: 'text-purple-400 bg-purple-950/40 border-purple-800/40', accent: 'text-purple-400', glow: 'shadow-glow-purple' },
    pollution: { border: 'border-rose-500/30', badge: 'text-rose-400 bg-rose-950/40 border-rose-800/40', accent: 'text-rose-400', glow: 'shadow-glow-red' },
    infrastructure: { border: 'border-emerald-500/30', badge: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40', accent: 'text-emerald-400', glow: 'shadow-glow-emerald' }
  };

  const color = domainColors[prediction.domain] || domainColors.traffic;

  return (
    <div className={`glass-panel p-5 rounded-lg border ${color.border} relative overflow-hidden transition-all duration-200 hover:border-slate-600`}>
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-purple-950/50 border border-purple-800/50 text-purple-400">
            <Brain className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
            CITYPULSE AI • {prediction.domain.toUpperCase()} FORECAST
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${color.badge}`}>
            {prediction.probabilityPercent}% PROBABILITY
          </span>
        </div>
      </div>

      {/* Title & Location */}
      <h3 className="text-base font-bold text-white tracking-tight mb-1">
        {prediction.title}
      </h3>
      <p className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
        <span className="text-slate-500">Location:</span>
        <span className="text-slate-200 font-medium">{prediction.location}</span>
      </p>

      {/* Timing & Projected Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded bg-slate-900/60 border border-slate-800/80 text-xs">
        <div className="space-y-1">
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-cyan-400" /> Expected Window:
          </span>
          <span className="font-semibold text-slate-200 font-mono">
            {prediction.expectedTimeWindow}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <Cpu className="w-3 h-3 text-purple-400" /> Model Confidence:
          </span>
          <span className="font-semibold text-purple-300 font-mono">
            {Math.round(prediction.confidenceScore * 100)}% (Ensemble-9)
          </span>
        </div>
      </div>

      {/* Contributing Factors Breakdown */}
      <div className="mb-4 space-y-2">
        <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block">
          Contributing Factors
        </span>
        <div className="space-y-1.5">
          {prediction.factors.map((factor, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 text-[11px]">{factor.name}</span>
                <span className="text-slate-400 text-[11px]">{factor.impact}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                  style={{ width: `${factor.impact}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Action Playbook */}
      <div className="p-3 rounded bg-slate-950/80 border border-purple-900/40 mb-4">
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 mb-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Autonomous Action:</span>
        </div>
        <p className="text-xs text-slate-200 font-sans leading-relaxed">
          {prediction.recommendedAction}
        </p>
        {prediction.estimatedImpact && (
          <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 flex-shrink-0" />
            <span>Impact: {prediction.estimatedImpact}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        disabled={isExecuting || isExecuted}
        onClick={handleExecute}
        className={`w-full py-2.5 px-4 rounded text-xs font-mono font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
          isExecuted
            ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-300 cursor-default'
            : isExecuting
            ? 'bg-purple-900/50 border border-purple-700 text-purple-300 cursor-wait'
            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple border border-purple-400'
        }`}
      >
        {isExecuted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ACTION PLAYBOOK EXECUTED
          </>
        ) : isExecuting ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
            EXECUTING MITIGATION PLAYBOOK...
          </>
        ) : (
          <>
            <span>EXECUTE RECOMMENDED ACTION</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
};
