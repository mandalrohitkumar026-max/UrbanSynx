import React from 'react';
import { useCity } from '../../context/CityContext';
import { LayerVisibilityState, ViewMode } from '../../types/city';
import {
  Layers,
  Car,
  Route,
  Building2,
  Droplet,
  Zap,
  Wind,
  Users,
  AlertTriangle,
  Bus,
  Eye,
  Sun,
  Flame,
  Clock,
  Sparkles,
  Maximize2,
  Compass
} from 'lucide-react';

interface MapControlsProps {
  onResetBearing?: () => void;
  onToggle3D?: () => void;
  is3D?: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onResetBearing,
  onToggle3D,
  is3D = true
}) => {
  const {
    layers,
    toggleLayer,
    viewMode,
    setViewMode,
    forecastMinutes,
    setForecastMinutes
  } = useCity();

  const layerItems: { key: keyof LayerVisibilityState; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { key: 'traffic', label: 'Traffic Flows & Particles', icon: Car, color: 'text-amber-400' },
    { key: 'roads', label: 'Roads & Highways', icon: Route, color: 'text-cyan-400' },
    { key: 'buildings', label: '3D Building Meshes', icon: Building2, color: 'text-blue-400' },
    { key: 'waterNetwork', label: 'Water Pipelines & Pumps', icon: Droplet, color: 'text-cyan-300' },
    { key: 'powerNetwork', label: 'Power Grid & Substations', icon: Zap, color: 'text-purple-400' },
    { key: 'pollution', label: 'Pollution & AQI Dispersion', icon: Wind, color: 'text-emerald-400' },
    { key: 'populationDensity', label: 'Population Density', icon: Users, color: 'text-rose-400' },
    { key: 'incidents', label: 'Emergency Incidents', icon: AlertTriangle, color: 'text-red-400' },
    { key: 'publicTransport', label: 'Public Transit Fleet', icon: Bus, color: 'text-indigo-400' },
  ];

  return (
    <div className="absolute top-4 left-4 z-20 space-y-3 pointer-events-none">
      {/* 1. Layer Control Glass Matrix */}
      <div className="glass-panel rounded-xl p-3.5 border border-slate-700/80 shadow-2xl w-64 pointer-events-auto backdrop-blur-md">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>GIS Geospatial Layers</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {Object.values(layers).filter(Boolean).length} / {layerItems.length}
          </span>
        </div>

        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {layerItems.map((item) => {
            const Icon = item.icon;
            const isChecked = layers[item.key];
            return (
              <label
                key={item.key}
                className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800/60 cursor-pointer text-xs font-mono transition"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className={isChecked ? 'text-slate-200' : 'text-slate-500 line-through'}>
                    {item.label}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleLayer(item.key)}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Visual Mode & 3D Tilt Selector */}
      <div className="glass-panel rounded-xl p-2.5 border border-slate-700/80 shadow-2xl flex items-center gap-1.5 pointer-events-auto w-max">
        <button
          onClick={() => setViewMode('optical')}
          title="Optical Dark GIS Mode"
          className={`p-2 rounded text-xs font-mono flex items-center gap-1.5 transition ${
            viewMode === 'optical'
              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Optical</span>
        </button>

        <button
          onClick={() => setViewMode('thermal')}
          title="Thermal Heatmap View"
          className={`p-2 rounded text-xs font-mono flex items-center gap-1.5 transition ${
            viewMode === 'thermal'
              ? 'bg-amber-950/80 text-amber-300 border border-amber-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Thermal</span>
        </button>

        <button
          onClick={() => setViewMode('forecast')}
          title="AI 60-Minute Forecast Predictive Mode"
          className={`p-2 rounded text-xs font-mono flex items-center gap-1.5 transition ${
            viewMode === 'forecast'
              ? 'bg-purple-950/80 text-purple-300 border border-purple-700 shadow-glow-purple font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AI Forecast</span>
        </button>

        {onToggle3D && (
          <button
            onClick={onToggle3D}
            title="Toggle 2D / 3D Pitch"
            className={`p-2 rounded text-xs font-mono flex items-center gap-1 transition ${
              is3D
                ? 'bg-blue-950/80 text-blue-300 border border-blue-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{is3D ? '3D' : '2D'}</span>
          </button>
        )}
      </div>

      {/* 3. Predictive Forecast Time-Scrubber (When forecast mode active) */}
      {viewMode === 'forecast' && (
        <div className="glass-panel rounded-xl p-3 border border-purple-800/80 shadow-2xl w-64 pointer-events-auto bg-purple-950/20">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              FORECAST HORIZON
            </span>
            <span className="px-1.5 py-0.5 rounded bg-purple-900/60 border border-purple-700 text-purple-200 font-bold">
              +{forecastMinutes} MIN
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="60"
            step="5"
            value={forecastMinutes}
            onChange={(e) => setForecastMinutes(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>LIVE (0m)</span>
            <span>+30m</span>
            <span>+60m</span>
          </div>
        </div>
      )}
    </div>
  );
};
