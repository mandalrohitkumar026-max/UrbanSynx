import React from 'react';
import { useCity } from '../../context/CityContext';
import {
  X,
  Activity,
  Gauge,
  AlertTriangle,
  Zap,
  Droplet,
  Car,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Radio
} from 'lucide-react';

export const AssetInspectorModal: React.FC = () => {
  const { inspectedAsset, setInspectedAsset, dispatchIncidentUnit, resolveIncident } = useCity();

  if (!inspectedAsset) return null;

  const handleClose = () => setInspectedAsset(null);

  const isIncident = inspectedAsset.type?.includes('collision') || inspectedAsset.title?.includes('Incident') || inspectedAsset.severity;
  const isRoad = inspectedAsset.capacityVehHr || inspectedAsset.speedKmh;
  const isWater = inspectedAsset.pressureBar !== undefined || inspectedAsset.flowRateM3h !== undefined;
  const isPower = inspectedAsset.capacityMw !== undefined || inspectedAsset.voltageKv !== undefined;
  const isBuilding = inspectedAsset.heightMeters !== undefined;

  return (
    <div className="absolute bottom-6 right-6 z-30 w-96 glass-panel rounded-xl border border-cyan-500/50 shadow-2xl p-4 text-xs font-mono select-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Drawer Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              {isIncident ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> :
               isRoad ? <Car className="w-3.5 h-3.5 text-amber-400" /> :
               isWater ? <Droplet className="w-3.5 h-3.5 text-cyan-400" /> :
               isPower ? <Zap className="w-3.5 h-3.5 text-purple-400" /> :
               <Building2 className="w-3.5 h-3.5 text-blue-400" />}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
              TELEMETRY INSPECTOR
            </span>
          </div>
          <h3 className="text-sm font-bold text-white font-sans truncate max-w-[280px]">
            {inspectedAsset.name || inspectedAsset.title || inspectedAsset.id}
          </h3>
        </div>

        <button
          onClick={handleClose}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic Telemetry Properties */}
      <div className="space-y-2 mb-4">
        {isIncident && (
          <>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Severity Level:</span>
              <span className="text-rose-400 font-bold uppercase">{inspectedAsset.severity}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Location:</span>
              <span className="text-white">{inspectedAsset.locationName}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Assigned Units:</span>
              <span className="text-cyan-300 font-semibold">{inspectedAsset.assignedUnits?.join(', ') || 'None'}</span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">RECOMMENDED PROTOCOL:</span>
              <span className="text-white text-[11px] font-sans">{inspectedAsset.recommendedAction}</span>
            </div>
          </>
        )}

        {isRoad && (
          <>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Current Velocity:</span>
              <span className="text-emerald-400 font-bold">{inspectedAsset.speedKmh} km/h (Limit: {inspectedAsset.speedLimitKmh} km/h)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Flow Throughput:</span>
              <span className="text-white font-bold">{inspectedAsset.currentFlowVehHr} / {inspectedAsset.capacityVehHr} veh/hr</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Congestion Status:</span>
              <span className={`font-bold uppercase ${
                inspectedAsset.congestionLevel === 'red' ? 'text-rose-400' :
                inspectedAsset.congestionLevel === 'orange' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {inspectedAsset.status}
              </span>
            </div>
          </>
        )}

        {isWater && (
          <>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Hydraulic Pressure:</span>
              <span className="text-cyan-400 font-bold">{inspectedAsset.pressureBar} bar</span>
            </div>
            {inspectedAsset.flowRateM3h && (
              <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Discharge Flow:</span>
                <span className="text-white font-bold">{inspectedAsset.flowRateM3h} m³/h</span>
              </div>
            )}
            {inspectedAsset.purityTdsPpm && (
              <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">TDS Purity Level:</span>
                <span className="text-emerald-400 font-bold">{inspectedAsset.purityTdsPpm} ppm (Nominal)</span>
              </div>
            )}
          </>
        )}

        {isPower && (
          <>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Operating Voltage:</span>
              <span className="text-purple-400 font-bold">{inspectedAsset.voltageKv} kV</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Active Load Draw:</span>
              <span className="text-white font-bold">{inspectedAsset.currentLoadMw || (inspectedAsset.loadPercentage + '%')} MW</span>
            </div>
            {inspectedAsset.frequencyHz && (
              <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Grid Frequency:</span>
                <span className="text-emerald-400 font-bold">{inspectedAsset.frequencyHz} Hz</span>
              </div>
            )}
          </>
        )}

        {isBuilding && (
          <>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Height / Elevation:</span>
              <span className="text-cyan-400 font-bold">{inspectedAsset.heightMeters} m</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Occupancy Census:</span>
              <span className="text-white font-bold">{inspectedAsset.occupancyCount?.toLocaleString()} Persons</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Power Draw:</span>
              <span className="text-amber-400 font-bold">{inspectedAsset.energyConsumptionKw} kW</span>
            </div>
          </>
        )}
      </div>

      {/* Action Trigger in Drawer */}
      {isIncident && (
        <div className="flex gap-2">
          <button
            onClick={() => dispatchIncidentUnit(inspectedAsset.id, 'Rapid Response Squad #01')}
            className="flex-1 py-2 px-3 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-center tracking-wider transition"
          >
            DISPATCH UNIT
          </button>
          <button
            onClick={() => {
              resolveIncident(inspectedAsset.id);
              handleClose();
            }}
            className="py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold transition"
          >
            RESOLVE
          </button>
        </div>
      )}
    </div>
  );
};
