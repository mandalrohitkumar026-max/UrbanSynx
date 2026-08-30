import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Users, Bus, Navigation, ShieldCheck, ArrowUpRight, Compass, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export const PopulationPage: React.FC = () => {
  const { gisLayers, setInspectedAsset } = useCity();

  const zones = gisLayers.populationZones || [];

  const footfallTrend = [
    { time: '14:00', cbd: 120000, north: 65000, port: 28000 },
    { time: '16:00', cbd: 135000, north: 72000, port: 30000 },
    { time: '18:00', cbd: 148500, north: 89000, port: 32000 },
    { time: '20:00 (Forecast)', cbd: 110000, north: 98000, port: 25000 },
    { time: '22:00 (Forecast)', cbd: 65000, north: 104000, port: 18000 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              POPULATION MOBILITY & CELLULAR FOOTFALL
            </h1>
            <LivePulse color="red" label="ANONYMIZED TELECOM STREAM" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Aggregate cellular cluster density, pedestrian choke point tracking, transit hub loading, and dynamic evacuation modeling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Active Footfall (CBD): <b className="text-rose-400">148,500</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-300">
            Transit Fleet Load: <b className="text-cyan-200">82.4%</b>
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Downtown Pedestrian Flux"
          value="148.5k"
          unit="Persons"
          trend="+18% peak evening surge"
          trendDirection="up"
          sentiment="neutral"
          accentColor="rose"
          icon={<Users className="w-4 h-4" />}
          subtext="Egress to Transit Hubs"
        />
        <StatCard
          title="Public Transit Network Load"
          value="82.4"
          unit="%"
          trend="MRT & Bus Fleet at Peak"
          trendDirection="up"
          sentiment="negative"
          accentColor="cyan"
          icon={<Bus className="w-4 h-4" />}
          subtext="60 Extra Shuttles Active"
        />
        <StatCard
          title="Evacuation Clearance Rate"
          value="85,000"
          unit="Persons / Hr"
          trend="Optimal Disaster Capacity"
          trendDirection="stable"
          sentiment="positive"
          accentColor="emerald"
          icon={<ShieldCheck className="w-4 h-4" />}
          subtext="Multi-Modal Throughput"
        />
        <StatCard
          title="Mobility Surge Index"
          value="1.18"
          unit="x Normal"
          trend="Surging in Marina Core"
          trendDirection="up"
          sentiment="neutral"
          accentColor="purple"
          icon={<Navigation className="w-4 h-4" />}
          subtext="Crowd Flow Controlled"
        />
      </div>

      {/* Footfall Dynamic Area Chart */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            Cellular Footfall Migration Timeline: CBD vs. Residential Districts
          </h2>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2 h-2 rounded bg-rose-400"></span> CBD Financial Hub
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="w-2 h-2 rounded bg-cyan-400"></span> North Residential
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded bg-amber-400"></span> Maritime Port
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={footfallTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontStyle="mono" fontSize={11} />
              <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
              <Area type="monotone" dataKey="cbd" stroke="#f43f5e" fill="rgba(244, 63, 94, 0.2)" strokeWidth={2} />
              <Area type="monotone" dataKey="north" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.15)" strokeWidth={2} />
              <Area type="monotone" dataKey="port" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Population Zones Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <h2 className="text-xs font-mono font-bold text-white uppercase mb-4">
          Urban Sectors Density & Mobility Status
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
              <tr>
                <th className="p-3">Sector Name</th>
                <th className="p-3">Density (per km²)</th>
                <th className="p-3">Current Footfall</th>
                <th className="p-3">Mobility Flux</th>
                <th className="p-3">Transit Load</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-white">{zone.name}</td>
                  <td className="p-3 font-bold text-rose-400">{zone.densityPerKm2.toLocaleString()} / km²</td>
                  <td className="p-3 text-slate-200">{zone.currentFootfall.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800 text-[10px] font-bold uppercase">
                      {zone.mobilityFlux}
                    </span>
                  </td>
                  <td className="p-3 text-cyan-300 font-bold">{zone.transitHubLoad}% Capacity</td>
                  <td className="p-3">
                    <button
                      onClick={() => setInspectedAsset(zone)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 hover:text-cyan-300 border border-slate-700 text-[11px] transition"
                    >
                      Inspect Zone
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
