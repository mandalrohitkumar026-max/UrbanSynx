import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Zap, Sun, BatteryCharging, Cpu, ShieldAlert, ArrowUpRight, Gauge, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export const EnergyPage: React.FC = () => {
  const { liveTelemetry, gisLayers, setInspectedAsset } = useCity();

  const substations = gisLayers.powerSubstations || [];

  const loadCurveData = [
    { time: '12:00', actual: 3.65, forecast: 3.65, capacity: 5.4 },
    { time: '14:00', actual: 3.82, forecast: 3.80, capacity: 5.4 },
    { time: '16:00', actual: 4.02, forecast: 4.05, capacity: 5.4 },
    { time: '18:00', actual: 4.12, forecast: 4.25, capacity: 5.4 },
    { time: '19:30 (Peak)', actual: null, forecast: 4.80, capacity: 5.4 },
    { time: '21:00', actual: null, forecast: 4.40, capacity: 5.4 },
    { time: '23:00', actual: null, forecast: 3.70, capacity: 5.4 },
  ];

  const generationMix = [
    { name: 'Solar PV', value: 540, color: '#f59e0b' },
    { name: 'Combined Cycle Gas', value: 1950, color: '#3b82f6' },
    { name: 'Grid BESS Battery', value: 210, color: '#a855f7' },
    { name: 'Inter-Regional Clean Import', value: 1420, color: '#10b981' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              ELECTRICAL POWER GRID & DEMAND FORECAST
            </h1>
            <LivePulse color="purple" label="50.012 HZ STABILIZED" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            4.8 GW peak demand forecast, transmission corridor thermal monitoring, and renewable generation dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-purple-950/60 border border-purple-800/50 text-xs font-mono text-purple-300">
            Current Draw: <b className="text-purple-200">{liveTelemetry.powerDemandGw} GW</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Total Grid Headroom: <b className="text-emerald-400">1.28 GW</b>
          </span>
        </div>
      </div>

      {/* Grid KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Projected Peak Demand"
          value="4.80"
          unit="GW"
          trend="+14% surge at 19:30"
          trendDirection="up"
          sentiment="negative"
          accentColor="purple"
          icon={<Zap className="w-4 h-4" />}
          subtext="Medium Strain Risk"
        />
        <StatCard
          title="Renewable Generation Mix"
          value="38.5"
          unit="%"
          trend="Solar + Import Flow"
          trendDirection="up"
          sentiment="positive"
          accentColor="emerald"
          icon={<Sun className="w-4 h-4" />}
          subtext="Target: 40% Clean"
        />
        <StatCard
          title="District BESS Storage"
          value="360"
          unit="MWh"
          trend="90% State of Charge"
          trendDirection="stable"
          sentiment="positive"
          accentColor="cyan"
          icon={<BatteryCharging className="w-4 h-4" />}
          subtext="Ready for 19:30 Shaving"
        />
        <StatCard
          title="Substation Alpha Load"
          value="87.8"
          unit="%"
          trend="Thermal Alert (62.4°C)"
          trendDirection="up"
          sentiment="negative"
          accentColor="amber"
          icon={<ShieldAlert className="w-4 h-4" />}
          subtext="Cooling Engaged"
        />
      </div>

      {/* 4.8 GW Load Curve Chart & Generation Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Metropolitan Power Demand Curve: Actual vs. AI Forecast (GW)
            </h2>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2 h-2 rounded bg-purple-400"></span> Actual Load
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded bg-cyan-400"></span> AI Forecast (19:30 Peak)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loadCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontStyle="mono" fontSize={11} />
                <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} domain={[2.5, 5.5]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Area type="monotone" dataKey="forecast" stroke="#06b6d4" strokeDasharray="5 5" fill="rgba(6, 182, 212, 0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" stroke="#a855f7" fill="rgba(168, 85, 247, 0.25)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Generation Fuel Mix Pie Chart */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-mono font-bold text-white uppercase mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              Live Generation Portfolio
            </h2>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={generationMix} innerRadius={45} outerRadius={65} dataKey="value">
                    {generationMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            {generationMix.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-white">{item.value} MW</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Substations Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <h2 className="text-xs font-mono font-bold text-white uppercase mb-4">
          Key Substations & Energy Storage Assets
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
              <tr>
                <th className="p-3">Facility Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Voltage (kV)</th>
                <th className="p-3">Active Load (MW)</th>
                <th className="p-3">Temperature</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {substations.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-white">{sub.name}</td>
                  <td className="p-3 text-slate-400 uppercase text-[11px]">{sub.type.replace('_', ' ')}</td>
                  <td className="p-3 text-purple-400 font-bold">{sub.voltageKv} kV</td>
                  <td className="p-3 text-slate-200">{sub.currentLoadMw} / {sub.capacityMw} MW</td>
                  <td className="p-3">
                    <span className={sub.temperatureC > 60 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                      {sub.temperatureC}°C
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      sub.status === 'strained' ? 'bg-amber-950/60 text-amber-300 border-amber-800' :
                      'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setInspectedAsset(sub)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 hover:text-cyan-300 border border-slate-700 text-[11px] transition"
                    >
                      Inspect Node
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
