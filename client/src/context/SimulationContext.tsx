import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SimulationScenario } from '../types/city';
import { useCity } from './CityContext';

export interface CustomSimulationInput {
  bridgeClosure: boolean;
  substationOutage: boolean;
  floodLevelMeters: number;
  trafficSurgePct: number;
  powerLoadSurgePct: number;
  weatherCondition: 'clear' | 'heavy_rain' | 'heatwave' | 'fog_inversion';
}

export interface SimulationResult {
  cityHealthScore: number;
  healthDelta: number;
  trafficIndex: number;
  trafficCongestionIncreasePct: number;
  avgCommuteDelayMinutes: number;
  gridStrainPct: number;
  gridPowerDeficitMw: number;
  waterSupplyStressPct: number;
  airQualityIndex: number;
  emergencyUnitsRequired: number;
  economicCostPerHourUsd: number;
  impactSummary: string;
  dynamicRecommendations: string[];
  affectedSubsystems: {
    name: string;
    score: number;
    status: 'optimal' | 'strained' | 'critical';
  }[];
}

interface SimulationContextType {
  simInput: CustomSimulationInput;
  setSimInput: React.Dispatch<React.SetStateAction<CustomSimulationInput>>;
  updateSimInput: (key: keyof CustomSimulationInput, val: any) => void;
  resetSimInput: () => void;
  isRunning: boolean;
  activeScenarioId: string | null;
  loadScenario: (scenario: SimulationScenario) => void;
  runSimulation: () => Promise<void>;
  simResult: SimulationResult | null;
}

const DEFAULT_INPUT: CustomSimulationInput = {
  bridgeClosure: false,
  substationOutage: false,
  floodLevelMeters: 0,
  trafficSurgePct: 0,
  powerLoadSurgePct: 0,
  weatherCondition: 'clear'
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeCityId, city } = useCity();
  const [simInput, setSimInput] = useState<CustomSimulationInput>(DEFAULT_INPUT);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const updateSimInput = (key: keyof CustomSimulationInput, val: any) => {
    setSimInput(prev => ({ ...prev, [key]: val }));
  };

  const resetSimInput = () => {
    setSimInput(DEFAULT_INPUT);
    setActiveScenarioId(null);
    setSimResult(null);
  };

  const loadScenario = (scenario: SimulationScenario) => {
    setActiveScenarioId(scenario.id);
    if (scenario.id === 'scen-bridge-fail') {
      setSimInput({
        bridgeClosure: true,
        substationOutage: false,
        floodLevelMeters: 0,
        trafficSurgePct: 45,
        powerLoadSurgePct: 0,
        weatherCondition: 'clear'
      });
    } else if (scenario.id === 'scen-blackout') {
      setSimInput({
        bridgeClosure: false,
        substationOutage: true,
        floodLevelMeters: 0,
        trafficSurgePct: 20,
        powerLoadSurgePct: 40,
        weatherCondition: 'heatwave'
      });
    } else if (scenario.id === 'scen-flash-flood') {
      setSimInput({
        bridgeClosure: false,
        substationOutage: false,
        floodLevelMeters: 2.2,
        trafficSurgePct: 50,
        powerLoadSurgePct: 15,
        weatherCondition: 'heavy_rain'
      });
    } else if (scenario.id === 'scen-mass-event') {
      setSimInput({
        bridgeClosure: false,
        substationOutage: false,
        floodLevelMeters: 0,
        trafficSurgePct: 65,
        powerLoadSurgePct: 25,
        weatherCondition: 'clear'
      });
    }
  };

  const runSimulation = async () => {
    setIsRunning(true);
    try {
      const res = await fetch(`/api/city/${activeCityId}/simulation/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simInput)
      });
      const data = await res.json();
      if (data.success && data.result) {
        setSimResult(data.result);
      } else {
        // Fallback local solver if offline
        computeLocalSimulation();
      }
    } catch (e) {
      computeLocalSimulation();
    } finally {
      setIsRunning(false);
    }
  };

  const computeLocalSimulation = () => {
    let healthDrop = 0;
    let trafficDelay = 4;
    let trafficStrain = 100 - city.subsystems.traffic;
    let powerDeficit = 0;
    let gridStrain = city.subsystems.energy;
    let waterStress = 100 - city.subsystems.water;
    let aqiValue = city.weather.aqi;
    let emergencyUnits = 4;
    let economicCost = 45000;
    const recommendations: string[] = [];

    if (simInput.bridgeClosure) {
      healthDrop += 14;
      trafficDelay += 38;
      trafficStrain += 45;
      emergencyUnits += 12;
      economicCost += 420000;
      recommendations.push('Enforce Dynamic Route Diversion through Marina Expressway & inland bypass arteries');
      recommendations.push('Synchronize adaptive green-light wave on secondary arterial intersections');
    }

    if (simInput.substationOutage) {
      healthDrop += 28;
      powerDeficit += 1400;
      gridStrain = Math.max(20, gridStrain - 45);
      trafficDelay += 18;
      waterStress += 35;
      emergencyUnits += 24;
      economicCost += 1850000;
      recommendations.push('Immediate islanding of Hospital & Critical Quantum Infrastructure microgrids');
      recommendations.push('Discharge 400MWh District BESS storage to stabilize 230kV transmission corridor');
    }

    if (simInput.floodLevelMeters > 0) {
      const floodFactor = simInput.floodLevelMeters;
      healthDrop += floodFactor * 12;
      trafficDelay += floodFactor * 22;
      waterStress += floodFactor * 18;
      aqiValue = Math.max(20, aqiValue - (floodFactor * 15));
      emergencyUnits += Math.round(floodFactor * 14);
      economicCost += floodFactor * 750000;
      recommendations.push(`Activate Marina Barrage flood gates (Level ${floodFactor.toFixed(1)}m discharge mode)`);
      recommendations.push('Deploy automated submersible storm pumps along low-lying tunnel approaches');
    }

    if (simInput.trafficSurgePct > 0) {
      const factor = simInput.trafficSurgePct / 100;
      trafficDelay += factor * 25;
      trafficStrain = Math.min(99, trafficStrain + (factor * 35));
      aqiValue += factor * 25;
      economicCost += factor * 200000;
    }

    if (simInput.powerLoadSurgePct > 0) {
      const factor = simInput.powerLoadSurgePct / 100;
      gridStrain = Math.max(30, gridStrain - (factor * 25));
    }

    const calculatedHealth = Math.max(12, Math.min(100, Math.round(city.healthScore - healthDrop)));
    const actualHealthDelta = calculatedHealth - city.healthScore;

    setSimResult({
      cityHealthScore: calculatedHealth,
      healthDelta: actualHealthDelta,
      trafficIndex: Math.min(98, Math.round(trafficStrain)),
      trafficCongestionIncreasePct: Math.round(trafficDelay * 1.8),
      avgCommuteDelayMinutes: Math.round(trafficDelay),
      gridStrainPct: Math.round(100 - gridStrain),
      gridPowerDeficitMw: powerDeficit,
      waterSupplyStressPct: Math.min(95, Math.round(waterStress)),
      airQualityIndex: Math.round(aqiValue),
      emergencyUnitsRequired: emergencyUnits,
      economicCostPerHourUsd: Math.round(economicCost),
      impactSummary: healthDrop > 25
        ? 'CRITICAL DISRUPTION: Cascading multi-utility failures detected across urban core.'
        : 'ELEVATED STRESS: Autonomous mitigation playbooks initiated.',
      dynamicRecommendations: recommendations.length > 0 ? recommendations : ['Standard operating posture maintained.'],
      affectedSubsystems: [
        { name: 'Traffic Network', score: Math.max(15, 100 - Math.round(trafficStrain)), status: trafficStrain > 75 ? 'critical' : 'strained' },
        { name: 'Electrical Grid', score: Math.max(10, Math.round(gridStrain)), status: gridStrain < 50 ? 'critical' : 'optimal' },
        { name: 'Hydraulic Water', score: Math.max(20, 100 - Math.round(waterStress)), status: waterStress > 60 ? 'critical' : 'optimal' },
        { name: 'Atmospheric AQI', score: Math.max(20, 100 - Math.round(aqiValue / 2)), status: aqiValue > 150 ? 'critical' : 'optimal' }
      ]
    });
  };

  return (
    <SimulationContext.Provider
      value={{
        simInput,
        setSimInput,
        updateSimInput,
        resetSimInput,
        isRunning,
        activeScenarioId,
        loadScenario,
        runSimulation,
        simResult
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error('useSimulation must be used within a SimulationProvider');
  return context;
};
