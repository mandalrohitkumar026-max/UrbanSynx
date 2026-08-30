import { SimulationScenario, CityOverview, RoadSegment, PowerSubstation, WaterNode } from '../types.js';

export interface CustomSimulationInput {
  bridgeClosure: boolean;
  substationOutage: boolean;
  floodLevelMeters: number; // 0 to 3
  trafficSurgePct: number; // -50 to +100
  powerLoadSurgePct: number; // -30 to +50
  weatherCondition: 'clear' | 'heavy_rain' | 'heatwave' | 'fog_inversion';
}

export interface SimulationComputationResult {
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

export class SimulationEngine {
  public static computeScenario(
    baseCity: CityOverview,
    input: CustomSimulationInput
  ): SimulationComputationResult {
    let healthDrop = 0;
    let trafficDelay = 4; // base 4 min delay
    let trafficStrain = 100 - baseCity.subsystems.traffic;
    let powerDeficit = 0;
    let gridStrain = (baseCity.subsystems.energy);
    let waterStress = 100 - baseCity.subsystems.water;
    let aqiValue = baseCity.weather.aqi;
    let emergencyUnits = 4;
    let economicCost = 45000;
    const recommendations: string[] = [];

    // 1. Bridge Closure Effect
    if (input.bridgeClosure) {
      healthDrop += 14;
      trafficDelay += 38;
      trafficStrain += 45;
      emergencyUnits += 12;
      economicCost += 420000;
      recommendations.push('Enforce Dynamic Route Diversion through Marina Expressway & inland bypass arteries');
      recommendations.push('Synchronize adaptive green-light wave on secondary arterial intersections');
    }

    // 2. Substation Outage Effect
    if (input.substationOutage) {
      healthDrop += 28;
      powerDeficit += 1400;
      gridStrain = Math.max(20, gridStrain - 45);
      trafficDelay += 18; // traffic signals failover
      waterStress += 35; // pump station loss
      emergencyUnits += 24;
      economicCost += 1850000;
      recommendations.push('Immediate islanding of Hospital & Critical Quantum Infrastructure microgrids');
      recommendations.push('Discharge 400MWh District BESS storage to stabilize 230kV transmission corridor');
    }

    // 3. Flood Level
    if (input.floodLevelMeters > 0) {
      const floodFactor = input.floodLevelMeters;
      healthDrop += floodFactor * 12;
      trafficDelay += floodFactor * 22;
      waterStress += floodFactor * 18;
      aqiValue = Math.max(20, aqiValue - (floodFactor * 15)); // rain washes particulate
      emergencyUnits += Math.round(floodFactor * 14);
      economicCost += floodFactor * 750000;
      recommendations.push(`Activate Marina Barrage flood gates (Level ${floodFactor.toFixed(1)}m discharge mode)`);
      recommendations.push('Deploy automated submersible storm pumps along low-lying tunnel approaches');
    }

    // 4. Traffic Surge
    if (input.trafficSurgePct > 0) {
      const factor = input.trafficSurgePct / 100;
      trafficDelay += factor * 25;
      trafficStrain = Math.min(99, trafficStrain + (factor * 35));
      aqiValue += factor * 25;
      economicCost += factor * 200000;
    }

    // 5. Power Surge
    if (input.powerLoadSurgePct > 0) {
      const factor = input.powerLoadSurgePct / 100;
      gridStrain = Math.max(30, gridStrain - (factor * 25));
      if (input.powerLoadSurgePct > 25) {
        recommendations.push('Trigger Automated Demand Response (ADR) curtailment protocol on non-essential commercial HVAC');
      }
    }

    // 6. Weather conditions
    if (input.weatherCondition === 'heavy_rain') {
      trafficDelay += 12;
      emergencyUnits += 6;
    } else if (input.weatherCondition === 'heatwave') {
      gridStrain = Math.max(25, gridStrain - 15);
      recommendations.push('Activate district chilled water auxiliary storage units for cooling grid relief');
    } else if (input.weatherCondition === 'fog_inversion') {
      aqiValue += 45;
      recommendations.push('Trigger automated particulate mist-cannon scrubbing towers across industrial perimeter');
    }

    const calculatedHealth = Math.max(12, Math.min(100, Math.round(baseCity.healthScore - healthDrop)));
    const actualHealthDelta = calculatedHealth - baseCity.healthScore;

    const summary = healthDrop > 25
      ? 'CRITICAL DISRUPTION: Multiple cascading infrastructure bottlenecks detected. Immediate unified command activation required.'
      : healthDrop > 10
      ? 'ELEVATED STRESS: Subsystem performance degradation observed. Autonomous AI mitigation playbooks recommended.'
      : 'NOMINAL OPERATING MARGIN: City systems resilient with minor dynamic adjustments.';

    return {
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
      impactSummary: summary,
      dynamicRecommendations: recommendations.length > 0 ? recommendations : ['Standard operating posture maintained. No emergency reallocations required.'],
      affectedSubsystems: [
        {
          name: 'Traffic Network',
          score: Math.max(15, 100 - Math.round(trafficStrain)),
          status: trafficStrain > 75 ? 'critical' : trafficStrain > 45 ? 'strained' : 'optimal'
        },
        {
          name: 'Electrical Grid',
          score: Math.max(10, Math.round(gridStrain)),
          status: gridStrain < 50 ? 'critical' : gridStrain < 75 ? 'strained' : 'optimal'
        },
        {
          name: 'Hydraulic Water',
          score: Math.max(20, 100 - Math.round(waterStress)),
          status: waterStress > 60 ? 'critical' : waterStress > 30 ? 'strained' : 'optimal'
        },
        {
          name: 'Atmospheric AQI',
          score: Math.max(20, 100 - Math.round(aqiValue / 2)),
          status: aqiValue > 150 ? 'critical' : aqiValue > 100 ? 'strained' : 'optimal'
        }
      ]
    };
  }
}
