import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { Settings, Sliders, Database, Shield, Bell, Cpu, CheckCircle2, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userRole, setUserRole } = useCity();
  const [saved, setSaved] = useState(false);

  const [ingestionRate, setIngestionRate] = useState('2s');
  const [lodFidelity, setLodFidelity] = useState('LOD 3 (High Precision 3D)');
  const [autoExecuteAI, setAutoExecuteAI] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              SYSTEM CONFIGURATION & INGESTION PARAMETERS
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Configure telemetry ingestion streams, digital twin LOD fidelity, alert triggers, and role-based policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition shadow-glow-cyan"
        >
          {saved ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'SETTINGS PERSISTED' : 'SAVE CONFIGURATION'}</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* 1. Digital Twin Rendering Fidelity */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold text-white uppercase">
              3D Digital Twin GIS Fidelity & Graphics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <span className="text-slate-300">Level of Detail (LOD):</span>
              <select
                value={lodFidelity}
                onChange={(e) => setLodFidelity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none"
              >
                <option>LOD 3 (High Precision 3D + Extrusions)</option>
                <option>LOD 2 (Balanced 2.5D Polygons)</option>
                <option>LOD 1 (High-Performance 2D Flat)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-300">Particle Simulation Density:</span>
              <select className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none">
                <option>Ultra (Thousands of Vehicles)</option>
                <option>High (Standard)</option>
                <option>Low (Battery Saver)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. IoT Telemetry Ingestion */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Database className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-mono font-bold text-white uppercase">
              Telemetry Ingestion & Sensor Sync Rates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <span className="text-slate-300">WebSocket Refresh Frequency:</span>
              <select
                value={ingestionRate}
                onChange={(e) => setIngestionRate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none"
              >
                <option value="1s">1.0 Second (Real-Time Ultra)</option>
                <option value="2s">2.0 Seconds (Standard Mission Control)</option>
                <option value="5s">5.0 Seconds (Low Bandwidth)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-300">Sensor Protocol:</span>
              <input
                type="text"
                disabled
                value="MQTT / WebSockets over TLS (WSS)"
                className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* 3. AI Autonomy & Alarm Thresholds */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-mono font-bold text-white uppercase">
              AI Autonomy & Safety Governance
            </h2>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <label className="flex items-center justify-between p-3 rounded bg-slate-900/80 border border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Auto-Execute Low-Risk AI Playbooks</span>
                <span className="text-[11px] text-slate-400">Allows AI to adjust adaptive signals and water valves without manual confirmation</span>
              </div>
              <input
                type="checkbox"
                checked={autoExecuteAI}
                onChange={(e) => setAutoExecuteAI(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded bg-slate-900/80 border border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Audio Warning Chimes for Critical Incidents</span>
                <span className="text-[11px] text-slate-400">Play subtle mission-control tone when critical water leak or collision is reported</span>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
