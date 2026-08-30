import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CityId,
  CityOverview,
  LayerVisibilityState,
  ViewMode,
  UserRole,
  RoadSegment,
  Building3D,
  WaterNode,
  WaterPipeline,
  PowerSubstation,
  PowerGridLine,
  AQISensor,
  PopulationZone,
  Incident,
  AIPrediction
} from '../types/city';

interface TelemetryUpdateData {
  healthScore: number;
  subsystems: {
    traffic: number;
    water: number;
    energy: number;
    pollution: number;
    infrastructure: number;
    population: number;
  };
  powerDemandGw: string;
  gridFrequencyHz: string;
  waterPressureBar: string;
  trafficAvgSpeedKmh: number;
  activeIncidentsCount: number;
  telemetryFreshnessMs: number;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  severity: 'info' | 'warning' | 'critical';
  unread: boolean;
}

interface CityContextType {
  activeCityId: CityId;
  setActiveCityId: (id: CityId) => void;
  city: CityOverview;
  isSimulationMode: boolean;
  setIsSimulationMode: (val: boolean) => void;
  layers: LayerVisibilityState;
  toggleLayer: (layerName: keyof LayerVisibilityState) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  forecastMinutes: number; // 0 (live) to 60 (prediction)
  setForecastMinutes: (mins: number) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  inspectedAsset: any | null;
  setInspectedAsset: (asset: any | null) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  liveTelemetry: TelemetryUpdateData;
  gisLayers: {
    roads: RoadSegment[];
    buildings: Building3D[];
    waterNodes: WaterNode[];
    waterPipelines: WaterPipeline[];
    powerSubstations: PowerSubstation[];
    powerGridLines: PowerGridLine[];
    aqiSensors: AQISensor[];
    populationZones: PopulationZone[];
    incidents: Incident[];
  };
  predictions: AIPrediction[];
  executePredictionAction: (predId: string) => Promise<boolean>;
  dispatchIncidentUnit: (incId: string, unitName: string) => Promise<boolean>;
  resolveIncident: (incId: string) => Promise<boolean>;
}

// Fallback initial city data
const INITIAL_CITIES: Record<CityId, CityOverview> = {
  'neo-metropolis': {
    id: 'neo-metropolis',
    name: 'Neo-Metropolis Central',
    country: 'Smart Urban District',
    center: [103.851959, 1.290270],
    zoom: 14.5,
    pitch: 58,
    bearing: -22,
    population: 3450000,
    areaKm2: 728.6,
    healthScore: 87,
    subsystems: {
      traffic: 72,
      water: 94,
      energy: 91,
      pollution: 68,
      infrastructure: 89,
      population: 76,
    },
    trends: {
      traffic: '+12% congestion',
      trafficDirection: 'up',
      water: 'Nominal pressure 4.2 bar',
      waterDirection: 'stable',
      energy: '+14% peak demand',
      energyDirection: 'up',
      pollution: '-8% PM2.5 (improving)',
      pollutionDirection: 'down',
      infrastructure: '2 vibration alerts',
      infrastructureDirection: 'down',
      population: 'High transit density',
      populationDirection: 'up',
    },
    weather: {
      tempC: 28.5,
      condition: 'Clear Radar',
      humidity: 74,
      windSpeedKmh: 14.2,
      windDirection: 'ENE',
      aqi: 68,
      inversionLayerRisk: 'Low',
    }
  },
  'singapore': {
    id: 'singapore',
    name: 'Singapore Smart Core',
    country: 'Singapore',
    center: [103.851959, 1.290270],
    zoom: 14.8,
    pitch: 60,
    bearing: -18,
    population: 5920000,
    areaKm2: 734.3,
    healthScore: 92,
    subsystems: {
      traffic: 84,
      water: 98,
      energy: 95,
      pollution: 89,
      infrastructure: 96,
      population: 88,
    },
    trends: {
      traffic: '-3% congestion',
      trafficDirection: 'down',
      water: 'Water loop 99.8% recovery',
      waterDirection: 'stable',
      energy: 'Solar peak 1.8 GW',
      energyDirection: 'up',
      pollution: 'AQI 32 (Good)',
      pollutionDirection: 'down',
      infrastructure: 'Predictive maintenance active',
      infrastructureDirection: 'stable',
      population: 'MRT load 79%',
      populationDirection: 'stable',
    },
    weather: {
      tempC: 29.8,
      condition: 'Partly Cloudy',
      humidity: 80,
      windSpeedKmh: 11.5,
      windDirection: 'NE',
      aqi: 32,
      inversionLayerRisk: 'Low',
    }
  },
  'london': {
    id: 'london',
    name: 'Greater London Metropolitan',
    country: 'United Kingdom',
    center: [-0.1276, 51.5074],
    zoom: 14.2,
    pitch: 55,
    bearing: 15,
    population: 8982000,
    areaKm2: 1572.0,
    healthScore: 81,
    subsystems: {
      traffic: 65,
      water: 88,
      energy: 84,
      pollution: 71,
      infrastructure: 82,
      population: 79,
    },
    trends: {
      traffic: '+18% rush hour delays',
      trafficDirection: 'up',
      water: 'Thames basin nominal',
      waterDirection: 'stable',
      energy: 'Grid strain 87%',
      energyDirection: 'up',
      pollution: 'ULEZ zone compliant',
      pollutionDirection: 'down',
      infrastructure: 'Bridge sensor warning',
      infrastructureDirection: 'down',
      population: 'Tube ridership peak',
      populationDirection: 'up',
    },
    weather: {
      tempC: 16.2,
      condition: 'Overcast Radar',
      humidity: 68,
      windSpeedKmh: 19.4,
      windDirection: 'SW',
      aqi: 54,
      inversionLayerRisk: 'Medium',
    }
  },
  'dubai': {
    id: 'dubai',
    name: 'Dubai Digital Waterfront',
    country: 'UAE',
    center: [55.2708, 25.2048],
    zoom: 14.0,
    pitch: 62,
    bearing: -45,
    population: 3600000,
    areaKm2: 4114.0,
    healthScore: 89,
    subsystems: {
      traffic: 78,
      water: 91,
      energy: 94,
      pollution: 74,
      infrastructure: 95,
      population: 82,
    },
    trends: {
      traffic: '+8% Sheikh Zayed Rd',
      trafficDirection: 'up',
      water: 'Desalination plant 96%',
      waterDirection: 'stable',
      energy: 'Cooling demand 4.6 GW',
      energyDirection: 'up',
      pollution: 'PM10 dust warning',
      pollutionDirection: 'up',
      infrastructure: 'Autonomous transit active',
      infrastructureDirection: 'stable',
      population: 'Mall corridor surge',
      populationDirection: 'up',
    },
    weather: {
      tempC: 36.4,
      condition: 'Haze / Thermal Inversion',
      humidity: 42,
      windSpeedKmh: 16.0,
      windDirection: 'NW',
      aqi: 88,
      inversionLayerRisk: 'High',
    }
  },
  'tokyo': {
    id: 'tokyo',
    name: 'Tokyo Autonomous Megapolis',
    country: 'Japan',
    center: [139.6917, 35.6895],
    zoom: 14.6,
    pitch: 60,
    bearing: 30,
    population: 14100000,
    areaKm2: 2194.0,
    healthScore: 94,
    subsystems: {
      traffic: 89,
      water: 97,
      energy: 93,
      pollution: 91,
      infrastructure: 98,
      population: 92,
    },
    trends: {
      traffic: 'Dynamic signal sync 99%',
      trafficDirection: 'stable',
      water: 'Hydraulic loss <1.8%',
      waterDirection: 'down',
      energy: 'Nuclear/Solar balance optimal',
      energyDirection: 'stable',
      pollution: 'AQI 24 (Excellent)',
      pollutionDirection: 'down',
      infrastructure: 'Seismic dampers active',
      infrastructureDirection: 'stable',
      population: 'Shinjuku station flow smooth',
      populationDirection: 'stable',
    },
    weather: {
      tempC: 22.0,
      condition: 'Clear Night Mode',
      humidity: 55,
      windSpeedKmh: 9.8,
      windDirection: 'S',
      aqi: 24,
      inversionLayerRisk: 'Low',
    }
  },
  'new-york': {
    id: 'new-york',
    name: 'New York City Metropolitan',
    country: 'USA',
    center: [-73.9851, 40.7484],
    zoom: 14.5,
    pitch: 58,
    bearing: 28,
    population: 8336000,
    areaKm2: 783.8,
    healthScore: 80,
    subsystems: {
      traffic: 62,
      water: 87,
      energy: 83,
      pollution: 70,
      infrastructure: 79,
      population: 85,
    },
    trends: {
      traffic: '+22% Midtown congestion',
      trafficDirection: 'up',
      water: 'Water tunnel 3 nominal',
      waterDirection: 'stable',
      energy: 'Transformer load high',
      energyDirection: 'up',
      pollution: 'Ozone alert in effect',
      pollutionDirection: 'up',
      infrastructure: 'Tunnel maintenance in progress',
      infrastructureDirection: 'down',
      population: 'Times Sq dense footfall',
      populationDirection: 'up',
    },
    weather: {
      tempC: 24.1,
      condition: 'Thermal Radar',
      humidity: 62,
      windSpeedKmh: 18.2,
      windDirection: 'WNW',
      aqi: 72,
      inversionLayerRisk: 'Medium',
    }
  }
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCityId, setActiveCityId] = useState<CityId>('neo-metropolis');
  const [city, setCity] = useState<CityOverview>(INITIAL_CITIES['neo-metropolis']);
  const [isSimulationMode, setIsSimulationMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('optical');
  const [forecastMinutes, setForecastMinutes] = useState<number>(0);
  const [userRole, setUserRole] = useState<UserRole>('Commissioner');
  const [inspectedAsset, setInspectedAsset] = useState<any | null>(null);

  const [layers, setLayers] = useState<LayerVisibilityState>({
    traffic: true,
    roads: true,
    buildings: true,
    waterNetwork: true,
    powerNetwork: true,
    pollution: true,
    populationDensity: true,
    incidents: true,
    publicTransport: true,
    predictionForecast: false,
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'CRITICAL: Water Main Anomaly',
      message: 'Pressure drop detected in North Pipeline Sector 3-B (3.2 bar vs target 4.5 bar).',
      time: '2m ago',
      severity: 'critical',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'TRAFFIC FORECAST: Congestion Alert',
      message: 'CBD Arterial bottleneck expected in 15 mins (87% confidence).',
      time: '6m ago',
      severity: 'warning',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'ENERGY PEAK FORECAST',
      message: 'Forecast peak load of 4.8 GW projected at 19:30 UTC.',
      time: '14m ago',
      severity: 'info',
      unread: false,
    },
  ]);

  const [liveTelemetry, setLiveTelemetry] = useState<TelemetryUpdateData>({
    healthScore: 87,
    subsystems: {
      traffic: 72,
      water: 94,
      energy: 91,
      pollution: 68,
      infrastructure: 89,
      population: 76,
    },
    powerDemandGw: '4.12',
    gridFrequencyHz: '50.012',
    waterPressureBar: '4.20',
    trafficAvgSpeedKmh: 48,
    activeIncidentsCount: 4,
    telemetryFreshnessMs: 24
  });

  const [gisLayers, setGisLayers] = useState<any>({
    roads: [],
    buildings: [],
    waterNodes: [],
    waterPipelines: [],
    powerSubstations: [],
    powerGridLines: [],
    aqiSensors: [],
    populationZones: [],
    incidents: [],
  });

  const [predictions, setPredictions] = useState<AIPrediction[]>([]);

  const toggleLayer = (layerName: keyof LayerVisibilityState) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Fetch initial city data & GIS layers
  useEffect(() => {
    setCity(INITIAL_CITIES[activeCityId] || INITIAL_CITIES['neo-metropolis']);

    // Attempt to fetch from API
    fetch(`/api/city/${activeCityId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.city) {
          setCity(data.city);
        }
      })
      .catch(() => {});

    fetch(`/api/city/${activeCityId}/layers`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.layers) {
          setGisLayers(data.layers);
        }
      })
      .catch(() => {});

    fetch(`/api/city/${activeCityId}/predictions`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.predictions) {
          setPredictions(data.predictions);
        }
      })
      .catch(() => {});
  }, [activeCityId]);

  // Live simulation tick (simulating WebSocket telemetry)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTelemetry(prev => {
        const jitter = (Math.random() - 0.5) * 0.8;
        const trafficJitter = (Math.random() - 0.48) * 1.5;
        const energyJitter = (Math.random() - 0.5) * 1.2;

        return {
          healthScore: Math.round(Math.min(100, Math.max(70, (city?.healthScore || 87) + jitter))),
          subsystems: {
            traffic: Math.round(Math.min(99, Math.max(50, prev.subsystems.traffic + trafficJitter))),
            water: Math.round(Math.min(99, Math.max(75, prev.subsystems.water + (jitter * 0.4)))),
            energy: Math.round(Math.min(99, Math.max(65, prev.subsystems.energy + energyJitter))),
            pollution: Math.round(Math.min(99, Math.max(50, prev.subsystems.pollution))),
            infrastructure: prev.subsystems.infrastructure,
            population: Math.round(Math.min(95, Math.max(60, prev.subsystems.population + (jitter * 0.5)))),
          },
          powerDemandGw: (4.1 + (Math.random() * 0.15)).toFixed(2),
          gridFrequencyHz: (50.00 + (Math.random() - 0.5) * 0.03).toFixed(3),
          waterPressureBar: (4.2 + (Math.random() - 0.5) * 0.08).toFixed(2),
          trafficAvgSpeedKmh: Math.round(48 + (Math.random() - 0.5) * 4),
          activeIncidentsCount: 4,
          telemetryFreshnessMs: Math.round(16 + Math.random() * 12)
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [city]);

  const executePredictionAction = async (predId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/city/${activeCityId}/predictions/${predId}/execute`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => [
          {
            id: `exec-${Date.now()}`,
            title: 'AI Playbook Executed',
            message: data.actionTaken,
            time: 'Just now',
            severity: 'info',
            unread: true
          },
          ...prev
        ]);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const dispatchIncidentUnit = async (incId: string, unitName: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/city/${activeCityId}/incidents/${incId}/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitName })
      });
      const data = await res.json();
      if (data.success) {
        setGisLayers((prev: any) => ({
          ...prev,
          incidents: prev.incidents.map((inc: Incident) =>
            inc.id === incId ? { ...inc, status: 'dispatched', assignedUnits: [...inc.assignedUnits, unitName] } : inc
          )
        }));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const resolveIncident = async (incId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/city/${activeCityId}/incidents/${incId}/resolve`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setGisLayers((prev: any) => ({
          ...prev,
          incidents: prev.incidents.map((inc: Incident) =>
            inc.id === incId ? { ...inc, status: 'resolved' } : inc
          )
        }));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  return (
    <CityContext.Provider
      value={{
        activeCityId,
        setActiveCityId,
        city,
        isSimulationMode,
        setIsSimulationMode,
        layers,
        toggleLayer,
        viewMode,
        setViewMode,
        forecastMinutes,
        setForecastMinutes,
        userRole,
        setUserRole,
        inspectedAsset,
        setInspectedAsset,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        liveTelemetry,
        gisLayers,
        predictions,
        executePredictionAction,
        dispatchIncidentUnit,
        resolveIncident
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) throw new Error('useCity must be used within a CityProvider');
  return context;
};
