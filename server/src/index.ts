import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import {
  CITIES,
  ROADS_DATA,
  BUILDINGS_DATA,
  WATER_NODES,
  WATER_PIPELINES,
  POWER_SUBSTATIONS,
  POWER_GRID_LINES,
  AQI_SENSORS,
  POPULATION_ZONES,
  INCIDENTS_DATA,
  AI_PREDICTIONS,
  SIMULATION_SCENARIOS
} from './mock/cityData.js';
import { SimulationEngine, CustomSimulationInput } from './engine/simulationEngine.js';
import { telemetryStream } from './engine/telemetryStream.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory state for mutable actions (dispatching units, executing AI playbooks)
let liveIncidents = [...INCIDENTS_DATA];
let livePredictions = [...AI_PREDICTIONS];

// --- 1. City Overview & Telemetry ---
app.get('/api/cities', (req: Request, res: Response) => {
  res.json({
    success: true,
    cities: Object.values(CITIES)
  });
});

app.get('/api/city/:id', (req: Request, res: Response) => {
  const cityId = req.params.id;
  const city = CITIES[cityId] || CITIES['neo-metropolis'];
  telemetryStream.setCity(city.id);
  res.json({
    success: true,
    city
  });
});

// --- 2. All GIS Digital Twin Layers ---
app.get('/api/city/:id/layers', (req: Request, res: Response) => {
  const cityId = req.params.id;
  res.json({
    success: true,
    cityId,
    timestamp: new Date().toISOString(),
    layers: {
      roads: ROADS_DATA,
      buildings: BUILDINGS_DATA,
      waterNodes: WATER_NODES,
      waterPipelines: WATER_PIPELINES,
      powerSubstations: POWER_SUBSTATIONS,
      powerGridLines: POWER_GRID_LINES,
      aqiSensors: AQI_SENSORS,
      populationZones: POPULATION_ZONES,
      incidents: liveIncidents
    }
  });
});

// --- 3. Traffic Subsystem ---
app.get('/api/city/:id/traffic', (req: Request, res: Response) => {
  const totalFlow = ROADS_DATA.reduce((acc, r) => acc + r.currentFlowVehHr, 0);
  const totalCap = ROADS_DATA.reduce((acc, r) => acc + r.capacityVehHr, 0);
  const avgSpeed = Math.round(ROADS_DATA.reduce((acc, r) => acc + r.speedKmh, 0) / ROADS_DATA.length);

  res.json({
    success: true,
    summary: {
      networkLoadPct: Math.round((totalFlow / totalCap) * 100),
      averageSpeedKmh: avgSpeed,
      activeCongestionHotspots: ROADS_DATA.filter(r => r.congestionLevel === 'orange' || r.congestionLevel === 'red').length,
      adaptiveSignalsActive: 142,
      corridorThroughputVehHr: totalFlow,
      totalRoadLengthKm: 428.5
    },
    corridors: ROADS_DATA,
    signalTimingPlans: [
      { id: 'sig-plan-1', name: 'CBD Peak Egress Flush', active: true, efficiencyGain: '+22%' },
      { id: 'sig-plan-2', name: 'Marina Expressway Green Wave', active: true, efficiencyGain: '+18%' },
      { id: 'sig-plan-3', name: 'North Corridor Rebalancing', active: false, efficiencyGain: '+11%' }
    ]
  });
});

// --- 4. Water Subsystem ---
app.get('/api/city/:id/water', (req: Request, res: Response) => {
  res.json({
    success: true,
    summary: {
      averageSystemPressureBar: 4.2,
      totalReservoirStoragePct: 91.4,
      dailyWaterDeliveredMld: 412.8,
      acousticLeakSensorsOnline: 99.4,
      purityCompliancePct: 99.98,
      suspectedLeakCount: 1
    },
    nodes: WATER_NODES,
    pipelines: WATER_PIPELINES,
    qualityMetrics: {
      turbidityNtu: 0.18,
      residualChlorineMgL: 0.72,
      phLevel: 7.35,
      tdsPpm: 114
    }
  });
});

// --- 5. Energy Subsystem ---
app.get('/api/city/:id/energy', (req: Request, res: Response) => {
  res.json({
    success: true,
    summary: {
      currentDemandGw: 4.12,
      forecastPeakDemandGw: 4.80,
      totalCapacityGw: 5.40,
      renewableMixPct: 38.5,
      gridFrequencyHz: 50.012,
      bessStorageReserveMwh: 360,
      transformerHealthScorePct: 94.2
    },
    substations: POWER_SUBSTATIONS,
    gridLines: POWER_GRID_LINES,
    generationMix: [
      { source: 'Solar Photovoltaic', capacityMw: 650, currentMw: 540, pct: 28 },
      { source: 'Combined Cycle Gas', capacityMw: 2400, currentMw: 1950, pct: 45 },
      { source: 'Grid BESS Battery', capacityMw: 400, currentMw: 210, pct: 12 },
      { source: 'Inter-Regional Clean Import', capacityMw: 1950, currentMw: 1420, pct: 15 }
    ]
  });
});

// --- 6. Pollution Subsystem ---
app.get('/api/city/:id/pollution', (req: Request, res: Response) => {
  res.json({
    success: true,
    summary: {
      citywideAverageAqi: 68,
      primaryPollutant: 'PM2.5',
      inversionLayerStatus: 'Low Inversion Trap Risk',
      activeAirMonitors: 48,
      industrialEmissionsCompliancePct: 96.2
    },
    sensors: AQI_SENSORS,
    windVector: {
      speedKmh: 14.2,
      directionDeg: 65,
      directionLabel: 'ENE'
    }
  });
});

// --- 7. Population & Mobility Subsystem ---
app.get('/api/city/:id/population', (req: Request, res: Response) => {
  res.json({
    success: true,
    summary: {
      activeDowntownFootfall: 269500,
      publicTransitLoadPct: 82.4,
      cellularMobilitySurgeIndex: 1.18,
      evacuationClearanceRatePerHour: 85000,
      denseClustersIdentified: 3
    },
    zones: POPULATION_ZONES
  });
});

// --- 8. Infrastructure Subsystem ---
app.get('/api/city/:id/infrastructure', (req: Request, res: Response) => {
  res.json({
    success: true,
    summary: {
      overallHealthScore: 89,
      bridgeSensorNodesOnline: 412,
      roadRoughnessIndexIri: 1.85,
      openMaintenanceWorkOrders: 14,
      criticalStructuralAlerts: 1
    },
    assets: [
      { id: 'ast-brg-1', name: 'Marina Viaduct Cable-Stay Bridge', healthScore: 92, lastInspected: '2026-08-20', status: 'optimal' },
      { id: 'ast-tun-2', name: 'North-South Arterial Tunnel', healthScore: 88, lastInspected: '2026-08-15', status: 'optimal' },
      { id: 'ast-dam-3', name: 'Marina Basin Storm Barrage', healthScore: 97, lastInspected: '2026-08-28', status: 'optimal' },
      { id: 'ast-ovp-4', name: 'Port Logistics Overpass Span 2', healthScore: 78, lastInspected: '2026-08-10', status: 'warning' }
    ]
  });
});

// --- 9. AI Prediction Engine ---
app.get('/api/city/:id/predictions', (req: Request, res: Response) => {
  res.json({
    success: true,
    predictions: livePredictions
  });
});

app.post('/api/city/:id/predictions/:predId/execute', (req: Request, res: Response) => {
  const { predId } = req.params;
  const pred = livePredictions.find(p => p.id === predId);
  if (pred) {
    res.json({
      success: true,
      message: `AI Playbook Executed for: ${pred.title}`,
      actionTaken: pred.recommendedAction,
      executedAt: new Date().toISOString()
    });
  } else {
    res.status(404).json({ success: false, error: 'Prediction not found' });
  }
});

// --- 10. Simulation Engine ---
app.get('/api/city/:id/simulation/scenarios', (req: Request, res: Response) => {
  res.json({
    success: true,
    scenarios: SIMULATION_SCENARIOS
  });
});

app.post('/api/city/:id/simulation/run', (req: Request, res: Response) => {
  const cityId = req.params.id;
  const city = CITIES[cityId] || CITIES['neo-metropolis'];
  const input: CustomSimulationInput = req.body;

  const result = SimulationEngine.computeScenario(city, input);
  res.json({
    success: true,
    cityId: city.id,
    input,
    result
  });
});

// --- 11. Incidents & Dispatch ---
app.get('/api/city/:id/incidents', (req: Request, res: Response) => {
  res.json({
    success: true,
    incidents: liveIncidents
  });
});

app.post('/api/city/:id/incidents/:incId/dispatch', (req: Request, res: Response) => {
  const { incId } = req.params;
  const { unitName } = req.body;
  const inc = liveIncidents.find(i => i.id === incId);
  if (inc) {
    if (unitName && !inc.assignedUnits.includes(unitName)) {
      inc.assignedUnits.push(unitName);
    }
    inc.status = 'dispatched';
    res.json({
      success: true,
      incident: inc,
      message: `Unit ${unitName || 'Emergency Squad'} dispatched successfully`
    });
  } else {
    res.status(404).json({ success: false, error: 'Incident not found' });
  }
});

app.post('/api/city/:id/incidents/:incId/resolve', (req: Request, res: Response) => {
  const { incId } = req.params;
  const inc = liveIncidents.find(i => i.id === incId);
  if (inc) {
    inc.status = 'resolved';
    res.json({
      success: true,
      incident: inc,
      message: `Incident ${incId} marked as resolved`
    });
  } else {
    res.status(404).json({ success: false, error: 'Incident not found' });
  }
});

// --- 12. Analytics & SLA ---
app.get('/api/city/:id/analytics', (req: Request, res: Response) => {
  res.json({
    success: true,
    historicalPerformance: [
      { time: '00:00', traffic: 92, water: 96, energy: 95, aqi: 88 },
      { time: '04:00', traffic: 95, water: 96, energy: 97, aqi: 90 },
      { time: '08:00', traffic: 68, water: 92, energy: 88, aqi: 74 },
      { time: '12:00', traffic: 75, water: 90, energy: 86, aqi: 65 },
      { time: '16:00', traffic: 70, water: 89, energy: 84, aqi: 62 },
      { time: '19:00', traffic: 64, water: 94, energy: 81, aqi: 68 },
      { time: '22:00', traffic: 84, water: 95, energy: 91, aqi: 80 },
    ],
    crossDomainCorrelations: [
      { factorA: 'Peak Hour Traffic Congestion', factorB: 'Ground PM2.5 AQI Surge', correlation: '+0.88 (High)' },
      { factorA: 'Ambient Temperature > 30°C', factorB: 'Grid HVAC Power Draw (GW)', correlation: '+0.94 (Very High)' },
      { factorA: 'Main Pipe Pressure Gradient', factorB: 'Reservoir Drain Velocity', correlation: '+0.76 (High)' }
    ],
    serviceLevelAgreements: {
      emergencyResponseAvgMinutes: 7.4,
      emergencySlaTargetMinutes: 8.0,
      emergencyCompliancePct: 98.4,
      gridUptimePct: 99.991,
      waterPotabilityUptimePct: 99.998,
      trafficSignalOptimizationCoveragePct: 94.6
    }
  });
});

// Create HTTP Server & WebSocket
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws: WebSocket) => {
  // Send initial handshake
  ws.send(JSON.stringify({
    type: 'CONNECTION_ESTABLISHED',
    message: 'CITYPULSE TWIN Live Telemetry Connected',
    timestamp: new Date().toISOString()
  }));
});

telemetryStream.init(wss);

server.listen(PORT, () => {
  console.log(`[CITYPULSE TWIN ENGINE] Server listening on port ${PORT}`);
  console.log(`[TELEMETRY STREAM] WebSocket initialized on /ws`);
});
