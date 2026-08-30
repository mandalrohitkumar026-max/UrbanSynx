import React, { useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { MetricGauge } from '../components/common/MetricGauge';
import { LivePulse } from '../components/common/LivePulse';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  AlertOctagon,
  ShieldCheck,
  Building2,
  Car,
  Zap,
  Droplet,
  Flame,
  ArrowRight,
  Cpu,
  TrendingDown
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const SimulationPage: React.FC = () => {
  const { city } = useCity();
  const {
    simInput,
    updateSimInput,
    resetSimInput,
    isRunning,
    activeScenarioId,
    loadScenario,
    runSimulation,
    simResult
  } = useSimulation();

  const scenarios = [
    {
      id: 'scen-bridge-fail',
      name: 'Major Coastal Viaduct / Bridge Sudden Closure',
      category: 'Infrastructure Emergency',
      severity: 'Severe',
      description: 'Simulates complete 4-lane closure of Coastal Viaduct due to emergency structural crack detection.',
      color: 'border-amber-700/50 hover:border-amber-500'
    },
    {
      id: 'scen-blackout',
      name: 'Primary Substation Alpha 400kV Transformer Trip',
      category: 'Grid Blackout',
      severity: 'Catastrophic',
      description: 'Cascading thermal trip on Substation Alpha threatening 35% of the Central Business District.',
      color: 'border-purple-700/50 hover:border-purple-500'
    },
    {
      id: 'scen-flash-flood',
      name: '100-Year Storm Surge & Flash Inundation',
      category: 'Climate Disaster',
      severity: 'Catastrophic',
      description: 'Intense precipitation (140mm/hr) paired with high astronomical tide flooding urban lowlands.',
      color: 'border-cyan-700/50 hover:border-cyan-500'
    },
    {
      id: 'scen-mass-event',
      name: 'International Summit & Mega-Concert Surge',
      category: 'Mass Gathering',
      severity: 'Moderate',
      description: 'Concurrent influx of 180,000 visitors into Central Waterfront with transit bottlenecks.',
      color: 'border-blue-700/50 hover:border-blue-500'
    }
  ];

  // Run initial default simulation on mount if null
  useEffect(() => {
    if (!simResult) {
      runSimulation();
    }
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              WHAT-IF URBAN SIMULATION & STRESS TEST SANDBOX
            </h1>
            <span className="px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-700 text-purple-300 font-mono text-xs font-bold">
              PHYSICS & AI ENGINE
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Inject synthetic extreme scenarios, analyze cascading cross-utility collapse propagation, and evaluate AI mitigation playbooks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetSimInput}
            className="px-3 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET SANDBOX</span>
          </button>
          <button
            disabled={isRunning}
            onClick={runSimulation}
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition shadow-glow-purple"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>COMPUTING SOLVER...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RUN SIMULATION</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Scenario Cards */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
          Preset Mission Critical Scenarios
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {scenarios.map((scen) => (
            <div
              key={scen.id}
              onClick={() => {
                loadScenario(scen as any);
                runSimulation();
              }}
              className={`glass-panel p-3.5 rounded-lg border transition-all cursor-pointer ${scen.color} ${
                activeScenarioId === scen.id ? 'bg-purple-950/40 border-purple-500 shadow-glow-purple' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                  {scen.category}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {scen.severity}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white font-sans mb-1.5 leading-snug">
                {scen.name}
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal line-clamp-2 mb-3">
                {scen.description}
              </p>
              <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>Inject Scenario</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Controls & Computed Impact Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Custom Scenario Parameters (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Custom Stress Test Parameters
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Dynamic Multi-Variable</span>
          </div>

          {/* Toggle 1: Bridge Closure */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-white">Coastal Viaduct / Bridge Closure</div>
              <div className="text-[10px] text-slate-400">Force complete traffic shutdown on Span 4</div>
            </div>
            <input
              type="checkbox"
              checked={simInput.bridgeClosure}
              onChange={(e) => {
                updateSimInput('bridgeClosure', e.target.checked);
              }}
              className="w-4 h-4 rounded bg-slate-800 text-purple-600 focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Toggle 2: Substation Outage */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-white">Substation Alpha 400kV Blackout</div>
              <div className="text-[10px] text-slate-400">Simulate 1,400 MW catastrophic grid loss</div>
            </div>
            <input
              type="checkbox"
              checked={simInput.substationOutage}
              onChange={(e) => {
                updateSimInput('substationOutage', e.target.checked);
              }}
              className="w-4 h-4 rounded bg-slate-800 text-purple-600 focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Slider 1: Flood Level */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Storm Surge Inundation Level:</span>
              <span className="font-bold text-cyan-400">{simInput.floodLevelMeters.toFixed(1)} Meters</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={simInput.floodLevelMeters}
              onChange={(e) => updateSimInput('floodLevelMeters', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0.0m (Dry)</span>
              <span>1.5m (Moderate)</span>
              <span>3.0m (Catastrophic)</span>
            </div>
          </div>

          {/* Slider 2: Traffic Surge */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Vehicular Congestion Influx Surge:</span>
              <span className="font-bold text-amber-400">+{simInput.trafficSurgePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={simInput.trafficSurgePct}
              onChange={(e) => updateSimInput('trafficSurgePct', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Slider 3: Power Surge */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Electrical Demand Surge (HVAC/EV):</span>
              <span className="font-bold text-purple-400">+{simInput.powerLoadSurgePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={simInput.powerLoadSurgePct}
              onChange={(e) => updateSimInput('powerLoadSurgePct', Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Weather Dropdown */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono text-slate-300 block">Meteorological Weather Condition:</span>
            <select
              value={simInput.weatherCondition}
              onChange={(e) => updateSimInput('weatherCondition', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
            >
              <option value="clear">Clear Skies (Standard Dispersion)</option>
              <option value="heavy_rain">Tropical Torrential Rainstorm</option>
              <option value="heatwave">Extreme Heatwave (38°C High Cooling Demand)</option>
              <option value="fog_inversion">Thermal Inversion Fog Stagnation</option>
            </select>
          </div>

          <button
            onClick={runSimulation}
            className="w-full py-2.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition shadow-glow-purple"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RECALCULATE DIGITAL TWIN STATE</span>
          </button>
        </div>

        {/* Right: Computed Impact Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {simResult ? (
            <>
              {/* Master Health Drop Result Card */}
              <div className={`glass-panel p-5 rounded-xl border relative overflow-hidden ${
                simResult.healthDelta < -20 ? 'border-rose-700/60 bg-rose-950/20' :
                simResult.healthDelta < -10 ? 'border-amber-700/60 bg-amber-950/20' : 'border-purple-800/60'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                        SIMULATION ENGINE PREDICTED OUTCOME
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono">
                      City Health Index: <span className="text-purple-300">{simResult.cityHealthScore} / 100</span>
                    </h3>
                    <div className="text-xs font-mono text-rose-400 mt-0.5 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>{simResult.healthDelta} Points Resilience Drop</span>
                    </div>
                  </div>

                  <div className="text-right sm:border-l border-slate-800 sm:pl-4">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Economic Drag</div>
                    <div className="text-lg font-bold font-mono text-amber-400">
                      ${(simResult.economicCostPerHourUsd / 1000).toFixed(0)}k / Hr
                    </div>
                    <div className="text-[10px] font-mono text-rose-400">
                      {simResult.emergencyUnitsRequired} Emergency Squads Required
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200">
                  <span className="text-purple-400 font-bold block mb-1">IMPACT DIAGNOSTIC:</span>
                  {simResult.impactSummary}
                </div>
              </div>

              {/* Subsystems Impact Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="glass-panel p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Traffic Delay</span>
                  <div className="text-lg font-bold font-mono text-amber-400">
                    +{simResult.avgCommuteDelayMinutes} min
                  </div>
                </div>
                <div className="glass-panel p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Power Deficit</span>
                  <div className="text-lg font-bold font-mono text-purple-400">
                    {simResult.gridPowerDeficitMw > 0 ? `-${simResult.gridPowerDeficitMw} MW` : '0 MW'}
                  </div>
                </div>
                <div className="glass-panel p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Water Stress</span>
                  <div className="text-lg font-bold font-mono text-cyan-400">
                    {simResult.waterSupplyStressPct}%
                  </div>
                </div>
                <div className="glass-panel p-3 rounded-lg border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Projected AQI</span>
                  <div className="text-lg font-bold font-mono text-rose-400">
                    {simResult.airQualityIndex}
                  </div>
                </div>
              </div>

              {/* Autonomous AI Mitigation Recommendations */}
              <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Autonomous AI Mitigation Playbooks</span>
                </div>
                <div className="space-y-2">
                  {simResult.dynamicRecommendations.map((rec, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono flex items-start gap-2.5 text-slate-200">
                      <span className="w-5 h-5 rounded bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button to Digital Twin */}
              <NavLink
                to="/digital-twin"
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition shadow-glow-cyan"
              >
                <span>VIEW SCENARIO EFFECTS IN LIVING 3D MAP</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </>
          ) : (
            <div className="glass-panel p-12 rounded-xl border border-slate-800 text-center text-slate-500 font-mono text-xs">
              Select or configure scenario parameters and click <b>Run Simulation</b> to compute impacts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
