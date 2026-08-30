import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { StatCard } from '../components/common/StatCard';
import { LivePulse } from '../components/common/LivePulse';
import { Incident } from '../types/city';
import { AlertOctagon, ShieldAlert, Radio, Clock, CheckCircle2, ChevronRight, UserPlus, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const IncidentsPage: React.FC = () => {
  const { gisLayers, dispatchIncidentUnit, resolveIncident, setInspectedAsset } = useCity();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [unitInput, setUnitInput] = useState<string>('');

  const incidents = gisLayers.incidents || [];
  const activeCount = incidents.filter(i => i.status !== 'resolved').length;
  const criticalCount = incidents.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;

  const handleDispatch = async (incId: string) => {
    const unit = unitInput || 'Rapid CAD Unit';
    await dispatchIncidentUnit(incId, unit);
    setUnitInput('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-mono text-white tracking-wide">
              EMERGENCY COMMAND & CAD INCIDENT DISPATCH
            </h1>
            <LivePulse color="red" label="CAD STREAM ONLINE" />
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Integrated 911/CAD emergency queue, multi-agency unit dispatch, SLA countdown, and automated triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-rose-950/60 border border-rose-800 text-xs font-mono text-rose-300">
            Critical Active: <b className="text-rose-200">{criticalCount} Incidents</b>
          </span>
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Average Response Time: <b className="text-emerald-400">7.4 min</b>
          </span>
        </div>
      </div>

      {/* Incident KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active CAD Incidents"
          value={activeCount}
          unit="Active"
          trend="2 High, 1 Critical, 1 Med"
          trendDirection="up"
          sentiment="negative"
          accentColor="rose"
          icon={<AlertOctagon className="w-4 h-4" />}
          subtext="Queue Synchronized"
        />
        <StatCard
          title="Mean Emergency SLA"
          value="7.4"
          unit="Minutes"
          trend="Target: 8.0 min"
          trendDirection="down"
          sentiment="positive"
          accentColor="emerald"
          icon={<Clock className="w-4 h-4" />}
          subtext="98.4% SLA Compliance"
        />
        <StatCard
          title="Units in Field"
          value="24"
          unit="Squads"
          trend="Police, Fire, EMS, Water"
          trendDirection="stable"
          sentiment="positive"
          accentColor="cyan"
          icon={<Radio className="w-4 h-4" />}
          subtext="GPS Fleet Tracking"
        />
        <StatCard
          title="Containment Velocity"
          value="94.2"
          unit="%"
          trend="Rapid AI Triage"
          trendDirection="up"
          sentiment="positive"
          accentColor="purple"
          icon={<ShieldAlert className="w-4 h-4" />}
          subtext="Standard Operating Playbooks"
        />
      </div>

      {/* Incidents Queue & Detail Dispatch Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident Queue (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-white uppercase">
              Live Incident Dispatch Queue
            </span>
            <span className="text-[10px] font-mono text-slate-400">Sorted by Severity</span>
          </div>

          <div className="space-y-2.5">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  selectedIncident?.id === inc.id
                    ? 'bg-slate-800/90 border-cyan-500 shadow-glow-cyan'
                    : inc.severity === 'critical'
                    ? 'bg-rose-950/20 border-rose-900/50 hover:bg-rose-900/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      inc.severity === 'critical' ? 'bg-rose-950 text-rose-300 border-rose-700' :
                      inc.severity === 'high' ? 'bg-amber-950 text-amber-300 border-amber-700' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {inc.severity}
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      [{inc.id}] {inc.title}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    SLA: <b className="text-white">{inc.slaMinutesRemaining}m</b>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {inc.locationName}
                  </span>
                  <span className={`uppercase font-bold text-[10px] ${
                    inc.status === 'resolved' ? 'text-emerald-400' :
                    inc.status === 'dispatched' ? 'text-cyan-400' : 'text-rose-400'
                  }`}>
                    Status: {inc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch & Tactical Console (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-white uppercase">
              Tactical Unit Dispatch Console
            </span>
          </div>

          {selectedIncident ? (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Incident ID:</span>
                  <span className="font-bold text-white">{selectedIncident.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reported Time:</span>
                  <span className="text-slate-300">{selectedIncident.reportedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Impact Radius:</span>
                  <span className="text-cyan-400 font-bold">{selectedIncident.impactRadiusMeters} meters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="uppercase font-bold text-cyan-300">{selectedIncident.status}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-slate-950/80 border border-cyan-900/40 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                  AI RECOMMENDED PROTOCOL:
                </span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {selectedIncident.recommendedAction}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 block text-[11px]">ASSIGNED FIELD UNITS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIncident.assignedUnits.map((u, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              {/* Unit Dispatch Input */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-slate-400 text-[11px] block">DISPATCH ADDITIONAL SQUAD:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Police Cruiser #19, Fire Tender 04"
                    value={unitInput}
                    onChange={(e) => setUnitInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                  <button
                    onClick={() => handleDispatch(selectedIncident.id)}
                    className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition"
                  >
                    DISPATCH
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => resolveIncident(selectedIncident.id)}
                  className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center tracking-wider transition"
                >
                  MARK RESOLVED
                </button>
                <NavLink
                  to="/digital-twin"
                  onClick={() => setInspectedAsset(selectedIncident)}
                  className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-center font-bold transition"
                >
                  LOCATE ON 3D MAP
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              Select an incident from the queue to view tactical details and dispatch emergency units.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
