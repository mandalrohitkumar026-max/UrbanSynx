import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import {
  Search,
  Car,
  Droplet,
  Zap,
  Wind,
  Building2,
  AlertTriangle,
  Brain,
  Sliders,
  X,
  ChevronRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { setInspectedAsset } = useCity();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { title: 'Central Business Arterial (CBD Corridor)', category: 'Traffic Corridor', path: '/traffic', icon: Car, type: 'asset' },
    { title: 'Marina Boulevard Express', category: 'Highway Corridor', path: '/traffic', icon: Car, type: 'asset' },
    { title: 'Marina Reservoir Master Station', category: 'Water Station', path: '/water', icon: Droplet, type: 'asset' },
    { title: 'CBD Booster Pump Station 04', category: 'Water Node', path: '/water', icon: Droplet, type: 'asset' },
    { title: 'Bay Area 400kV Substation Alpha', category: 'Power Grid', path: '/energy', icon: Zap, type: 'asset' },
    { title: 'Southern Offshore Floating Solar Array', category: 'Renewable Generation', path: '/energy', icon: Zap, type: 'asset' },
    { title: 'Industrial Corridor AQI Station', category: 'Pollution Monitor', path: '/pollution', icon: Wind, type: 'asset' },
    { title: 'Marina Viaduct Cable-Stay Bridge', category: 'Structural Asset', path: '/infrastructure', icon: Building2, type: 'asset' },
    { title: 'Traffic Bottleneck Collision (Incident #0941)', category: 'Active Incident', path: '/incidents', icon: AlertTriangle, type: 'incident' },
    { title: 'CBD Traffic Forecast (AI Forecast Engine)', category: 'AI Prediction', path: '/predictions', icon: Brain, type: 'ai' },
    { title: 'Simulate Bridge Closure & Evacuation Sandbox', category: 'Simulation Sandbox', path: '/simulation', icon: Sliders, type: 'action' },
  ];

  const filtered = items.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof items[0]) => {
    navigate(item.path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 gap-3">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, asset name, incident, or telemetry sensor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 text-sm font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono">
              No matching assets or operations found
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between hover:bg-slate-800/80 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white font-sans text-xs">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Navigate with <b>Tab / Enter</b></span>
          <span><b>Esc</b> to exit</span>
        </div>
      </div>
    </div>
  );
};
