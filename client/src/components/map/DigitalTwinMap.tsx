import React, { useEffect, useRef, useState } from 'react';
import { useCity } from '../../context/CityContext';
import { MapControls } from './MapControls';
import { AssetInspectorModal } from './AssetInspectorModal';
import { RoadSegment, WaterNode, WaterPipeline, PowerSubstation, PowerGridLine, AQISensor, PopulationZone, Incident, Building3D } from '../../types/city';

interface Particle {
  roadId: string;
  progress: number; // 0 to 1
  speed: number;
  color: string;
  size: number;
}

export const DigitalTwinMap: React.FC = () => {
  const {
    city,
    layers,
    viewMode,
    forecastMinutes,
    setInspectedAsset,
    gisLayers
  } = useCity();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [is3D, setIs3D] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // Particle simulation state
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Transform coordinates to canvas pixel positions
  // Center is city.center [lng, lat]
  const projectGeoToPixel = (
    lng: number,
    lat: number,
    width: number,
    height: number,
    centerLng: number,
    centerLat: number,
    zoomScale: number,
    pitchAngle: number
  ) => {
    const dLng = (lng - centerLng) * 111320 * Math.cos((centerLat * Math.PI) / 180);
    const dLat = (lat - centerLat) * 110540;

    const scale = (width / 4000) * zoomScale;
    let x = width / 2 + dLng * scale;
    let y = height / 2 - dLat * scale;

    // Apply isometric 3D tilt transformation
    if (is3D) {
      const pitchRad = (pitchAngle * Math.PI) / 180;
      const centerY = height / 2;
      const dy = y - centerY;
      y = centerY + dy * Math.cos(pitchRad);
      x = x + dy * Math.sin(pitchRad) * 0.15; // perspective shear
    }

    return { x, y };
  };

  // Initialize traffic particles
  useEffect(() => {
    const roads = gisLayers.roads || [];
    if (roads.length === 0) return;

    const newParticles: Particle[] = [];
    roads.forEach((road) => {
      const particleCount = road.type === 'highway' ? 18 : 10;
      const speedFactor =
        road.congestionLevel === 'red' ? 0.001 :
        road.congestionLevel === 'orange' ? 0.0025 :
        road.congestionLevel === 'yellow' ? 0.0045 : 0.008;

      const color =
        road.congestionLevel === 'red' ? '#ef4444' :
        road.congestionLevel === 'orange' ? '#f97316' :
        road.congestionLevel === 'yellow' ? '#eab308' : '#10b981';

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          roadId: road.id,
          progress: Math.random(),
          speed: speedFactor * (0.8 + Math.random() * 0.4),
          color: color,
          size: road.type === 'highway' ? 3.5 : 2.5
        });
      }
    });

    particlesRef.current = newParticles;
  }, [gisLayers.roads]);

  // Main Canvas Rendering Loop (Living Digital Twin Engine)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerLng = city.center[0];
    let centerLat = city.center[1];
    const zoomScale = 1.0;
    const pitchAngle = is3D ? 54 : 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear & Dark Graphite Base
      ctx.fillStyle = '#070a0f';
      ctx.fillRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Pollution & AQI Gradients Layer
      if (layers.pollution && gisLayers.aqiSensors) {
        gisLayers.aqiSensors.forEach((sensor: AQISensor) => {
          const pt = projectGeoToPixel(sensor.coordinates[0], sensor.coordinates[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
          const gradient = ctx.createRadialGradient(pt.x, pt.y, 10, pt.x, pt.y, 220);
          
          if (sensor.aqi > 150) {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.28)');
            gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.12)');
            gradient.addColorStop(1, 'transparent');
          } else if (sensor.aqi > 100) {
            gradient.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
            gradient.addColorStop(1, 'transparent');
          } else {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
            gradient.addColorStop(1, 'transparent');
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 220, 0, Math.PI * 2);
          ctx.fill();

          // Sensor node circle
          ctx.fillStyle = sensor.aqi > 150 ? '#ef4444' : sensor.aqi > 100 ? '#f59e0b' : '#10b981';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 3. Population Density Zones Layer
      if (layers.populationDensity && gisLayers.populationZones) {
        gisLayers.populationZones.forEach((zone: PopulationZone) => {
          if (zone.coordinates && zone.coordinates[0]) {
            ctx.beginPath();
            zone.coordinates[0].forEach((coord, idx) => {
              const pt = projectGeoToPixel(coord[0], coord[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
              if (idx === 0) ctx.moveTo(pt.x, pt.y);
              else ctx.lineTo(pt.x, pt.y);
            });
            ctx.closePath();
            ctx.fillStyle = zone.densityPerKm2 > 20000 ? 'rgba(244, 63, 94, 0.14)' : 'rgba(244, 63, 94, 0.07)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // 4. Water Network (Pipelines & Nodes)
      if (layers.waterNetwork) {
        // Pipelines
        if (gisLayers.waterPipelines) {
          gisLayers.waterPipelines.forEach((pipe: WaterPipeline) => {
            if (pipe.coordinates && pipe.coordinates.length > 1) {
              ctx.beginPath();
              pipe.coordinates.forEach((coord, idx) => {
                const pt = projectGeoToPixel(coord[0], coord[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
                if (idx === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
              });
              ctx.strokeStyle = pipe.status === 'leak_suspected' ? '#f59e0b' : '#06b6d4';
              ctx.lineWidth = pipe.diameterMm > 1000 ? 4 : 2.5;
              ctx.setLineDash([8, 4]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          });
        }

        // Pumping & Reservoir Nodes
        if (gisLayers.waterNodes) {
          gisLayers.waterNodes.forEach((node: WaterNode) => {
            const pt = projectGeoToPixel(node.coordinates[0], node.coordinates[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label
            ctx.fillStyle = '#67e8f9';
            ctx.font = '10px "JetBrains Mono"';
            ctx.fillText(`${node.name.split(' ')[0]} [${node.pressureBar} bar]`, pt.x + 9, pt.y + 3);
          });
        }
      }

      // 5. Power Grid Network (Transmission Lines & Substations)
      if (layers.powerNetwork) {
        // Grid lines
        if (gisLayers.powerGridLines) {
          gisLayers.powerGridLines.forEach((line: PowerGridLine) => {
            if (line.coordinates && line.coordinates.length > 1) {
              ctx.beginPath();
              line.coordinates.forEach((coord, idx) => {
                const pt = projectGeoToPixel(coord[0], coord[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
                if (idx === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
              });
              ctx.strokeStyle = line.status === 'heavy' ? '#a855f7' : '#818cf8';
              ctx.lineWidth = 3;
              ctx.stroke();
            }
          });
        }

        // Substations
        if (gisLayers.powerSubstations) {
          gisLayers.powerSubstations.forEach((sub: PowerSubstation) => {
            const pt = projectGeoToPixel(sub.coordinates[0], sub.coordinates[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
            ctx.fillStyle = sub.status === 'strained' ? '#f59e0b' : '#a855f7';
            ctx.fillRect(pt.x - 5, pt.y - 5, 10, 10);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(pt.x - 5, pt.y - 5, 10, 10);

            // Label
            ctx.fillStyle = '#d8b4fe';
            ctx.font = '10px "JetBrains Mono"';
            ctx.fillText(`${sub.name.split(' ')[0]} [${sub.voltageKv}kV]`, pt.x + 9, pt.y + 3);
          });
        }
      }

      // 6. Roads & Arterials Layer
      const roads = gisLayers.roads || [];
      if (layers.roads) {
        roads.forEach((road: RoadSegment) => {
          if (road.coordinates && road.coordinates.length > 1) {
            ctx.beginPath();
            road.coordinates.forEach((coord, idx) => {
              const pt = projectGeoToPixel(coord[0], coord[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
              if (idx === 0) ctx.moveTo(pt.x, pt.y);
              else ctx.lineTo(pt.x, pt.y);
            });

            // Road stroke styling based on congestion & forecast
            let strokeColor = '#334155';
            if (viewMode === 'forecast') {
              // Projected future bottleneck
              strokeColor = road.id === 'road-art-2' ? '#ef4444' : road.id === 'road-art-1' ? '#f97316' : '#10b981';
            } else {
              strokeColor =
                road.congestionLevel === 'red' ? '#ef4444' :
                road.congestionLevel === 'orange' ? '#f97316' :
                road.congestionLevel === 'yellow' ? '#eab308' : '#10b981';
            }

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = road.type === 'highway' ? 6 : 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // Inner line for crisp cyber road aesthetic
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = road.type === 'highway' ? 2 : 1;
            ctx.stroke();
          }
        });
      }

      // 7. Animated Traffic Particle Simulation
      if (layers.traffic && particlesRef.current.length > 0) {
        particlesRef.current.forEach((p) => {
          const road = roads.find((r: RoadSegment) => r.id === p.roadId);
          if (!road || !road.coordinates || road.coordinates.length < 2) return;

          // Update progress along road
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;

          // Calculate interpolated point along coordinates polyline
          const totalSegments = road.coordinates.length - 1;
          const currentSegIndex = Math.min(totalSegments - 1, Math.floor(p.progress * totalSegments));
          const segProgress = (p.progress * totalSegments) - currentSegIndex;

          const p1 = road.coordinates[currentSegIndex];
          const p2 = road.coordinates[currentSegIndex + 1];

          const interpLng = p1[0] + (p2[0] - p1[0]) * segProgress;
          const interpLat = p1[1] + (p2[1] - p1[1]) * segProgress;

          const pt = projectGeoToPixel(interpLng, interpLat, width, height, centerLng, centerLat, zoomScale, pitchAngle);

          // Draw Glowing Particle
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 8. 3D Extruded Buildings Layer
      if (layers.buildings && gisLayers.buildings) {
        gisLayers.buildings.forEach((bld: Building3D) => {
          if (bld.coordinates && bld.coordinates[0]) {
            const heightOffset = is3D ? (bld.heightMeters / 4) : 0;

            // Roof Polygon
            ctx.beginPath();
            bld.coordinates[0].forEach((coord, idx) => {
              const pt = projectGeoToPixel(coord[0], coord[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
              const roofY = pt.y - heightOffset;
              if (idx === 0) ctx.moveTo(pt.x, roofY);
              else ctx.lineTo(pt.x, roofY);
            });
            ctx.closePath();

            // Fill color with subtle glassmorphic glow
            ctx.fillStyle = bld.type === 'critical_infra' ? 'rgba(6, 182, 212, 0.45)' : 'rgba(30, 41, 59, 0.7)';
            ctx.fill();
            ctx.strokeStyle = bld.type === 'critical_infra' ? '#06b6d4' : '#64748b';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Building height wall lines (3D extrusion pillars)
            if (is3D) {
              bld.coordinates[0].forEach((coord) => {
                const pt = projectGeoToPixel(coord[0], coord[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
                ctx.beginPath();
                ctx.moveTo(pt.x, pt.y);
                ctx.lineTo(pt.x, pt.y - heightOffset);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
                ctx.lineWidth = 1;
                ctx.stroke();
              });
            }

            // Building label
            const firstPt = projectGeoToPixel(bld.coordinates[0][0][0], bld.coordinates[0][0][1], width, height, centerLng, centerLat, zoomScale, pitchAngle);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '10px "JetBrains Mono"';
            ctx.fillText(bld.name.split(' ')[0], firstPt.x - 10, firstPt.y - heightOffset - 6);
          }
        });
      }

      // 9. Emergency Incidents Layer (Pulsing Radar Rings)
      if (layers.incidents && gisLayers.incidents) {
        const time = Date.now() / 1000;
        gisLayers.incidents.forEach((inc: Incident) => {
          if (inc.status !== 'resolved') {
            const pt = projectGeoToPixel(inc.coordinates[0], inc.coordinates[1], width, height, centerLng, centerLat, zoomScale, pitchAngle);

            // Pulsing ring
            const pulseRadius = 12 + (Math.sin(time * 3) + 1) * 8;
            ctx.strokeStyle = inc.severity === 'critical' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Center marker
            ctx.fillStyle = inc.severity === 'critical' ? '#ef4444' : '#f59e0b';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Incident Tag
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px "JetBrains Mono"';
            ctx.fillText(`INCIDENT [${inc.id}]`, pt.x + 12, pt.y + 4);
          }
        });
      }

      // Loop animation
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [city, layers, viewMode, forecastMinutes, is3D, gisLayers]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && mapContainerRef.current) {
        canvasRef.current.width = mapContainerRef.current.clientWidth;
        canvasRef.current.height = mapContainerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Map Click to inspect features
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if incident clicked
    const incidents = gisLayers.incidents || [];
    for (const inc of incidents) {
      const pt = projectGeoToPixel(inc.coordinates[0], inc.coordinates[1], canvas.width, canvas.height, city.center[0], city.center[1], 1.0, is3D ? 54 : 0);
      const dist = Math.hypot(pt.x - clickX, pt.y - clickY);
      if (dist < 20) {
        setInspectedAsset(inc);
        return;
      }
    }

    // Check if water node clicked
    const waterNodes = gisLayers.waterNodes || [];
    for (const node of waterNodes) {
      const pt = projectGeoToPixel(node.coordinates[0], node.coordinates[1], canvas.width, canvas.height, city.center[0], city.center[1], 1.0, is3D ? 54 : 0);
      const dist = Math.hypot(pt.x - clickX, pt.y - clickY);
      if (dist < 18) {
        setInspectedAsset(node);
        return;
      }
    }

    // Check if substation clicked
    const substations = gisLayers.powerSubstations || [];
    for (const sub of substations) {
      const pt = projectGeoToPixel(sub.coordinates[0], sub.coordinates[1], canvas.width, canvas.height, city.center[0], city.center[1], 1.0, is3D ? 54 : 0);
      const dist = Math.hypot(pt.x - clickX, pt.y - clickY);
      if (dist < 18) {
        setInspectedAsset(sub);
        return;
      }
    }

    // Check if building clicked
    const buildings = gisLayers.buildings || [];
    for (const bld of buildings) {
      if (bld.coordinates && bld.coordinates[0]) {
        const pt = projectGeoToPixel(bld.coordinates[0][0][0], bld.coordinates[0][0][1], canvas.width, canvas.height, city.center[0], city.center[1], 1.0, is3D ? 54 : 0);
        const dist = Math.hypot(pt.x - clickX, pt.y - clickY);
        if (dist < 30) {
          setInspectedAsset(bld);
          return;
        }
      }
    }

    // Check if road clicked
    const roads = gisLayers.roads || [];
    for (const road of roads) {
      if (road.coordinates && road.coordinates[0]) {
        const pt = projectGeoToPixel(road.coordinates[0][0], road.coordinates[0][1], canvas.width, canvas.height, city.center[0], city.center[1], 1.0, is3D ? 54 : 0);
        const dist = Math.hypot(pt.x - clickX, pt.y - clickY);
        if (dist < 30) {
          setInspectedAsset(road);
          return;
        }
      }
    }
  };

  return (
    <div ref={mapContainerRef} className="relative w-full h-full bg-[#070a0f] overflow-hidden select-none">
      {/* 2D/3D Living Vector & Particle Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-crosshair block"
      />

      {/* Floating Tactical Map Controls */}
      <MapControls
        is3D={is3D}
        onToggle3D={() => setIs3D(!is3D)}
      />

      {/* Slide-over Asset Inspector Drawer */}
      <AssetInspectorModal />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 glass-panel rounded-lg p-2.5 border border-slate-800 text-[10px] font-mono flex items-center gap-4 text-slate-300 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Free Flow (&gt;60 km/h)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Moderate Flow</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span>Congestion</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>Severe / Incident</span>
        </div>
      </div>
    </div>
  );
};
