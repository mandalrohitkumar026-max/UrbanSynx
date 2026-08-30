import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Building2, Activity, ShieldCheck, AlertTriangle, Wrench, CheckCircle2, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const InfrastructurePage: React.FC = () => {
  const { setInspectedAsset } = useCity();

  const infrastructureAssets = [
    { id: 'ast-brg-1', name: 'Marina Viaduct Cable-Stay Bridge', healthScore: 92, vibrationG: 0.04, strainMicroE: 140, lastInspected: '2026-08-20', status: 'optimal' },
    { id: 'ast-tun-2', name: 'North-South Arterial Tunnel', healthScore: 88, vibrationG: 0.02, strainMicroE: 95, lastInspected: '2026-08-15', status: 'optimal' },
    { id: 'ast-dam-3', name: 'Marina Basin Storm Barrage', healthScore: 97, vibrationG: 0.01, strainMicroE: 80, lastInspected: '2026-08-28', status: 'optimal' },
    { id: 'ast-ovp-4', name: 'Port Logistics Overpass Span 2', healthScore: 78, vibrationG: 0.09, strainMicroE: 280, lastInspected: '2026-08-10', status: 'warning' },
  ];

  const workOrders = [
    { id: 'WO-8801', asset: 'Port Overpass Expansion Joint', priority: 'High', team: 'Structural Rapid Squad #02', status: 'In Progress', due: 'Today, 22:00' },
    { id: 'WO-8802', asset: 'Marina Viaduct Pier 4 Vibration Sensor', priority: 'Medium', team: 'IoT Telemetry Tech #04', status: 'Scheduled', due: 'Tomorrow, 08:00' },
    { id: 'WO-8803', asset: 'North Underpass Hydro Barrier Check', priority: 'Low', team: 'Civil Maintenance A', status: 'Completed', due: 'Yesterday' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              STRUCTURAL HEALTH MONITORING (SHM)
            </h1>
            <LivePulse color="emerald" label="PIEZO SENSORS ONLINE" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Fiber-optic strain gauges, accelerometers, bridge expansion joints, tunnel geotechnical telemetry, and automated work orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Road Roughness (IRI): <b className="text-emerald-400">1.85 (Smooth)</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-amber-950/60 border border-amber-800/50 text-xs font-mono text-amber-300">
            Active Alerts: <b className="text-amber-200">1 Vibration Warning</b>
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Structural Index"
          value="89.2"
          unit="/ 100"
          trend="Nominal Operating Margin"
          trendDirection="stable"
          sentiment="positive"
          accentColor="emerald"
          icon={<Building2 className="w-4 h-4" />}
          subtext="412 Bridge Nodes Active"
        />
        <StatCard
          title="International Roughness (IRI)"
          value="1.85"
          unit="m/km"
          trend="Smooth Pavement Grade"
          trendDirection="stable"
          sentiment="positive"
          accentColor="cyan"
          icon={<Activity className="w-4 h-4" />}
          subtext="Laser Profilometer Verified"
        />
        <StatCard
          title="Critical Asset Alerts"
          value="1"
          unit="Warning"
          trend="Port Overpass Span 2"
          trendDirection="up"
          sentiment="negative"
          accentColor="amber"
          icon={<AlertTriangle className="w-4 h-4" />}
          subtext="Inspection Scheduled"
        />
        <StatCard
          title="Open Maintenance Orders"
          value="14"
          unit="Active"
          trend="92% SLA On-Time Rate"
          trendDirection="stable"
          sentiment="positive"
          accentColor="purple"
          icon={<Wrench className="w-4 h-4" />}
          subtext="Autonomous Dispatch"
        />
      </div>

      {/* Asset Structural Health Table & Work Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assets Table (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800">
          <h2 className="text-xs font-mono font-bold text-white uppercase mb-4">
            Critical Civil Infrastructure Telemetry Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                <tr>
                  <th className="p-3">Asset Name</th>
                  <th className="p-3">Health Score</th>
                  <th className="p-3">Peak Vibration</th>
                  <th className="p-3">Microstrain</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {infrastructureAssets.map((ast) => (
                  <tr key={ast.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-semibold text-white">{ast.name}</td>
                    <td className="p-3">
                      <span className={`font-bold ${ast.healthScore > 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {ast.healthScore} / 100
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{ast.vibrationG} g</td>
                    <td className="p-3 text-slate-300">{ast.strainMicroE} µε</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        ast.status === 'optimal' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' :
                        'bg-amber-950/60 text-amber-300 border-amber-800'
                      }`}>
                        {ast.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setInspectedAsset(ast)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 hover:text-cyan-300 border border-slate-700 text-[11px] transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Work Orders List */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-mono font-bold text-white uppercase mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-purple-400" />
              Automated Work Orders
            </h2>
            <div className="space-y-2.5">
              {workOrders.map((wo) => (
                <div key={wo.id} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{wo.id}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                      wo.priority === 'High' ? 'text-rose-400 bg-rose-950 border border-rose-800' : 'text-slate-300 bg-slate-800'
                    }`}>
                      {wo.priority} Priority
                    </span>
                  </div>
                  <div className="text-slate-300 text-[11px] mb-1">{wo.asset}</div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{wo.team}</span>
                    <span className="text-cyan-400">{wo.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-3 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition">
            <span>Create Field Work Order</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
