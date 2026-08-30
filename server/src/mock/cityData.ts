import { CityOverview, RoadSegment, Building3D, WaterNode, WaterPipeline, PowerSubstation, PowerGridLine, AQISensor, PopulationZone, Incident, AIPrediction, SimulationScenario } from '../types.js';

export const CITIES: Record<string, CityOverview> = {
  'neo-metropolis': {
    id: 'neo-metropolis',
    name: 'Neo-Metropolis Central',
    country: 'Smart Urban District',
    center: [103.851959, 1.290270], // Marina Bay / Downtown coordinates
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

// Procedural vector geometries centered around default Neo-Metropolis / Marina Bay area
const centerLng = 103.851959;
const centerLat = 1.290270;

export const ROADS_DATA: RoadSegment[] = [
  {
    id: 'road-art-1',
    name: 'Marina Boulevard Express',
    type: 'highway',
    coordinates: [
      [centerLng - 0.025, centerLat - 0.015],
      [centerLng - 0.012, centerLat - 0.008],
      [centerLng + 0.002, centerLat - 0.002],
      [centerLng + 0.018, centerLat + 0.005],
      [centerLng + 0.032, centerLat + 0.012]
    ],
    speedKmh: 72,
    capacityVehHr: 4200,
    currentFlowVehHr: 3950,
    congestionLevel: 'orange',
    status: 'congested',
    speedLimitKmh: 80,
    incidentCount: 1
  },
  {
    id: 'road-art-2',
    name: 'Central Business Arterial (CBD Corridor)',
    type: 'arterial',
    coordinates: [
      [centerLng - 0.015, centerLat + 0.022],
      [centerLng - 0.008, centerLat + 0.010],
      [centerLng + 0.000, centerLat - 0.001],
      [centerLng + 0.008, centerLat - 0.014],
      [centerLng + 0.014, centerLat - 0.025]
    ],
    speedKmh: 24,
    capacityVehHr: 3200,
    currentFlowVehHr: 3100,
    congestionLevel: 'red',
    status: 'severe',
    speedLimitKmh: 50,
    incidentCount: 2
  },
  {
    id: 'road-art-3',
    name: 'Coastal Bay Viaduct',
    type: 'highway',
    coordinates: [
      [centerLng - 0.035, centerLat + 0.005],
      [centerLng - 0.018, centerLat + 0.018],
      [centerLng + 0.005, centerLat + 0.025],
      [centerLng + 0.025, centerLat + 0.020],
      [centerLng + 0.040, centerLat + 0.008]
    ],
    speedKmh: 68,
    capacityVehHr: 4500,
    currentFlowVehHr: 2800,
    congestionLevel: 'green',
    status: 'free',
    speedLimitKmh: 90,
    incidentCount: 0
  },
  {
    id: 'road-art-4',
    name: 'Raffles Tech Avenue',
    type: 'arterial',
    coordinates: [
      [centerLng - 0.020, centerLat - 0.005],
      [centerLng - 0.005, centerLat - 0.002],
      [centerLng + 0.010, centerLat + 0.001],
      [centerLng + 0.022, centerLat + 0.006]
    ],
    speedKmh: 45,
    capacityVehHr: 2800,
    currentFlowVehHr: 2100,
    congestionLevel: 'yellow',
    status: 'moderate',
    speedLimitKmh: 60,
    incidentCount: 0
  },
  {
    id: 'road-art-5',
    name: 'Industrial Port Connector',
    type: 'highway',
    coordinates: [
      [centerLng - 0.030, centerLat - 0.028],
      [centerLng - 0.015, centerLat - 0.020],
      [centerLng - 0.002, centerLat - 0.015],
      [centerLng + 0.015, centerLat - 0.010]
    ],
    speedKmh: 55,
    capacityVehHr: 3600,
    currentFlowVehHr: 2900,
    congestionLevel: 'yellow',
    status: 'moderate',
    speedLimitKmh: 70,
    incidentCount: 1
  },
  {
    id: 'road-art-6',
    name: 'North-South Tunnel Underpass',
    type: 'arterial',
    coordinates: [
      [centerLng + 0.005, centerLat + 0.030],
      [centerLng + 0.003, centerLat + 0.015],
      [centerLng + 0.002, centerLat - 0.005],
      [centerLng + 0.001, centerLat - 0.020]
    ],
    speedKmh: 32,
    capacityVehHr: 3000,
    currentFlowVehHr: 2650,
    congestionLevel: 'orange',
    status: 'congested',
    speedLimitKmh: 50,
    incidentCount: 0
  }
];

export const BUILDINGS_DATA: Building3D[] = [
  {
    id: 'bld-tower-1',
    name: 'CityPulse Twin Command Hub & Tower',
    type: 'critical_infra',
    coordinates: [
      [
        [centerLng - 0.003, centerLat - 0.002],
        [centerLng + 0.002, centerLat - 0.002],
        [centerLng + 0.002, centerLat + 0.003],
        [centerLng - 0.003, centerLat + 0.003],
        [centerLng - 0.003, centerLat - 0.002]
      ]
    ],
    heightMeters: 280,
    energyConsumptionKw: 3850,
    waterUsageLpm: 420,
    occupancyCount: 4200,
    healthScore: 99
  },
  {
    id: 'bld-fin-2',
    name: 'Global Financial Spire Alpha',
    type: 'commercial',
    coordinates: [
      [
        [centerLng + 0.006, centerLat + 0.002],
        [centerLng + 0.011, centerLat + 0.002],
        [centerLng + 0.011, centerLat + 0.007],
        [centerLng + 0.006, centerLat + 0.007],
        [centerLng + 0.006, centerLat + 0.002]
      ]
    ],
    heightMeters: 245,
    energyConsumptionKw: 2900,
    waterUsageLpm: 310,
    occupancyCount: 3600,
    healthScore: 94
  },
  {
    id: 'bld-tech-3',
    name: 'Quantum Data Center & AI Exchange',
    type: 'critical_infra',
    coordinates: [
      [
        [centerLng - 0.012, centerLat + 0.008],
        [centerLng - 0.006, centerLat + 0.008],
        [centerLng - 0.006, centerLat + 0.014],
        [centerLng - 0.012, centerLat + 0.014],
        [centerLng - 0.012, centerLat + 0.008]
      ]
    ],
    heightMeters: 160,
    energyConsumptionKw: 5400,
    waterUsageLpm: 680,
    occupancyCount: 1200,
    healthScore: 98
  },
  {
    id: 'bld-gov-4',
    name: 'Municipal Council & Emergency HQ',
    type: 'government',
    coordinates: [
      [
        [centerLng + 0.014, centerLat - 0.008],
        [centerLng + 0.020, centerLat - 0.008],
        [centerLng + 0.020, centerLat - 0.003],
        [centerLng + 0.014, centerLat - 0.003],
        [centerLng + 0.014, centerLat - 0.008]
      ]
    ],
    heightMeters: 110,
    energyConsumptionKw: 1450,
    waterUsageLpm: 180,
    occupancyCount: 2100,
    healthScore: 96
  },
  {
    id: 'bld-ind-5',
    name: 'Port Logistics Processing Hub 1',
    type: 'industrial',
    coordinates: [
      [
        [centerLng - 0.022, centerLat - 0.018],
        [centerLng - 0.014, centerLat - 0.018],
        [centerLng - 0.014, centerLat - 0.012],
        [centerLng - 0.022, centerLat - 0.012],
        [centerLng - 0.022, centerLat - 0.018]
      ]
    ],
    heightMeters: 75,
    energyConsumptionKw: 4200,
    waterUsageLpm: 510,
    occupancyCount: 950,
    healthScore: 88
  }
];

export const WATER_NODES: WaterNode[] = [
  {
    id: 'wat-res-1',
    name: 'Marina Reservoir Master Station',
    type: 'reservoir',
    coordinates: [centerLng - 0.018, centerLat - 0.004],
    pressureBar: 5.4,
    targetPressureBar: 5.2,
    flowRateM3h: 14200,
    purityTdsPpm: 120,
    status: 'optimal',
    capacityPercent: 91
  },
  {
    id: 'wat-pump-2',
    name: 'CBD Booster Pump Station 04',
    type: 'pump_station',
    coordinates: [centerLng + 0.004, centerLat + 0.005],
    pressureBar: 4.1,
    targetPressureBar: 4.5,
    flowRateM3h: 8600,
    purityTdsPpm: 128,
    status: 'warning',
    capacityPercent: 82
  },
  {
    id: 'wat-tank-3',
    name: 'North District Elevated Storage',
    type: 'storage_tank',
    coordinates: [centerLng - 0.006, centerLat + 0.020],
    pressureBar: 3.2,
    targetPressureBar: 4.2,
    flowRateM3h: 4100,
    purityTdsPpm: 135,
    status: 'warning',
    capacityPercent: 64
  },
  {
    id: 'wat-treat-4',
    name: 'Deep Tunnel Purification Plant 2',
    type: 'treatment_plant',
    coordinates: [centerLng + 0.024, centerLat - 0.012],
    pressureBar: 5.8,
    targetPressureBar: 5.8,
    flowRateM3h: 16800,
    purityTdsPpm: 92,
    status: 'optimal',
    capacityPercent: 95
  }
];

export const WATER_PIPELINES: WaterPipeline[] = [
  {
    id: 'pipe-1',
    fromNode: 'wat-res-1',
    toNode: 'wat-pump-2',
    diameterMm: 1200,
    material: 'Ductile Iron',
    coordinates: [
      [centerLng - 0.018, centerLat - 0.004],
      [centerLng - 0.008, centerLat + 0.001],
      [centerLng + 0.004, centerLat + 0.005]
    ],
    pressureBar: 4.9,
    flowM3h: 8600,
    leakProbability: 0.04,
    status: 'nominal'
  },
  {
    id: 'pipe-2',
    fromNode: 'wat-pump-2',
    toNode: 'wat-tank-3',
    diameterMm: 800,
    material: 'High-Density Polyethylene',
    coordinates: [
      [centerLng + 0.004, centerLat + 0.005],
      [centerLng - 0.001, centerLat + 0.012],
      [centerLng - 0.006, centerLat + 0.020]
    ],
    pressureBar: 3.4,
    flowM3h: 4100,
    leakProbability: 0.38,
    status: 'leak_suspected'
  },
  {
    id: 'pipe-3',
    fromNode: 'wat-treat-4',
    toNode: 'wat-res-1',
    diameterMm: 1400,
    material: 'Prestressed Concrete',
    coordinates: [
      [centerLng + 0.024, centerLat - 0.012],
      [centerLng + 0.005, centerLat - 0.008],
      [centerLng - 0.018, centerLat - 0.004]
    ],
    pressureBar: 5.6,
    flowM3h: 12400,
    leakProbability: 0.02,
    status: 'nominal'
  }
];

export const POWER_SUBSTATIONS: PowerSubstation[] = [
  {
    id: 'sub-pri-1',
    name: 'Bay Area 400kV Substation Alpha',
    type: 'substation_primary',
    coordinates: [centerLng + 0.015, centerLat + 0.018],
    capacityMw: 1800,
    currentLoadMw: 1580,
    voltageKv: 400,
    frequencyHz: 50.02,
    temperatureC: 62.4,
    status: 'strained'
  },
  {
    id: 'sub-sec-2',
    name: 'Downtown Financial 230kV Substation',
    type: 'substation_secondary',
    coordinates: [centerLng + 0.002, centerLat - 0.005],
    capacityMw: 1200,
    currentLoadMw: 1090,
    voltageKv: 230,
    frequencyHz: 49.98,
    temperatureC: 58.1,
    status: 'online'
  },
  {
    id: 'sub-solar-3',
    name: 'Southern Offshore Floating Solar Array',
    type: 'solar_farm',
    coordinates: [centerLng - 0.025, centerLat - 0.022],
    capacityMw: 650,
    currentLoadMw: 540,
    voltageKv: 66,
    frequencyHz: 50.00,
    temperatureC: 44.5,
    status: 'online'
  },
  {
    id: 'sub-bess-4',
    name: 'District Grid BESS (Battery Storage 400MWh)',
    type: 'battery_bess',
    coordinates: [centerLng - 0.012, centerLat + 0.025],
    capacityMw: 400,
    currentLoadMw: 210,
    voltageKv: 66,
    frequencyHz: 50.01,
    temperatureC: 32.0,
    status: 'online'
  }
];

export const POWER_GRID_LINES: PowerGridLine[] = [
  {
    id: 'grid-line-1',
    fromSubstation: 'sub-pri-1',
    toSubstation: 'sub-sec-2',
    voltageKv: 230,
    coordinates: [
      [centerLng + 0.015, centerLat + 0.018],
      [centerLng + 0.008, centerLat + 0.006],
      [centerLng + 0.002, centerLat - 0.005]
    ],
    loadPercentage: 88,
    status: 'heavy'
  },
  {
    id: 'grid-line-2',
    fromSubstation: 'sub-solar-3',
    toSubstation: 'sub-sec-2',
    voltageKv: 66,
    coordinates: [
      [centerLng - 0.025, centerLat - 0.022],
      [centerLng - 0.010, centerLat - 0.014],
      [centerLng + 0.002, centerLat - 0.005]
    ],
    loadPercentage: 74,
    status: 'nominal'
  },
  {
    id: 'grid-line-3',
    fromSubstation: 'sub-pri-1',
    toSubstation: 'sub-bess-4',
    voltageKv: 230,
    coordinates: [
      [centerLng + 0.015, centerLat + 0.018],
      [centerLng + 0.002, centerLat + 0.022],
      [centerLng - 0.012, centerLat + 0.025]
    ],
    loadPercentage: 62,
    status: 'nominal'
  }
];

export const AQI_SENSORS: AQISensor[] = [
  {
    id: 'aqi-cbd-1',
    zone: 'Central Business District',
    coordinates: [centerLng + 0.001, centerLat + 0.002],
    aqi: 68,
    pm25: 22.4,
    pm10: 45.1,
    no2: 38.6,
    so2: 9.1,
    co: 0.8,
    o3: 42.0,
    primaryPollutant: 'PM2.5',
    status: 'moderate'
  },
  {
    id: 'aqi-ind-2',
    zone: 'Industrial Corridor & Port Sector',
    coordinates: [centerLng - 0.024, centerLat - 0.020],
    aqi: 156,
    pm25: 68.2,
    pm10: 112.5,
    no2: 74.0,
    so2: 28.4,
    co: 2.1,
    o3: 56.2,
    primaryPollutant: 'PM10 & NO2',
    status: 'unhealthy'
  },
  {
    id: 'aqi-north-3',
    zone: 'North District Eco-Corridor',
    coordinates: [centerLng - 0.010, centerLat + 0.022],
    aqi: 34,
    pm25: 8.5,
    pm10: 18.2,
    no2: 14.0,
    so2: 3.2,
    co: 0.3,
    o3: 28.0,
    primaryPollutant: 'Ozone (O3)',
    status: 'good'
  },
  {
    id: 'aqi-bay-4',
    zone: 'Marina Coastal Promenade',
    coordinates: [centerLng + 0.020, centerLat + 0.008],
    aqi: 48,
    pm25: 12.0,
    pm10: 24.5,
    no2: 19.8,
    so2: 4.5,
    co: 0.4,
    o3: 31.0,
    primaryPollutant: 'PM2.5',
    status: 'good'
  }
];

export const POPULATION_ZONES: PopulationZone[] = [
  {
    id: 'pop-zone-cbd',
    name: 'Downtown Financial Hub Zone',
    coordinates: [
      [
        [centerLng - 0.010, centerLat - 0.008],
        [centerLng + 0.015, centerLat - 0.008],
        [centerLng + 0.015, centerLat + 0.010],
        [centerLng - 0.010, centerLat + 0.010],
        [centerLng - 0.010, centerLat - 0.008]
      ]
    ],
    densityPerKm2: 24800,
    currentFootfall: 148500,
    capacityPercent: 88,
    mobilityFlux: 'surging',
    transitHubLoad: 92
  },
  {
    id: 'pop-zone-north',
    name: 'North Innovation Residential Sector',
    coordinates: [
      [
        [centerLng - 0.020, centerLat + 0.012],
        [centerLng + 0.005, centerLat + 0.012],
        [centerLng + 0.005, centerLat + 0.030],
        [centerLng - 0.020, centerLat + 0.030],
        [centerLng - 0.020, centerLat + 0.012]
      ]
    ],
    densityPerKm2: 14200,
    currentFootfall: 89000,
    capacityPercent: 62,
    mobilityFlux: 'steady',
    transitHubLoad: 58
  },
  {
    id: 'pop-zone-port',
    name: 'Maritime Port Logistics Zone',
    coordinates: [
      [
        [centerLng - 0.035, centerLat - 0.030],
        [centerLng - 0.005, centerLat - 0.030],
        [centerLng - 0.005, centerLat - 0.012],
        [centerLng - 0.035, centerLat - 0.012],
        [centerLng - 0.035, centerLat - 0.030]
      ]
    ],
    densityPerKm2: 6400,
    currentFootfall: 32000,
    capacityPercent: 44,
    mobilityFlux: 'steady',
    transitHubLoad: 41
  }
];

export const INCIDENTS_DATA: Incident[] = [
  {
    id: 'inc-0941',
    title: 'Multi-Vehicle Congestion Bottleneck & Collision',
    type: 'traffic_collision',
    severity: 'high',
    coordinates: [centerLng + 0.002, centerLat - 0.001],
    locationName: 'Central Business Arterial, Lane 3 & 4',
    reportedAt: '19:18:42 UTC',
    status: 'active',
    assignedUnits: ['Traffic Patrol #12', 'EMS Unit #04', 'Highway Tow #09'],
    impactRadiusMeters: 450,
    recommendedAction: 'Activate adaptive signal timing on Arterial B and redirect westbound traffic via Coastal Viaduct',
    slaMinutesRemaining: 12
  },
  {
    id: 'inc-0942',
    title: 'Sub-Surface Main Pressure Anomaly (Potential Leak)',
    type: 'water_main_break',
    severity: 'critical',
    coordinates: [centerLng - 0.001, centerLat + 0.012],
    locationName: 'North Pipeline Sector 3-B',
    reportedAt: '19:04:10 UTC',
    status: 'dispatched',
    assignedUnits: ['Utility Crew #07', 'Hydraulic Valve Robot #02'],
    impactRadiusMeters: 300,
    recommendedAction: 'Isolate Isolation Valve V-88 and reroute North District supply via Secondary Booster 02',
    slaMinutesRemaining: 18
  },
  {
    id: 'inc-0943',
    title: 'Transformer Thermal Threshold Alert',
    type: 'power_outage',
    severity: 'medium',
    coordinates: [centerLng + 0.015, centerLat + 0.018],
    locationName: 'Bay Area 400kV Substation Alpha (Unit T-3)',
    reportedAt: '18:52:00 UTC',
    status: 'contained',
    assignedUnits: ['Grid Tech Alpha', 'Cooling System Tech #01'],
    impactRadiusMeters: 600,
    recommendedAction: 'Shift 180 MW load to District Grid BESS battery reserve',
    slaMinutesRemaining: 34
  },
  {
    id: 'inc-0944',
    title: 'Bridge Expansion Joint Vibration Spike',
    type: 'structural_crack',
    severity: 'medium',
    coordinates: [centerLng + 0.018, centerLat + 0.005],
    locationName: 'Marina Viaduct Span 4 Structural Node',
    reportedAt: '18:30:15 UTC',
    status: 'active',
    assignedUnits: ['Structural Engineering Drone 03'],
    impactRadiusMeters: 200,
    recommendedAction: 'Impose temporary 40 km/h heavy freight speed restriction',
    slaMinutesRemaining: 45
  }
];

export const AI_PREDICTIONS: AIPrediction[] = [
  {
    id: 'pred-traf-01',
    domain: 'traffic',
    title: 'TRAFFIC FORECAST: High Congestion Probability Detected',
    location: 'Central Business District (CBD Arterial Corridor)',
    coordinates: [centerLng + 0.000, centerLat - 0.001],
    probabilityPercent: 87,
    expectedTimeWindow: '18:20 – 19:10',
    severity: 'high',
    causes: [
      'Peak-hour commuter egress convergence',
      'Road capacity reduction due to lane 3 obstruction',
      'Signal cycle synchronization misalignment (+18s lag)'
    ],
    factors: [
      { name: 'Commuter Volume', impact: 42 },
      { name: 'Lane Closure', impact: 31 },
      { name: 'Weather / Wet Surface', impact: 14 },
      { name: 'Transit Delay', impact: 13 }
    ],
    recommendedAction: 'Activate adaptive signal timing (Pattern AI-9) + divert westbound transit flow via Coastal Viaduct',
    estimatedImpact: '-34% congestion queue length, +18 km/h flow restoration within 15 min',
    confidenceScore: 0.93,
    projectedMetrics: {
      current: '24 km/h',
      predicted: '12 km/h (severe gridlock)',
      delta: '-50% speed decline'
    }
  },
  {
    id: 'pred-wat-02',
    domain: 'water',
    title: 'WATER SHORTAGE & PRESSURE DEFICIT PREDICTION',
    location: 'North District Residential & High-Tech Zone',
    coordinates: [centerLng - 0.006, centerLat + 0.020],
    probabilityPercent: 73,
    expectedTimeWindow: 'Within 48 Hours',
    severity: 'critical',
    causes: [
      'North Elevated Reservoir level dropping at 4.2% / hour',
      'Industrial peak consumption surge in Zone 4',
      'Sub-surface pipeline pressure drop detected at Node 3B'
    ],
    factors: [
      { name: 'Reservoir Level', impact: 40 },
      { name: 'Consumption Spike', impact: 32 },
      { name: 'Pipeline Leak Gradient', impact: 28 }
    ],
    recommendedAction: 'Redistribute supply from Marina Reservoir via Booster Pump 04 and initiate valve pressure equalization',
    estimatedImpact: 'Averts water outage for 84,000 residents; sustains minimum 3.8 bar pressure',
    confidenceScore: 0.89,
    projectedMetrics: {
      current: '3.2 bar',
      predicted: '1.8 bar (supply collapse)',
      delta: '-44% pressure drop'
    }
  },
  {
    id: 'pred-pwr-03',
    domain: 'energy',
    title: 'POWER DEMAND & GRID PEAK SURGE FORECAST',
    location: 'Metropolitan Grid Network (All Zones)',
    coordinates: [centerLng + 0.015, centerLat + 0.018],
    probabilityPercent: 88,
    expectedTimeWindow: '19:30 – 21:00 Today',
    severity: 'medium',
    causes: [
      'Cooling HVAC spike across residential districts (+28°C ambient)',
      'Simultaneous EV fast-charging network peak demand',
      'Substation Alpha transformer approaching 88% thermal ceiling'
    ],
    factors: [
      { name: 'HVAC Cooling Load', impact: 48 },
      { name: 'EV Supercharger Draw', impact: 26 },
      { name: 'Commercial Tower Inflow', impact: 26 }
    ],
    recommendedAction: 'Pre-discharge District Grid BESS battery storage (200 MW) and activate industrial demand-response incentives',
    estimatedImpact: 'Shaves 320 MW peak load, preventing substation overload and brownout risk',
    confidenceScore: 0.95,
    projectedMetrics: {
      current: '4.1 GW',
      predicted: '4.8 GW (+14% peak surge)',
      delta: '+700 MW delta'
    }
  },
  {
    id: 'pred-pol-04',
    domain: 'pollution',
    title: 'POLLUTION HOTSPOT & INVERSION ACCUMULATION',
    location: 'Industrial Corridor & Southern Port Arterial',
    coordinates: [centerLng - 0.024, centerLat - 0.020],
    probabilityPercent: 81,
    expectedTimeWindow: 'Next 6 Hours (20:00 – 02:00)',
    severity: 'high',
    causes: [
      'Low ground wind velocity (<8 km/h) causing thermal inversion trapping',
      'Port freight diesel engine emissions concentration',
      'Atmospheric stagnation coefficient reaching 0.84'
    ],
    factors: [
      { name: 'Wind Inversion Stagnation', impact: 44 },
      { name: 'Heavy Freight Emissions', impact: 36 },
      { name: 'Industrial Stack Output', impact: 20 }
    ],
    recommendedAction: 'Enforce Heavy Vehicle Low-Emission Corridor restriction and trigger mist-cannon atmospheric scrubbers',
    estimatedImpact: 'Cap AQI below 160; prevents hazardous particulate spread to adjacent residential sectors',
    confidenceScore: 0.91,
    projectedMetrics: {
      current: 'AQI 156',
      predicted: 'AQI 218 (Very Unhealthy)',
      delta: '+62 AQI spike'
    }
  }
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'scen-bridge-fail',
    name: 'Major Coastal Viaduct / Bridge Sudden Closure',
    category: 'infrastructure_failure',
    description: 'Simulates complete 4-lane closure of the Coastal Viaduct due to emergency structural maintenance or maritime vessel collision.',
    severity: 'severe',
    parameters: {
      trafficCapacityReductionPct: 48,
      gridCapacityLossMw: 0,
      waterPressureLossPct: 0,
      aqiSurgePct: 35,
      affectedZone: 'Coastal Viaduct & Downtown Arterials'
    },
    impactResults: {
      cityHealthScoreDrop: 14,
      averageTrafficDelayMin: 42,
      powerCustomersAffected: 0,
      waterDeficitLiters: 0,
      emergencyUnitsNeeded: 16,
      economicLossPerHourUsd: 485000,
      mitigationActions: [
        'Dynamic Signal Priority (DSP) enabled on inland detour avenues',
        'Automated reversible lane activation on Marina Boulevard Express',
        'Metro rail frequency increased by 40% along coastal transit lines',
        'Real-time navigation broadcasting push to connected vehicle HUDs'
      ]
    }
  },
  {
    id: 'scen-blackout',
    name: 'Primary Substation Alpha 400kV Transformer Trip',
    category: 'infrastructure_failure',
    description: 'Cascading failure triggered by high thermal stress on Substation Alpha, threatening 35% of the Central Business District.',
    severity: 'catastrophic',
    parameters: {
      trafficCapacityReductionPct: 65,
      gridCapacityLossMw: 1400,
      waterPressureLossPct: 40,
      aqiSurgePct: 15,
      affectedZone: 'Central Business District & Waterfront'
    },
    impactResults: {
      cityHealthScoreDrop: 32,
      averageTrafficDelayMin: 58,
      powerCustomersAffected: 320000,
      waterDeficitLiters: 4800000,
      emergencyUnitsNeeded: 38,
      economicLossPerHourUsd: 2150000,
      mitigationActions: [
        'Instant islanding of Quantum Data Center & Hospital microgrids',
        'Discharge 400 MWh District BESS battery reserve at maximum C-rate',
        'Cold-start gas peaker plants in Southern Energy Park (12 min sync)',
        'Dispatch auxiliary mobile diesel generators to critical water booster stations'
      ]
    }
  },
  {
    id: 'scen-flash-flood',
    name: '100-Year Storm Surge & Flash Inundation',
    category: 'disaster',
    description: 'Intense tropical precipitation (140mm/hr) paired with high astronomical tide overwhelming urban drainage catchments.',
    severity: 'catastrophic',
    parameters: {
      trafficCapacityReductionPct: 70,
      gridCapacityLossMw: 350,
      waterPressureLossPct: 25,
      aqiSurgePct: -40,
      affectedZone: 'Marina Basin Lowlands & North Sector'
    },
    impactResults: {
      cityHealthScoreDrop: 28,
      averageTrafficDelayMin: 65,
      powerCustomersAffected: 110000,
      waterDeficitLiters: 1200000,
      emergencyUnitsNeeded: 45,
      economicLossPerHourUsd: 1840000,
      mitigationActions: [
        'Activate Marina Barrage 9 crest gates for seaward gravity drainage',
        'Engage 7 high-capacity storm pumps (280 m3/sec discharge)',
        'Close vehicular tunnel underpasses with automated hydrodynamic barriers',
        'Issue cell-broadcast emergency civilian evacuation routes'
      ]
    }
  },
  {
    id: 'scen-mass-event',
    name: 'International Summit & Mega-Concert Surge',
    category: 'mass_event',
    description: 'Concurrent influx of 180,000 visitors into the Central Waterfront district over a 3-hour evening window.',
    severity: 'moderate',
    parameters: {
      trafficCapacityReductionPct: 28,
      gridCapacityLossMw: 0,
      waterPressureLossPct: 15,
      aqiSurgePct: 22,
      affectedZone: 'Marina Waterfront District'
    },
    impactResults: {
      cityHealthScoreDrop: 8,
      averageTrafficDelayMin: 22,
      powerCustomersAffected: 0,
      waterDeficitLiters: 250000,
      emergencyUnitsNeeded: 12,
      economicLossPerHourUsd: -950000, // positive economic activity
      mitigationActions: [
        'Pedestrianize Marina Boulevard from 17:00 to 23:30',
        'Deploy 60 additional autonomous electric shuttle buses',
        'Pre-stage EMS rapid response triage vehicles at Sector 4 and 8',
        'Adjust cellular micro-cell tower beamforming for ultra-dense mobile traffic'
      ]
    }
  }
];
