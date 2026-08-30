import React from 'react';
import { useCity } from '../../context/CityContext';
import { MetricGauge } from '../common/MetricGauge';
import { TrendBadge } from '../common/TrendBadge';
import {
  Activity,
  Car,
  Droplet,
  Zap,
  Wind,
  Building2,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const RightStatusPanel: React.FC = () => {
  const { city, liveTelemetry, isSimulationMode } = useCity();

  // Pick dynamic values from live telemetry stream
  const healthScore = liveTelemetry.healthScore;
  const trafficVal = liveTelemetry.subsystems.traffic;
  const waterVal = liveTelemetry.subsystems.water;
  const energyVal = liveTelemetry.subsystems.energy;
  const aqiVal = liveTelemetry.subsystems.pollution;
  const infraVal = liveTelemetry.subsystems.infrastructure;
  const popVal = liveTelemetry.subsystems.population;

  return (
    <aside className="w-80 bg-[#070a0f] border-l border-slate-800 flex flex-col justify-between select-none z-20 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <div className="p-4 space-y-5">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              DIGITAL TWIN STATUS
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            {isSimulationMode ? 'SIMULATOR' : 'LIVE TELEMETRY'}
          </span>
        </div>

        {/* Master City Health Score Gauge */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 relative overflow-hidden bg-radial-glow flex flex-col items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
            OVERALL CITY HEALTH INDEX
          </span>

          <MetricGauge
            value={healthScore}
            label=""
            sublabel="INDEX"
            size={125}
            color={healthScore > 85 ? 'emerald' : healthScore > 70 ? 'cyan' : 'amber'}
            showPercentage={false}
          />

          <div className="mt-2 text-center">
            <span className="text-xs font-mono font-bold text-slate-200">
              {healthScore} <span className="text-slate-500 font-normal">/ 100</span>
            </span>
            <div className="text-[11px] font-sans text-slate-400 mt-0.5">
              {healthScore >= 85
                ? 'Optimal Operating Envelope'
                : healthScore >= 70
                ? 'Elevated Load (AI Mitigations Active)'
                : 'System Strain Warning'}
            </div>
          </div>
        </div>

        {/* Subsystems Breakdown List */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block px-1">
            CRITICAL URBAN SUBSYSTEMS
          </span>

          {/* 1. Traffic */}
          <div className="glass-panel p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">Traffic</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{trafficVal}%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-amber-400 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3 h-3 text-amber-400 stroke-[2.5]" />
                +12% congestion
              </span>
              <span className="text-slate-400 text-[10px]">↑ vs prev hour</span>
            </div>
          </div>

          {/* 2. Water Network */}
          <div className="glass-panel p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">Water Network</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{waterVal}%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                Nominal 4.2 bar
              </span>
              <span className="text-slate-400 text-[10px]">Optimal pressure</span>
            </div>
          </div>

          {/* 3. Power Grid */}
          <div className="glass-panel p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">Power Grid</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{energyVal}%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-purple-400 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3 h-3 text-purple-400 stroke-[2.5]" />
                +14% peak surge
              </span>
              <span className="text-slate-400 text-[10px]">Peak 19:30 UTC</span>
            </div>
          </div>

          {/* 4. Air Quality */}
          <div className="glass-panel p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">Air Quality</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{aqiVal}%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <ArrowDownRight className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
                -8% PM2.5
              </span>
              <span className="text-emerald-400/80 text-[10px]">↓ improving</span>
            </div>
          </div>

          {/* 5. Infrastructure */}
          <div className="glass-panel p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">Infrastructure</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{infraVal}%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-300 flex items-center gap-1 font-medium">
                2 vibration alerts
              </span>
              <span className="text-slate-400 text-[10px]">Bridges nominal</span>
            </div>
          </div>

          {/* 6. Population Mobility */}
          <div className="glass-panel p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">Population Mobility</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{popVal}%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-rose-400 flex items-center gap-1 font-medium">
                High transit density
              </span>
              <span className="text-slate-400 text-[10px]">CBD egress</span>
            </div>
          </div>
        </div>

        {/* Quick Scenario Sandbox Shortcut */}
        <div className="p-3.5 rounded-lg bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-800/40">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Predictive Simulation</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans leading-snug mb-3">
            Simulate flash flood, power blackout, or bridge closure with real-time recalculation.
          </p>
          <NavLink
            to="/simulation"
            className="w-full py-2 px-3 rounded bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700 text-purple-200 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition shadow-glow-purple"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>LAUNCH WHAT-IF SANDBOX</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
