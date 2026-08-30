import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import { SimulationProvider } from './context/SimulationContext';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';
import { RightStatusPanel } from './components/layout/RightStatusPanel';
import { CommandPalette } from './components/layout/CommandPalette';

import { DashboardPage } from './pages/DashboardPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { TrafficPage } from './pages/TrafficPage';
import { WaterPage } from './pages/WaterPage';
import { EnergyPage } from './pages/EnergyPage';
import { PollutionPage } from './pages/PollutionPage';
import { PopulationPage } from './pages/PopulationPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { SimulationPage } from './pages/SimulationPage';
import { PredictionsPage } from './pages/PredictionsPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <BrowserRouter>
      <CityProvider>
        <SimulationProvider>
          <div className="flex h-screen w-screen overflow-hidden bg-[#070a0f] text-slate-100 font-sans">
            {/* Left Navigation Rail */}
            <Sidebar />

            {/* Main Application Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
              {/* Top Command Bar */}
              <TopNav onOpenSearch={() => setIsCommandPaletteOpen(true)} />

              {/* Center Work Area + Right Status Dock */}
              <div className="flex-1 flex overflow-hidden">
                {/* Center Main Viewport */}
                <main className="flex-1 overflow-y-auto bg-command-grid relative">
                  <Routes>
                    <Route path="/" element={<Navigate to="/digital-twin" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/digital-twin" element={<DigitalTwinPage />} />
                    <Route path="/traffic" element={<TrafficPage />} />
                    <Route path="/water" element={<WaterPage />} />
                    <Route path="/energy" element={<EnergyPage />} />
                    <Route path="/pollution" element={<PollutionPage />} />
                    <Route path="/population" element={<PopulationPage />} />
                    <Route path="/infrastructure" element={<InfrastructurePage />} />
                    <Route path="/simulation" element={<SimulationPage />} />
                    <Route path="/predictions" element={<PredictionsPage />} />
                    <Route path="/incidents" element={<IncidentsPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/digital-twin" replace />} />
                  </Routes>
                </main>

                {/* Right Operational Status Panel (Digital Twin Status) */}
                <RightStatusPanel />
              </div>
            </div>

            {/* Universal Search Command Palette */}
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
            />
          </div>
        </SimulationProvider>
      </CityProvider>
    </BrowserRouter>
  );
};

export default App;
