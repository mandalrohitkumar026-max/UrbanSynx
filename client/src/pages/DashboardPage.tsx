import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { MetricGauge } from '../components/common/MetricGauge';
import { LivePulse } from '../components/common/LivePulse';
import { AIPredictionCard } from '../components/ai/AIPredictionCard';
import {
  Car,
  Droplet,
  Zap,
  Wind,
  Users,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Compass,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { NavLink } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { city, liveTelemetry, predictions, gisLayers } = useCity();

  const healthScore = liveTelemetry.healthScore;
  const subsystems = liveTelemetry.subsystems;

  // Real-time telemetry curve
  const performanceTrend = [
    { time: '14:00', traffic: 68, water: 94, power: 88, aqi: 72 },
    { time: '15:00', traffic: 72, water: 93, power: 89, aqi: 70 },
    { time: '16:00', traffic: 78, water: 92, power: 91, aqi: 67 },
    { time: '17:00', traffic: 84, water: 91, power: 93, aqi: 64 },
    { time: '18:00', traffic: 89, water: 90, power: 95, aqi: 60 },
    { time: '19:00', traffic: 72, water: 94, power: 91, aqi: 68 },
    { time: '20:00 (Pred)', traffic: 65, water: 95, power: 89, aqi: 72 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              MUNICIPAL COMMAND OVERVIEW
            </h1>
            <LivePulse color="emerald" label="AUTONOMOUS TWIN ACTIVE" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time multi-utility state estimation • {city.name} • High-Fidelity GIS Layering
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/digital-twin"
            className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-2 transition shadow-glow-cyan"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>LAUNCH 3D DIGITAL TWIN</span>
          </NavLink>
          <NavLink
            to="/simulation"
            className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-2 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>WHAT-IF SCENARIOS</span>
          </NavLink>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall City Health"
          value={healthScore}
          unit="/ 100"
          trend="+2.4% vs 24h baseline"
          trendDirection="up"
          sentiment="positive"
          accentColor="emerald"
          icon={<Activity className="w-4 h-4" />}
          subtext="Composite Resilience Index"
        />
        <StatCard
          title="Traffic Network Congestion"
          value={subsystems.traffic}
          unit="%"
          trend="+12% congestion surge"
          trendDirection="up"
          sentiment="negative"
          accentColor="amber"
          icon={<Car className="w-4 h-4" />}
          subtext="CBD Corridor Strained"
        />
        <StatCard
          title="Electrical Grid Demand"
          value={liveTelemetry.powerDemandGw}
          unit="GW"
          trend="+14% peak surge projected"
          trendDirection="up"
          sentiment="negative"
          accentColor="purple"
          icon={<Zap className="w-4 h-4" />}
          subtext="4.8 GW Peak at 19:30"
        />
        <StatCard
          title="Air Quality (PM2.5)"
          value={subsystems.pollution}
          unit="AQI"
          trend="-8% particulate decline"
          trendDirection="down"
          sentiment="positive"
          accentColor="cyan"
          icon={<Wind className="w-4 h-4" />}
          subtext="Dispersion Nominal"
        />
      </div>

      {/* Cross-Utility Telemetry Area Chart & System Gauge Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Multi-Utility Telemetry Trend (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-mono font-bold text-white uppercase">
                Cross-Domain Telemetry Dynamics (24h Stream)
              </h2>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Traffic
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span> Power
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Water
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontStyle="mono" fontSize={11} />
                <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Area type="monotone" dataKey="traffic" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTraffic)" strokeWidth={2} />
                <Area type="monotone" dataKey="power" stroke="#a855f7" fillOpacity={1} fill="url(#colorPower)" strokeWidth={2} />
                <Area type="monotone" dataKey="water" stroke="#06b6d4" fillOpacity={1} fill="url(#colorWater)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subsystem Health Radial Matrix */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Subsystem Integrity
              </span>
              <span className="text-[10px] font-mono text-slate-400">LOD 3 High-Fidelity</span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2">
              <MetricGauge value={subsystems.water} label="Water Supply" sublabel="HYDRAULIC" size={95} color="cyan" />
              <MetricGauge value={subsystems.infrastructure} label="Infrastructure" sublabel="STRUCTURAL" size={95} color="emerald" />
              <MetricGauge value={subsystems.population} label="Mobility Flow" sublabel="TELECOM" size={95} color="rose" />
              <MetricGauge value={subsystems.energy} label="Power Grid" sublabel="ELECTRICAL" size={95} color="purple" />
            </div>
          </div>

          <NavLink
            to="/digital-twin"
            className="w-full mt-3 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition"
          >
            <span>Explore 3D Digital Twin Map</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </NavLink>
        </div>
      </div>

      {/* AI Predictions & Active Incidents Stream Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold text-white tracking-wide uppercase">
              Priority AI Urban Forecasts & Autonomous Actions
            </h2>
            <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800 text-purple-300 text-[10px] font-mono">
              NEXT 60 MIN FORECAST
            </span>
          </div>
          <NavLink to="/predictions" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
            <span>View All AI Predictions</span>
            <ChevronRight className="w-3 h-3" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.slice(0, 2).map((pred) => (
            <AIPredictionCard key={pred.id} prediction={pred} />
          ))}
        </div>
      </div>
    </div>
  );
};
