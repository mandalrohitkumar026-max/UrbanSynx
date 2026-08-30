import React from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Wind, Flame, AlertTriangle, ShieldCheck, Compass, Eye, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from 'recharts';

export const PollutionPage: React.FC = () => {
  const { city, gisLayers, setInspectedAsset } = useCity();

  const sensors = gisLayers.aqiSensors || [];

  const pollutantBreakdown = [
    { name: 'PM2.5', value: 22.4, threshold: 25, unit: 'µg/m³', status: 'Moderate' },
    { name: 'PM10', value: 45.1, threshold: 50, unit: 'µg/m³', status: 'Good' },
    { name: 'NO2', value: 38.6, threshold: 40, unit: 'ppb', status: 'Moderate' },
    { name: 'O3 (Ozone)', value: 42.0, threshold: 50, unit: 'ppb', status: 'Good' },
    { name: 'SO2', value: 9.1, threshold: 20, unit: 'ppb', status: 'Good' },
    { name: 'CO', value: 0.8, threshold: 4.0, unit: 'ppm', status: 'Good' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              ATMOSPHERIC POLLUTION & AIR QUALITY (AQI)
            </h1>
            <LivePulse color="emerald" label="DISPERSION MODEL ACTIVE" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time sensor telemetry, thermal inversion boundary monitoring, and industrial emission plume tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Wind Vector: <b className="text-cyan-400">{city.weather.windSpeedKmh} km/h {city.weather.windDirection}</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-rose-950/60 border border-rose-800/50 text-xs font-mono text-rose-300">
            Hotspot Alert: <b className="text-rose-200">Industrial Corridor (AQI 156)</b>
          </span>
        </div>
      </div>

      {/* Pollution KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Citywide Mean AQI"
          value={city.weather.aqi}
          unit="AQI"
          trend="-8% PM2.5 (improving)"
          trendDirection="down"
          sentiment="positive"
          accentColor="emerald"
          icon={<Wind className="w-4 h-4" />}
          subtext="Moderate Air Quality"
        />
        <StatCard
          title="Industrial Hotspot Peak"
          value="156"
          unit="AQI"
          trend="Forecast: AQI 218"
          trendDirection="up"
          sentiment="negative"
          accentColor="rose"
          icon={<Flame className="w-4 h-4" />}
          subtext="Inversion Trapping Risk"
        />
        <StatCard
          title="Inversion Layer Index"
          value="0.84"
          unit="Stagnation"
          trend="Low Wind Dispersion"
          trendDirection="up"
          sentiment="negative"
          accentColor="amber"
          icon={<Compass className="w-4 h-4" />}
          subtext="Scrubber Cannons Ready"
        />
        <StatCard
          title="Active Monitoring Nodes"
          value="48"
          unit="Stations"
          trend="100% telemetry online"
          trendDirection="stable"
          sentiment="positive"
          accentColor="cyan"
          icon={<ShieldCheck className="w-4 h-4" />}
          subtext="Laser Particulate Counters"
        />
      </div>

      {/* Pollutant Breakdown Bar Chart & Wind Dispersion Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800">
          <h2 className="text-xs font-mono font-bold text-white uppercase mb-4 flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            Pollutant Concentrations vs. WHO Regulatory Thresholds
          </h2>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pollutantBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontStyle="mono" fontSize={11} />
                <YAxis stroke="#64748b" fontStyle="mono" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="threshold" fill="#334155" radius={[4, 4, 0, 0]} name="Max Threshold" />
                <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Current Reading" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industrial Corridor Forecast Warning */}
        <div className="glass-panel p-5 rounded-xl border border-rose-900/40 bg-rose-950/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>AI HOTSPOT FORECAST ALERT</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">
              Industrial Corridor Plume Stagnation
            </h3>
            <p className="text-xs font-sans text-slate-300 leading-relaxed mb-4">
              Wind velocity projected to drop below 8 km/h between 20:00 and 02:00. Thermal inversion is predicted to trap heavy diesel emissions, driving AQI to <b>218 (Very Unhealthy)</b>.
            </p>
          </div>

          <div className="p-3 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono space-y-1">
            <div className="text-emerald-400 font-bold">RECOMMENDED PROTOCOL:</div>
            <div className="text-slate-300">Trigger mist-cannon atmospheric scrubbers and reroute heavy freight via bypass artery.</div>
          </div>
        </div>
      </div>

      {/* Sensor Station Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800">
        <h2 className="text-xs font-mono font-bold text-white uppercase mb-4">
          Atmospheric Monitoring Sensor Grid
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
              <tr>
                <th className="p-3">Zone / Station</th>
                <th className="p-3">AQI Index</th>
                <th className="p-3">PM2.5 (µg/m³)</th>
                <th className="p-3">PM10 (µg/m³)</th>
                <th className="p-3">Primary Pollutant</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-white">{sensor.zone}</td>
                  <td className="p-3">
                    <span className={`font-bold text-sm ${
                      sensor.aqi > 150 ? 'text-rose-400' :
                      sensor.aqi > 100 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {sensor.aqi}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200">{sensor.pm25}</td>
                  <td className="p-3 text-slate-200">{sensor.pm10}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{sensor.primaryPollutant}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      sensor.status === 'unhealthy' ? 'bg-rose-950/60 text-rose-300 border-rose-800' :
                      sensor.status === 'moderate' ? 'bg-amber-950/60 text-amber-300 border-amber-800' :
                      'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setInspectedAsset(sensor)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 hover:text-cyan-300 border border-slate-700 text-[11px] transition"
                    >
                      Inspect Station
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
