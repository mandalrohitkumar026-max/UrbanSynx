import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Droplet, Waves, AlertTriangle, ShieldCheck, Gauge, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export const WaterPage: React.FC = () => {
  const { gisLayers, setInspectedAsset } = useCity();

  const nodes = gisLayers.waterNodes || [];
  const pipelines = gisLayers.waterPipelines || [];

  const pressureTrend = [
    { time: '14:00', reservoir: 5.4, pump: 4.6, northTank: 4.1 },
    { time: '15:00', reservoir: 5.4, pump: 4.5, northTank: 4.0 },
    { time: '16:00', reservoir: 5.3, pump: 4.4, northTank: 3.8 },
    { time: '17:00', reservoir: 5.3, pump: 4.3, northTank: 3.5 },
    { time: '18:00', reservoir: 5.2, pump: 4.2, northTank: 3.3 },
    { time: '19:00', reservoir: 5.4, pump: 4.1, northTank: 3.2 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              MUNICIPAL WATER DISTRIBUTION & HYDRAULICS
            </h1>
            <LivePulse color="cyan" label="HYDRAULIC LOOP NOMINAL" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Reservoir telemetry, smart pressure regulation, acoustic acoustic leak detection, and water purity quality assurance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Daily Delivery: <b className="text-cyan-400">412.8 MLD</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-xs font-mono text-emerald-300">
            Purity Index: <b className="text-emerald-200">99.98% Potable</b>
          </span>
        </div>
      </div>

      {/* Water KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average Network Pressure"
          value="4.20"
          unit="bar"
          trend="Nominal (Target: 4.5)"
          trendDirection="stable"
          sentiment="neutral"
          accentColor="cyan"
          icon={<Gauge className="w-4 h-4" />}
          subtext="Zone 3B Pressure Low"
        />
        <StatCard
          title="Reservoir Storage Capacity"
          value="91.4"
          unit="%"
          trend="-0.4% / day drain rate"
          trendDirection="down"
          sentiment="positive"
          accentColor="blue"
          icon={<Waves className="w-4 h-4" />}
          subtext="Marina Master Reservoir"
        />
        <StatCard
          title="Acoustic Leak Detection"
          value="1"
          unit="Suspected"
          trend="Pipe Sector 3-B"
          trendDirection="up"
          sentiment="negative"
          accentColor="amber"
          icon={<AlertTriangle className="w-4 h-4" />}
          subtext="Repair Bot Dispatched"
        />
        <StatCard
          title="Water Quality Compliance"
          value="99.98"
          unit="%"
          trend="TDS: 114 ppm (Optimal)"
          trendDirection="stable"
          sentiment="positive"
          accentColor="emerald"
          icon={<ShieldCheck className="w-4 h-4" />}
          subtext="Turbidity: 0.18 NTU"
        />
      </div>

      {/* Pressure Dynamics Graph & Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Droplet className="w-4 h-4 text-cyan-400" />
              Hydraulic Pressure Profiles Across Key Nodes (Bar)
            </h2>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded bg-cyan-400"></span> Reservoir Station
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="w-2 h-2 rounded bg-blue-400"></span> Booster Pump 04
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded bg-amber-400"></span> North Elevated Tank
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pressureTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontStyle="mono" fontSize={11} />
                <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} domain={[2, 6]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Area type="monotone" dataKey="reservoir" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="pump" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="northTank" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Quality Telemetry */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Continuous Purity Telemetry
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Turbidity (NTU):</span>
              <span className="text-emerald-400 font-bold">0.18 NTU (&lt;1.0)</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Residual Chlorine:</span>
              <span className="text-emerald-400 font-bold">0.72 mg/L (Target 0.5-1.0)</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">pH Potential:</span>
              <span className="text-white font-bold">7.35 pH (Balanced)</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Total Dissolved Solids:</span>
              <span className="text-cyan-400 font-bold">114 ppm (Ultra Clean)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nodes & Pipeline Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <h2 className="text-xs font-mono font-bold text-white uppercase mb-4">
          Key Hydraulic Nodes & Pipelines
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
              <tr>
                <th className="p-3">Station / Asset Name</th>
                <th className="p-3">Classification</th>
                <th className="p-3">Pressure (bar)</th>
                <th className="p-3">Flow Rate (m³/h)</th>
                <th className="p-3">Health Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {nodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-white">{node.name}</td>
                  <td className="p-3 text-slate-400 uppercase text-[11px]">{node.type.replace('_', ' ')}</td>
                  <td className="p-3 font-bold text-cyan-400">{node.pressureBar} bar</td>
                  <td className="p-3 text-slate-200">{node.flowRateM3h.toLocaleString()} m³/h</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      node.status === 'optimal' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' :
                      'bg-amber-950/60 text-amber-300 border-amber-800'
                    }`}>
                      {node.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setInspectedAsset(node)}
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
