import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { BarChart3, TrendingUp, Download, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { city } = useCity();

  const historicalPerformance = [
    { time: '00:00', traffic: 92, water: 96, energy: 95, aqi: 88 },
    { time: '04:00', traffic: 95, water: 96, energy: 97, aqi: 90 },
    { time: '08:00', traffic: 68, water: 92, energy: 88, aqi: 74 },
    { time: '12:00', traffic: 75, water: 90, energy: 86, aqi: 65 },
    { time: '16:00', traffic: 70, water: 89, energy: 84, aqi: 62 },
    { time: '19:00', traffic: 64, water: 94, energy: 81, aqi: 68 },
    { time: '22:00', traffic: 84, water: 95, energy: 91, aqi: 80 },
  ];

  const correlations = [
    { factorA: 'Peak Hour Traffic Congestion', factorB: 'Ground PM2.5 AQI Surge', score: '+0.88', status: 'High Correlation' },
    { factorA: 'Ambient Temperature > 30°C', factorB: 'Grid HVAC Power Draw (GW)', score: '+0.94', status: 'Very High Correlation' },
    { factorA: 'Main Pipe Pressure Gradient', factorB: 'Reservoir Drain Velocity', score: '+0.76', status: 'High Correlation' },
    { factorA: 'Transit Delay on Arterial C', factorB: 'Cellular Pedestrian Surge', score: '+0.82', status: 'High Correlation' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              CROSS-DOMAIN ANALYTICS & SLA PERFORMANCE
            </h1>
            <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold">
              MUNICIPAL AUDIT GRADE
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Historical telemetry comparisons, cross-utility causal correlations, and municipal SLA benchmark compliance.
          </p>
        </div>

        <button className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center gap-2 transition">
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>EXPORT MUNICIPAL REPORT (PDF)</span>
        </button>
      </div>

      {/* SLA KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Grid Power Availability"
          value="99.991"
          unit="%"
          trend="Exceeds 99.99% SLA"
          trendDirection="stable"
          sentiment="positive"
          accentColor="purple"
          icon={<ShieldCheck className="w-4 h-4" />}
          subtext="Zero Unplanned Outages"
        />
        <StatCard
          title="Water Potability Uptime"
          value="99.998"
          unit="%"
          trend="WHO Standard Compliant"
          trendDirection="stable"
          sentiment="positive"
          accentColor="cyan"
          icon={<ShieldCheck className="w-4 h-4" />}
          subtext="Continuous Sensor Verification"
        />
        <StatCard
          title="Emergency CAD Response"
          value="7.4"
          unit="min"
          trend="SLA Target: 8.0 min"
          trendDirection="down"
          sentiment="positive"
          accentColor="emerald"
          icon={<Clock className="w-4 h-4" />}
          subtext="98.4% SLA Compliance"
        />
        <StatCard
          title="Adaptive Traffic Signal Gain"
          value="94.6"
          unit="%"
          trend="Dynamic Wave Coverage"
          trendDirection="up"
          sentiment="positive"
          accentColor="amber"
          icon={<BarChart3 className="w-4 h-4" />}
          subtext="142 Junctions Synchronized"
        />
      </div>

      {/* 24-Hour Cross Utility Telemetry Multi-Line Chart */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            24-Hour Historical Subsystem Efficiency Curves
          </h2>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded bg-amber-400"></span> Traffic
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="w-2 h-2 rounded bg-cyan-400"></span> Water
            </span>
            <span className="flex items-center gap-1 text-purple-400">
              <span className="w-2 h-2 rounded bg-purple-400"></span> Energy
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded bg-emerald-400"></span> Air Quality
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontStyle="mono" fontSize={11} />
              <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} domain={[50, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
              <Line type="monotone" dataKey="traffic" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="energy" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cross-Domain Correlation Matrix Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <h2 className="text-xs font-mono font-bold text-white uppercase mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          Cross-Domain Causal Correlation Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
              <tr>
                <th className="p-3">Primary Variable (A)</th>
                <th className="p-3">Correlated Effect (B)</th>
                <th className="p-3">Pearson Correlation Score</th>
                <th className="p-3">Statistical Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {correlations.map((corr, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-white">{corr.factorA}</td>
                  <td className="p-3 text-cyan-300 font-semibold">{corr.factorB}</td>
                  <td className="p-3 font-bold text-purple-400">{corr.score}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-bold uppercase">
                      {corr.status}
                    </span>
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
