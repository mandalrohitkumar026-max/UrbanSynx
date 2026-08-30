export type CityId = 'neo-metropolis' | 'singapore' | 'london' | 'dubai' | 'tokyo' | 'new-york';

export interface CityOverview {
  id: CityId;
  name: string;
  country: string;
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  population: number;
  areaKm2: number;
  healthScore: number;
  subsystems: {
    traffic: number;
    water: number;
    energy: number;
    pollution: number;
    infrastructure: number;
    population: number;
  };
  trends: {
    traffic: string;
    trafficDirection: 'up' | 'down' | 'stable';
    water: string;
    waterDirection: 'up' | 'down' | 'stable';
    energy: string;
    energyDirection: 'up' | 'down' | 'stable';
    pollution: string;
    pollutionDirection: 'up' | 'down' | 'stable';
    infrastructure: string;
    infrastructureDirection: 'up' | 'down' | 'stable';
    population: string;
    populationDirection: 'up' | 'down' | 'stable';
  };
  weather: {
    tempC: number;
    condition: string;
    humidity: number;
    windSpeedKmh: number;
    windDirection: string;
    aqi: number;
    inversionLayerRisk: 'Low' | 'Medium' | 'High';
  };
}

export interface RoadSegment {
  id: string;
  name: string;
  type: 'highway' | 'arterial' | 'collector' | 'local';
  coordinates: [number, number][];
  speedKmh: number;
  capacityVehHr: number;
  currentFlowVehHr: number;
  congestionLevel: 'green' | 'yellow' | 'orange' | 'red';
  status: 'free' | 'moderate' | 'congested' | 'severe';
  speedLimitKmh: number;
  incidentCount: number;
}

export interface Building3D {
  id: string;
  name: string;
  type: 'commercial' | 'residential' | 'industrial' | 'government' | 'critical_infra';
  coordinates: [number, number][][];
  heightMeters: number;
  energyConsumptionKw: number;
  waterUsageLpm: number;
  occupancyCount: number;
  healthScore: number;
}

export interface WaterNode {
  id: string;
  name: string;
  type: 'reservoir' | 'pump_station' | 'treatment_plant' | 'junction' | 'storage_tank';
  coordinates: [number, number];
  pressureBar: number;
  targetPressureBar: number;
  flowRateM3h: number;
  purityTdsPpm: number;
  status: 'optimal' | 'warning' | 'critical' | 'maintenance';
  capacityPercent?: number;
}

export interface WaterPipeline {
  id: string;
  fromNode: string;
  toNode: string;
  diameterMm: number;
  material: string;
  coordinates: [number, number][];
  pressureBar: number;
  flowM3h: number;
  leakProbability: number;
  status: 'nominal' | 'leak_suspected' | 'rupture';
}

export interface PowerSubstation {
  id: string;
  name: string;
  type: 'substation_primary' | 'substation_secondary' | 'solar_farm' | 'gas_peaker' | 'battery_bess';
  coordinates: [number, number];
  capacityMw: number;
  currentLoadMw: number;
  voltageKv: number;
  frequencyHz: number;
  temperatureC: number;
  status: 'online' | 'strained' | 'critical' | 'offline';
}

export interface PowerGridLine {
  id: string;
  fromSubstation: string;
  toSubstation: string;
  voltageKv: number;
  coordinates: [number, number][];
  loadPercentage: number;
  status: 'nominal' | 'heavy' | 'overload';
}

export interface AQISensor {
  id: string;
  zone: string;
  coordinates: [number, number];
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  primaryPollutant: string;
  status: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
}

export interface PopulationZone {
  id: string;
  name: string;
  coordinates: [number, number][][];
  densityPerKm2: number;
  currentFootfall: number;
  capacityPercent: number;
  mobilityFlux: 'surging' | 'steady' | 'emptying';
  transitHubLoad: number;
}

export interface Incident {
  id: string;
  title: string;
  type: 'traffic_collision' | 'water_main_break' | 'power_outage' | 'gas_leak' | 'structural_crack' | 'hazmat_spill';
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: [number, number];
  locationName: string;
  reportedAt: string;
  status: 'active' | 'dispatched' | 'contained' | 'resolved';
  assignedUnits: string[];
  impactRadiusMeters: number;
  recommendedAction: string;
  slaMinutesRemaining: number;
}

export interface AIPrediction {
  id: string;
  domain: 'traffic' | 'water' | 'energy' | 'pollution' | 'infrastructure';
  title: string;
  location: string;
  coordinates?: [number, number];
  probabilityPercent: number;
  expectedTimeWindow: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  causes: string[];
  factors: { name: string; impact: number }[];
  recommendedAction: string;
  estimatedImpact: string;
  confidenceScore: number;
  projectedMetrics?: {
    current: string | number;
    predicted: string | number;
    delta: string;
  };
}

export interface SimulationScenario {
  id: string;
  name: string;
  category: 'disaster' | 'infrastructure_failure' | 'weather_extreme' | 'mass_event';
  description: string;
  severity: 'moderate' | 'severe' | 'catastrophic';
  parameters: {
    trafficCapacityReductionPct: number;
    gridCapacityLossMw: number;
    waterPressureLossPct: number;
    aqiSurgePct: number;
    affectedZone: string;
  };
  impactResults: {
    cityHealthScoreDrop: number;
    averageTrafficDelayMin: number;
    powerCustomersAffected: number;
    waterDeficitLiters: number;
    emergencyUnitsNeeded: number;
    economicLossPerHourUsd: number;
    mitigationActions: string[];
  };
}

export interface LayerVisibilityState {
  traffic: boolean;
  roads: boolean;
  buildings: boolean;
  waterNetwork: boolean;
  powerNetwork: boolean;
  pollution: boolean;
  populationDensity: boolean;
  incidents: boolean;
  publicTransport: boolean;
  predictionForecast: boolean;
}

export type ViewMode = 'optical' | 'thermal' | 'inversion' | 'forecast';
export type UserRole = 'Commissioner' | 'Chief Traffic Engineer' | 'Emergency Director' | 'Grid Operator';
