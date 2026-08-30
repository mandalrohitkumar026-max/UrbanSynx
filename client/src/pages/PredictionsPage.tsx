import React from 'react';
import { useCity } from '../context/CityContext';
import { AIPredictionCard } from '../components/ai/AIPredictionCard';
import { LivePulse } from '../components/common/LivePulse';
import { StatCard } from '../components/common/StatCard';
import { Brain, Cpu, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const PredictionsPage: React.FC = () => {
  const { city, predictions, setViewMode, setForecastMinutes } = useCity();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-purple-950 border border-purple-700 flex items-center justify-center text-purple-400">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-mono text-white tracking-wide">
                CITYPULSE AI — URBAN FORECAST ENGINE
              </h1>
              <div className="text-xs font-mono text-purple-300 font-semibold">
                Autonomous Deep Temporal Multi-Modal Forecasting
              </div>
            </div>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Predictive modeling across Traffic propagation, Water deficits, Power peak surges, and Industrial atmospheric inversions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/digital-twin"
            onClick={() => {
              setViewMode('forecast');
              setForecastMinutes(60);
            }}
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition shadow-glow-purple"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENABLE 60-MIN PREDICTIVE MAP LAYER</span>
          </NavLink>
        </div>
      </div>

      {/* Forecast Engine Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Forecast Models"
          value="4"
          unit="Domains"
          trend="Traffic, Water, Power, AQI"
          trendDirection="stable"
          sentiment="positive"
          accentColor="purple"
          icon={<Cpu className="w-4 h-4" />}
          subtext="Ensemble Neural Network"
        />
        <StatCard
          title="Mean Model Confidence"
          value="91.8"
          unit="%"
          trend="+1.2% accuracy gain"
          trendDirection="up"
          sentiment="positive"
          accentColor="cyan"
          icon={<Brain className="w-4 h-4" />}
          subtext="Calibrated via 2M IoT Data Points"
        />
        <StatCard
          title="Forecast Horizon"
          value="60"
          unit="Minutes"
          trend="Continuous Propagation"
          trendDirection="stable"
          sentiment="neutral"
          accentColor="emerald"
          icon={<Clock className="w-4 h-4" />}
          subtext="Macro Lookahead 48 Hours"
        />
        <StatCard
          title="Autonomous Playbooks"
          value="100"
          unit="% Ready"
          trend="Single-Click Execution"
          trendDirection="stable"
          sentiment="positive"
          accentColor="amber"
          icon={<Zap className="w-4 h-4" />}
          subtext="Pre-Validated Protocols"
        />
      </div>

      {/* Prediction Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Live Urban Forecast Intelligence Cards
          </span>
          <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
            Real-Time Probability Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {predictions.map((pred) => (
            <AIPredictionCard key={pred.id} prediction={pred} />
          ))}
        </div>
      </div>
    </div>
  );
};
