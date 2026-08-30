import React, { useState, useEffect } from 'react';
import { useCity } from '../../context/CityContext';
import { CityId, UserRole } from '../../types/city';
import {
  Globe,
  Activity,
  Bell,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  Sliders,
  Shield,
  ChevronDown,
  User,
  Radio,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';
import { LivePulse } from '../common/LivePulse';

interface TopNavProps {
  onOpenSearch: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenSearch }) => {
  const {
    activeCityId,
    setActiveCityId,
    city,
    isSimulationMode,
    setIsSimulationMode,
    userRole,
    setUserRole,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    liveTelemetry
  } = useCity();

  const [timeString, setTimeString] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState<boolean>(false);
  const [showHealthModal, setShowHealthModal] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const citiesList: { id: CityId; label: string; country: string }[] = [
    { id: 'neo-metropolis', label: 'Neo-Metropolis Central', country: 'Smart Urban District' },
    { id: 'singapore', label: 'Singapore Smart Core', country: 'Singapore' },
    { id: 'london', label: 'Greater London Metropolitan', country: 'United Kingdom' },
    { id: 'dubai', label: 'Dubai Digital Waterfront', country: 'UAE' },
    { id: 'tokyo', label: 'Tokyo Autonomous Megapolis', country: 'Japan' },
    { id: 'new-york', label: 'New York City Metropolitan', country: 'USA' },
  ];

  const roles: UserRole[] = [
    'Commissioner',
    'Chief Traffic Engineer',
    'Emergency Director',
    'Grid Operator'
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-14 border-b border-slate-800 bg-[#070a0f]/95 backdrop-blur-md px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: City Selector & Live/Sim Switcher */}
      <div className="flex items-center gap-3">
        {/* City Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCityDropdown(!showCityDropdown);
              setShowRoleDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/90 border border-slate-700/70 hover:border-cyan-500/60 transition-colors text-xs font-mono text-slate-200"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white tracking-wide">{city.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {showCityDropdown && (
            <div className="absolute left-0 mt-1 w-64 rounded-lg bg-slate-900/95 border border-slate-700 shadow-2xl p-1 z-50">
              <div className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800">
                Select Active Digital Twin Metro
              </div>
              {citiesList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCityId(c.id);
                    setShowCityDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono flex items-center justify-between hover:bg-slate-800 transition ${
                    activeCityId === c.id ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40' : 'text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-medium text-white">{c.label}</div>
                    <div className="text-[10px] text-slate-400">{c.country}</div>
                  </div>
                  {activeCityId === c.id && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live vs. Simulation Mode Switch */}
        <div className="flex items-center bg-slate-900/90 rounded border border-slate-700/70 p-0.5 text-xs font-mono">
          <button
            onClick={() => setIsSimulationMode(false)}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition ${
              !isSimulationMode
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className={`w-3 h-3 ${!isSimulationMode ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            <span>LIVE TWIN</span>
          </button>
          <button
            onClick={() => setIsSimulationMode(true)}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition ${
              isSimulationMode
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold shadow-glow-purple'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${isSimulationMode ? 'text-purple-400' : 'text-slate-500'}`} />
            <span>SIMULATION</span>
          </button>
        </div>
      </div>

      {/* Center: Search & Freshness Telemetry */}
      <div className="hidden md:flex items-center gap-4">
        {/* Global Search Bar */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 w-72 justify-between group transition"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span className="text-slate-400 text-[11px]">Search sensors, assets, roads...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Data Freshness Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900/80 px-3 py-1 rounded border border-slate-800">
          <LivePulse color={isSimulationMode ? 'purple' : 'emerald'} label={isSimulationMode ? 'SIMULATING' : 'SYNCED'} size="sm" />
          <span className="text-slate-400 text-[11px] border-l border-slate-800 pl-2">
            {timeString}
          </span>
          <span className="text-cyan-400 text-[10px] bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-800/30">
            {liveTelemetry.telemetryFreshnessMs}ms latency
          </span>
        </div>
      </div>

      {/* Right: Health Indicator, Notification Center, User Profile */}
      <div className="flex items-center gap-2.5">
        {/* System Health Badge */}
        <div className="relative">
          <button
            onClick={() => setShowHealthModal(!showHealthModal)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-emerald-900/60 text-emerald-400 hover:border-emerald-500 text-xs font-mono transition"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline font-semibold">99.98% ONLINE</span>
          </button>

          {showHealthModal && (
            <div className="absolute right-0 mt-2 w-72 rounded-lg bg-slate-900/95 border border-slate-700 shadow-2xl p-4 z-50 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                <span className="font-bold text-white uppercase">System Health Telemetry</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">NOMINAL</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">GIS Engine Latency:</span>
                  <span className="text-white font-bold">{liveTelemetry.telemetryFreshnessMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IoT Ingestion Stream:</span>
                  <span className="text-emerald-400 font-bold">14,280 msgs/sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Digital Twin Fidelity:</span>
                  <span className="text-cyan-400 font-bold">High Precision (LOD 3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Node Clusters:</span>
                  <span className="text-white font-bold">8 Dedicated Nodes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowCityDropdown(false);
              setShowRoleDropdown(false);
            }}
            className="p-2 rounded bg-slate-900/90 border border-slate-700 hover:border-slate-500 relative transition"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 shadow-glow-red animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-slate-900/95 border border-slate-700 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-xs font-mono font-bold text-white uppercase">
                  Incident & Forecast Stream
                </span>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[10px] font-mono text-slate-400 hover:text-white"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs font-mono text-slate-500">
                    No active incident alerts
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded border text-xs cursor-pointer transition ${
                        n.severity === 'critical'
                          ? 'bg-rose-950/30 border-rose-900/50 hover:bg-rose-900/40'
                          : n.severity === 'warning'
                          ? 'bg-amber-950/30 border-amber-900/50 hover:bg-amber-900/40'
                          : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-mono text-[11px] font-bold ${
                          n.severity === 'critical' ? 'text-rose-400' : n.severity === 'warning' ? 'text-amber-400' : 'text-cyan-400'
                        }`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowCityDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-slate-900/90 border border-slate-700/70 hover:border-slate-500 text-xs font-mono transition text-slate-200"
          >
            <div className="w-5 h-5 rounded bg-cyan-950 border border-cyan-700 flex items-center justify-center text-[10px] font-bold text-cyan-300">
              {userRole.charAt(0)}
            </div>
            <span className="hidden sm:inline text-white font-medium">{userRole}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-slate-900/95 border border-slate-700 shadow-2xl p-1 z-50">
              <div className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800">
                Switch Operational Role
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setUserRole(r);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono flex items-center justify-between hover:bg-slate-800 transition ${
                    userRole === r ? 'bg-cyan-950/60 text-cyan-300 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>{r}</span>
                  {userRole === r && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
