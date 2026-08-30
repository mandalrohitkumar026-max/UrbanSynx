import { WebSocketServer, WebSocket } from 'ws';
import { CITIES, ROADS_DATA, WATER_NODES, POWER_SUBSTATIONS, AQI_SENSORS } from '../mock/cityData.js';

export class TelemetryStreamManager {
  private wss: WebSocketServer | null = null;
  private timer: NodeJS.Timeout | null = null;
  private currentCityId: string = 'neo-metropolis';

  constructor() {}

  public init(wss: WebSocketServer) {
    this.wss = wss;
    this.startStreaming();
  }

  public setCity(cityId: string) {
    if (CITIES[cityId]) {
      this.currentCityId = cityId;
    }
  }

  private startStreaming() {
    this.timer = setInterval(() => {
      this.broadcastTick();
    }, 2000); // 2 second high-fidelity telemetry tick
  }

  private broadcastTick() {
    if (!this.wss || this.wss.clients.size === 0) return;

    // Jitter city health and subsystems slightly for a living digital twin feel
    const baseCity = CITIES[this.currentCityId] || CITIES['neo-metropolis'];
    
    // Add micro variations
    const jitter = (Math.random() - 0.5) * 0.8;
    const trafficJitter = (Math.random() - 0.48) * 1.5;
    const energyJitter = (Math.random() - 0.5) * 1.2;
    const aqiJitter = (Math.random() - 0.52) * 1.8;

    const payload = {
      type: 'TELEMETRY_UPDATE',
      timestamp: new Date().toISOString(),
      cityId: this.currentCityId,
      liveData: {
        healthScore: Math.round(Math.min(100, Math.max(70, baseCity.healthScore + jitter))),
        subsystems: {
          traffic: Math.round(Math.min(99, Math.max(50, baseCity.subsystems.traffic + trafficJitter))),
          water: Math.round(Math.min(99, Math.max(75, baseCity.subsystems.water + (jitter * 0.4)))),
          energy: Math.round(Math.min(99, Math.max(65, baseCity.subsystems.energy + energyJitter))),
          pollution: Math.round(Math.min(99, Math.max(50, baseCity.subsystems.pollution - aqiJitter))),
          infrastructure: baseCity.subsystems.infrastructure,
          population: Math.round(Math.min(95, Math.max(60, baseCity.subsystems.population + (jitter * 0.6)))),
        },
        powerDemandGw: (4.1 + (Math.random() * 0.15)).toFixed(2),
        gridFrequencyHz: (50.00 + (Math.random() - 0.5) * 0.04).toFixed(3),
        waterPressureBar: (4.2 + (Math.random() - 0.5) * 0.1).toFixed(2),
        trafficAvgSpeedKmh: Math.round(48 + (Math.random() - 0.5) * 4),
        activeIncidentsCount: 4,
        telemetryFreshnessMs: Math.round(18 + Math.random() * 12)
      }
    };

    const message = JSON.stringify(payload);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  public destroy() {
    if (this.timer) clearInterval(this.timer);
  }
}

export const telemetryStream = new TelemetryStreamManager();
