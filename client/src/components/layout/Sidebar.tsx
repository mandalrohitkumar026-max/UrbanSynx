import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  Car,
  Droplet,
  Zap,
  Wind,
  Users,
  Building2,
  Brain,
  Sliders,
  AlertOctagon,
  BarChart3,
  Settings,
  Database,
  Radio,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { useCity } from '../../context/CityContext';

export const Sidebar: React.FC = () => {
  const { city } = useCity();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Digital Twin', path: '/digital-twin', icon: Box, badge: '3D GIS' },
    { name: 'Traffic', path: '/traffic', icon: Car },
    { name: 'Water', path: '/water', icon: Droplet },
    { name: 'Energy', path: '/energy', icon: Zap },
    { name: 'Pollution', path: '/pollution', icon: Wind },
    { name: 'Population', path: '/population', icon: Users },
    { name: 'Infrastructure', path: '/infrastructure', icon: Building2 },
    { name: 'AI Predictions', path: '/predictions', icon: Brain, badge: 'AI-9' },
    { name: 'Simulation', path: '/simulation', icon: Sliders, badge: 'SANDBOX' },
    { name: 'Incidents', path: '/incidents', icon: AlertOctagon, alert: true },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-60 bg-[#070a0f] border-r border-slate-800 flex flex-col justify-between select-none z-20 h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="h-14 px-4 border-b border-slate-800 flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-glow-cyan">
              <Box className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -inset-0.5 rounded-lg bg-cyan-400 opacity-20 blur-sm animate-pulse"></div>
          </div>
          <div>
            <div className="font-extrabold text-sm font-mono tracking-wider text-white flex items-center gap-1.5">
              CITYPULSE <span className="text-cyan-400 font-normal">TWIN</span>
            </div>
            <div className="text-[9px] uppercase font-mono tracking-widest text-slate-400">
              Urban Intelligence v2.8
            </div>
          </div>
        </div>

        {/* Primary Navigation Routes */}
        <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-210px)]">
          <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-400">
            Mission Control
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 text-cyan-300 border border-cyan-700/50 shadow-glow-cyan font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-cyan-400'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                          isActive
                            ? 'bg-cyan-900 text-cyan-200'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {item.alert && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shadow-glow-red animate-pulse"></span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Utility Deck */}
      <div className="p-2 border-t border-slate-800/80 bg-slate-950/60 space-y-1">
        <div className="px-3 py-1 text-[9px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
          <span>Telemetry Deck</span>
          <span className="text-emerald-400 flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE
          </span>
        </div>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-mono transition ${
              isActive
                ? 'bg-cyan-950/50 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`
          }
        >
          <Settings className="w-3.5 h-3.5" />
          <span>System Settings</span>
        </NavLink>

        <div className="px-3 py-1.5 rounded-md bg-slate-900/40 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px]">Data Ingestion</span>
          </div>
          <span className="text-white text-[10px] font-bold">14.2k/s</span>
        </div>
      </div>
    </aside>
  );
};
