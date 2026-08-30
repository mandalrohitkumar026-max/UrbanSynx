import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Car, Route, Gauge, AlertTriangle, ShieldCheck, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

export const TrafficPage: React.FC = () => {
  const { city, gisLayers, setInspectedAsset } = useCity();

  const roads = gisLayers.roads || [];

  const corridorData = roads.map((r) => ({
    name: r.name.split('(')[0].trim(),
    flow: r.currentFlowVehHr,
    capacity: r.capacityVehHr,
    speed: r.speedKmh,
    status: r.status
  }));

  const speedHistogram = [
    { range: '0-20 km/h', count: 18, color: '#ef4444' },
    { range: '20-40 km/h', count: 42, color: '#f59e0b' },
    { range: '40-60 km/h', count: 88, color: '#10b981' },
    { range: '60-80 km/h', count: 54, color: '#06b6d4' },
    { range: '80+ km/h', count: 22, color: '#3b82f6' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              INTELLIGENT TRAFFIC & MOBILITY CORRIDORS
            </h1>
            <LivePulse color="amber" label="ADAPTIVE SIGNALS ON" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time arterial telemetry, capacity utilization, queue estimation, and green-wave synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Total Flow: <b className="text-white">18,650 veh/hr</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-amber-950/60 border border-amber-800/50 text-xs font-mono text-amber-300">
            Peak Congestion Delay: <b className="text-amber-200">+14 min</b>
          </span>
        </div>
      </div>

      {/* Traffic KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Network Saturation"
          value="74.2"
          unit="%"
          trend="+12% congestion"
          trendDirection="up"
          sentiment="negative"
          accentColor="amber"
          icon={<Car className="w-4 h-4" />}
          subtext="CBD Arterial Peak"
        />
        <StatCard
          title="Average Flow Velocity"
          value="48.5"
          unit="km/h"
          trend="-4.2 km/h vs target"
          trendDirection="down"
          sentiment="negative"
          accentColor="cyan"
          icon={<Gauge className="w-4 h-4" />}
          subtext="Target: 55 km/h"
        />
        <StatCard
          title="Adaptive Signals Sync"
          value="142"
          unit="Junctions"
          trend="99.4% online"
          trendDirection="stable"
          sentiment="positive"
          accentColor="emerald"
          icon={<Zap className="w-4 h-4" />}
          subtext="AI Timing Plan Active"
        />
        <StatCard
          title="Active Congestion Bottlenecks"
          value="2"
          unit="Locations"
          trend="1 Collision, 1 Lane Closure"
          trendDirection="up"
          sentiment="negative"
          accentColor="rose"
          icon={<AlertTriangle className="w-4 h-4" />}
          subtext="Rerouting Active"
        />
      </div>

      {/* Corridor Throughput Chart & Speed Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Corridor Capacity vs Flow Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Route className="w-4 h-4 text-cyan-400" />
              Major Corridor Capacity vs. Current Flow (Veh/Hr)
            </h2>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded bg-cyan-400"></span> Current Flow
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2 h-2 rounded bg-slate-700"></span> Max Capacity
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={corridorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontStyle="mono" fontSize={10} />
                <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="capacity" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar dataKey="flow" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Speed Distribution Histogram */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <h2 className="text-xs font-mono font-bold text-white uppercase mb-4 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-400" />
            Vehicular Speed Distribution
          </h2>
          <div className="space-y-3 font-mono text-xs">
            {speedHistogram.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{item.range}</span>
                  <span className="font-bold text-white">{item.count}% of fleet</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.count}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-emerald-400 font-bold block mb-1">AI SPEED HARMONIZATION</span>
            Dynamic speed limits active on Highway Spans 1-4 to prevent shockwave braking.
          </div>
        </div>
      </div>

      {/* Corridors Interactive Telemetry Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <h2 className="text-xs font-mono font-bold text-white uppercase mb-4">
          Live Arterial Roadway Telemetry Feed
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
              <tr>
                <th className="p-3">Corridor Name</th>
                <th className="p-3">Classification</th>
                <th className="p-3">Current Speed</th>
                <th className="p-3">Throughput Flow</th>
                <th className="p-3">Congestion Level</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {roads.map((road) => (
                <tr key={road.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-white">{road.name}</td>
                  <td className="p-3 text-slate-400 uppercase text-[11px]">{road.type}</td>
                  <td className="p-3">
                    <span className={`font-bold ${road.speedKmh < 30 ? 'text-rose-400' : road.speedKmh < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {road.speedKmh} km/h
                    </span>
                  </td>
                  <td className="p-3 text-slate-200">{road.currentFlowVehHr} / {road.capacityVehHr} veh/h</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      road.congestionLevel === 'red' ? 'bg-rose-950/60 text-rose-300 border-rose-800' :
                      road.congestionLevel === 'orange' ? 'bg-amber-950/60 text-amber-300 border-amber-800' :
                      road.congestionLevel === 'yellow' ? 'bg-yellow-950/60 text-yellow-300 border-yellow-800' :
                      'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    }`}>
                      {road.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setInspectedAsset(road)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 hover:text-cyan-300 border border-slate-700 text-[11px] transition"
                    >
                      Inspect Telemetry
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
