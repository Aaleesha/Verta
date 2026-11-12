import React, { useState, useEffect, useRef } from 'react';
import {
  Scan,
  Sun,
  Wind,
  Maximize2,
  Grid3X3,
  Flame,
  Box,
  Camera,
  RefreshCw,
  Info,
  Sliders,
  Check
} from 'lucide-react';
import { ScanMode, SpatialZone, SensorData } from '../types';
import { BALCONY_SCENARIOS } from '../data/mockData';

interface ARViewfinderProps {
  zones: SpatialZone[];
  sensors: SensorData;
  scenarioId: string;
  onSelectZone: (zone: SpatialZone) => void;
  onOpenPlan: () => void;
  onRescan: () => void;
}

export const ARViewfinder: React.FC<ARViewfinderProps> = ({
  zones,
  sensors,
  scenarioId,
  onSelectZone,
  onOpenPlan,
  onRescan
}) => {
  const [activeMode, setActiveMode] = useState<ScanMode>('lidar');
  const [confidence, setConfidence] = useState(94);
  const [solarElevationTime, setSolarElevationTime] = useState<string>('13:45');
  const [solarElevationDeg, setSolarElevationDeg] = useState<number>(62);
  const [isLidarActive, setIsLidarActive] = useState(true);
  const [showCameraStream, setShowCameraStream] = useState(false);
  const [showSunScrubber, setShowSunScrubber] = useState(false);
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentScenario =
    BALCONY_SCENARIOS.find((s) => s.id === scenarioId) || BALCONY_SCENARIOS[0];

  // Optional real webcam feed support
  const handleToggleWebcam = async () => {
    if (showCameraStream) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setShowCameraStream(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setShowCameraStream(true);
      } catch (err) {
        console.warn('Camera access denied or unavailable, using high-res scenario backdrop.');
      }
    }
  };

  // Subtle live micro-fluctuation in sensor confidence to feel like active instrumentation
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.min(98, Math.max(91, prev + delta));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Update sun position based on hour slider (from 09:00 to 17:30)
  const handleSunSlider = (val: number) => {
    // 0 = 9:00, 100 = 17:30 (8.5 hrs = 510 mins)
    const totalMinutes = 9 * 60 + (val / 100) * 8.5 * 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.floor(totalMinutes % 60);
    const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    setSolarElevationTime(timeStr);

    // Peak elevation ~68 deg at 13:00, down to ~15 deg at 09:00 / 17:30
    const middayOffset = Math.abs(totalMinutes - 13 * 60) / 270;
    const elevation = Math.round(68 - Math.pow(middayOffset, 1.8) * 50);
    setSolarElevationDeg(Math.max(12, elevation));
  };

  // Calculate sun position along the quadratic bezier arc for SVG overlay
  // Normalized 0 to 1 based on 09:00 to 17:30
  const parseCurrentMinutes = () => {
    const [h, m] = solarElevationTime.split(':').map(Number);
    const mins = h * 60 + m - 9 * 60;
    return Math.max(0, Math.min(1, mins / (8.5 * 60)));
  };

  const sunRatio = parseCurrentMinutes();
  // Arc coordinates: starts at (15%, 72%), peaks at (58%, 14%), ends at (91%, 22%)
  // Using quadratic Bezier formula: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
  const p0 = { x: 15, y: 72 };
  const p1 = { x: 55, y: 8 };
  const p2 = { x: 91, y: 24 };

  const currentSunX =
    Math.pow(1 - sunRatio, 2) * p0.x +
    2 * (1 - sunRatio) * sunRatio * p1.x +
    Math.pow(sunRatio, 2) * p2.x;
  const currentSunY =
    Math.pow(1 - sunRatio, 2) * p0.y +
    2 * (1 - sunRatio) * sunRatio * p1.y +
    Math.pow(sunRatio, 2) * p2.y;

  return (
    <div className="relative w-full overflow-hidden select-none bg-[#0a1811]">
      {/* 1. Backdrop Camera / Viewfinder Scene */}
      <div className="relative w-full aspect-[9/16] sm:aspect-[4/5] md:aspect-[16/11] max-h-[720px] overflow-hidden">
        {showCameraStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={currentScenario.bgImage}
            alt="Balcony Viewfinder"
            className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.02]"
          />
        )}

        {/* Ambient Balcony Lighting & Vignette for HUD Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

        {/* Dynamic Mode Canvas Overlays */}
        {activeMode === 'lidar' && isLidarActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Animated Laser Scanning Line */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#52b788] to-transparent shadow-[0_0_12px_#52b788] animate-laser-sweep opacity-75" />

            {/* Geometric LiDAR Perspective Wireframe Grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="lidarGrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#52b788"
                    strokeWidth="0.8"
                    strokeDasharray="2,3"
                  />
                  <circle cx="0" cy="0" r="1.5" fill="#aeeecb" />
                </pattern>
              </defs>
              {/* Floor Plane Grid Transform */}
              <g
                style={{
                  transformOrigin: '50% 80%',
                  transform: 'perspective(400px) rotateX(62deg) translateY(40px)'
                }}
              >
                <rect width="100%" height="100%" fill="url(#lidarGrid)" />
              </g>
              {/* Wall Plane Grid */}
              <g
                style={{
                  transformOrigin: '15% 40%',
                  transform: 'perspective(500px) rotateY(48deg) translateX(-10px)'
                }}
              >
                <rect width="40%" height="80%" fill="url(#lidarGrid)" opacity="0.6" />
              </g>
            </svg>
          </div>
        )}

        {activeMode === 'thermal' && (
          <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-80 transition-opacity duration-300">
            {/* Thermal false-color heatmap glow layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-purple-900/30 to-amber-700/20" />
            {/* Railing heat streak */}
            <div className="absolute top-[28%] right-[10%] w-[50%] h-[35%] bg-gradient-to-r from-amber-500/50 via-red-500/60 to-yellow-400/50 blur-2xl rounded-full" />
            {/* Wall Trellis brick retention heat */}
            <div className="absolute top-[18%] left-[6%] w-[34%] h-[40%] bg-gradient-to-b from-orange-500/40 via-red-600/30 to-purple-600/20 blur-xl rounded-2xl" />
            {/* Cool shaded floor zone */}
            <div className="absolute bottom-[20%] left-[12%] w-[42%] h-[24%] bg-gradient-to-br from-blue-600/40 to-teal-500/30 blur-xl rounded-full" />
          </div>
        )}

        {activeMode === 'spatial' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Volumetric Bounding Cubes */}
            <svg className="w-full h-full">
              {/* Railing Box */}
              <polygon
                points="180,180 340,150 360,260 200,290"
                fill="rgba(82, 183, 136, 0.12)"
                stroke="#52b788"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Floor Box */}
              <polygon
                points="40,290 240,280 280,360 30,380"
                fill="rgba(244, 162, 97, 0.12)"
                stroke="#f4a261"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </svg>
          </div>
        )}

        {/* 2. Top HUD Bar */}
        <div className="absolute top-3 left-3 right-3 z-30 flex flex-col gap-2.5">
          {/* Main Scanning Status Header */}
          <div className="bg-[#012317]/85 backdrop-blur-md text-white rounded-2xl px-3.5 py-2.5 flex items-center justify-between border border-white/10 shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52b788] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#52b788]" />
              </span>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Scanning South-Facing Balcony
                </div>
                <div className="text-[11px] text-[#aacfbb] font-telemetry tracking-wide">
                  Surface mesh locked ({confidence}% confidence)
                </div>
              </div>
            </div>

            {/* LiDAR Active Status Pill */}
            <button
              onClick={() => setIsLidarActive(!isLidarActive)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-telemetry font-semibold border transition-all ${
                isLidarActive
                  ? 'bg-[#18392b] text-[#aeeecb] border-[#52b788]/40 shadow-[0_0_8px_rgba(82,183,136,0.3)]'
                  : 'bg-black/40 text-white/50 border-white/10'
              }`}
            >
              <Scan className="w-3 h-3 text-[#52b788]" />
              <span>{isLidarActive ? 'LiDAR Active' : 'LiDAR Paused'}</span>
            </button>
          </div>

          {/* 3 Toggle Pills: Live LiDAR Mesh, Thermal Heatmap, Spatial Bounds */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {/* Pill 1: Live LiDAR Mesh */}
            <button
              onClick={() => setActiveMode('lidar')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeMode === 'lidar'
                  ? 'bg-[#aeeecb] text-[#002114] shadow-md ring-1 ring-[#52b788]'
                  : 'bg-[#012317]/80 text-white/90 border border-white/15 hover:bg-[#012317]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Live LiDAR Mesh</span>
            </button>

            {/* Pill 2: Thermal Heatmap */}
            <button
              onClick={() => setActiveMode('thermal')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeMode === 'thermal'
                  ? 'bg-[#ffb59e] text-[#390b00] shadow-md ring-1 ring-[#d97757]'
                  : 'bg-[#012317]/80 text-white/90 border border-white/15 hover:bg-[#012317]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Thermal Heatmap</span>
            </button>

            {/* Pill 3: Spatial Bounds */}
            <button
              onClick={() => setActiveMode('spatial')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeMode === 'spatial'
                  ? 'bg-[#c6ebd6] text-[#002115] shadow-md ring-1 ring-[#2c694e]'
                  : 'bg-[#012317]/80 text-white/90 border border-white/15 hover:bg-[#012317]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Spatial Bounds</span>
            </button>

            {/* Camera feed toggle */}
            <button
              onClick={handleToggleWebcam}
              title="Switch to Real Camera"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border border-white/20 transition-all ml-auto ${
                showCameraStream ? 'bg-[#52b788] text-[#002114]' : 'bg-[#012317]/70 text-white/80'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span className="hidden sm:inline">{showCameraStream ? 'Cam On' : 'Live Cam'}</span>
            </button>
          </div>
        </div>

        {/* 3. SVG Sun Trajectory Arc & Solar Position Indicator */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sunArcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f4a261" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#ffb59e" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e76f51" stopOpacity="0.85" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Curved trajectory path (dashed salmon/peach) */}
          <path
            d="M 12,70 Q 55,8 92,24"
            fill="none"
            stroke="url(#sunArcGrad)"
            strokeWidth="0.8"
            strokeDasharray="2.5,2.5"
            filter="url(#glow)"
          />

          {/* Perspective dashed LiDAR boundary lines between zones */}
          <path
            d="M 46,35 L 70,36 L 98,39"
            fill="none"
            stroke="#f4a261"
            strokeWidth="0.6"
            strokeDasharray="2,2"
            opacity="0.8"
          />
          <path
            d="M 64,36 L 96,39 L 98,48 L 62,56 Z"
            fill="rgba(82, 183, 136, 0.08)"
            stroke="#52b788"
            strokeWidth="0.6"
            strokeDasharray="2,2"
            opacity="0.85"
          />
        </svg>

        {/* Sun Elevation Indicator with Interactive scrubber trigger */}
        <div
          style={{
            position: 'absolute',
            left: `${currentSunX}%`,
            top: `${currentSunY}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 25
          }}
          className="cursor-pointer group pointer-events-auto"
          onClick={() => setShowSunScrubber(!showSunScrubber)}
        >
          {/* Pulsing Sun Icon */}
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-amber-400/30 animate-ping absolute" />
            <div className="w-6 h-6 rounded-full bg-[#f4a261] border border-white flex items-center justify-center shadow-[0_0_15px_#f4a261]">
              <Sun className="w-4 h-4 text-white animate-spin [animation-duration:12s]" />
            </div>

            {/* Solar Telemetry Callout Label */}
            <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#012317]/85 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-telemetry font-semibold text-[#ffdbd0] border border-white/10 shadow-md">
              <span className="text-white">SUN {solarElevationTime}</span>
              <span className="ml-1 text-[#e58060]">~{solarElevationDeg}° Elevation</span>
            </div>
          </div>
        </div>

        {/* 09:00 AM Sun start label */}
        <div
          style={{ position: 'absolute', left: '6%', top: '30%', zIndex: 20 }}
          className="text-[10px] font-telemetry font-bold text-[#ffb59e] tracking-tight bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]" />
          09:00 AM
        </div>

        {/* 05:30 PM Sun end label */}
        <div
          style={{ position: 'absolute', right: '4%', top: '22%', zIndex: 20 }}
          className="text-[10px] font-telemetry font-bold text-[#ffb59e] tracking-tight bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs"
        >
          05:30 PM
        </div>

        {/* 4. Spatial Zone Callout Overlays */}
        {/* Callout 1: WALL TRELLIS */}
        <div
          style={{ position: 'absolute', top: '20%', left: '3%', zIndex: 25 }}
          className="transition-transform active:scale-95 cursor-pointer max-w-[210px] sm:max-w-[240px]"
          onClick={() => {
            const z = zones.find((item) => item.id === 'wall-trellis');
            if (z) onSelectZone(z);
          }}
        >
          <div className="bg-[#012317]/90 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/15 shadow-xl hover:border-[#52b788]/60 transition-colors">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
              <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#aacfbb] font-bold">
                WALL TRELLIS
              </span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">
              1.4m × 2.0m Vertical
            </div>
            <div className="text-[11px] text-[#d8dbd5] font-medium leading-tight">
              Diffused Morning Light
            </div>
          </div>
        </div>

        {/* Callout 2: RAILING TIER */}
        <div
          style={{ position: 'absolute', top: '26%', right: '3%', zIndex: 25 }}
          className="transition-transform active:scale-95 cursor-pointer max-w-[210px] sm:max-w-[250px]"
          onClick={() => {
            const z = zones.find((item) => item.id === 'railing-tier');
            if (z) onSelectZone(z);
          }}
        >
          <div className="bg-[#012317]/90 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/15 shadow-xl hover:border-[#ffb59e]/60 transition-colors">
            <div className="flex items-center justify-between gap-1.5 mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
                <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#aacfbb] font-bold">
                  RAILING TIER
                </span>
              </div>
              <span className="bg-[#601c03] text-[#ffdbd0] text-[9px] font-telemetry font-bold px-2 py-0.5 rounded-full">
                Full Sun
              </span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">
              2.2m Linear Bracket Zone
            </div>
            <div className="text-[11px] text-[#d8dbd5] font-medium leading-tight">
              6.8 hrs direct sun • Solar Peak
            </div>
          </div>
        </div>

        {/* Central LIDAR LOCK Anchor Marker */}
        <div
          style={{ position: 'absolute', top: '33%', left: '42%', zIndex: 24 }}
          className="pointer-events-none flex flex-col items-center"
        >
          <div className="bg-[#012317]/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-telemetry tracking-widest text-[#ffdbd0] border border-[#f4a261]/40 shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]" />
            LIDAR LOCK
          </div>
          <div className="w-px h-6 border-l border-dashed border-[#f4a261]" />
          <div className="w-2 h-2 rounded-full bg-[#f4a261] ring-2 ring-white/60" />
        </div>

        {/* Callout 3: FLOOR ZONE A */}
        <div
          style={{ position: 'absolute', top: '37%', left: '3%', zIndex: 25 }}
          className="transition-transform active:scale-95 cursor-pointer max-w-[210px] sm:max-w-[250px]"
          onClick={() => {
            const z = zones.find((item) => item.id === 'floor-zone-a');
            if (z) onSelectZone(z);
          }}
        >
          <div className="bg-[#012317]/90 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/15 shadow-xl hover:border-[#52b788]/60 transition-colors">
            <div className="flex items-center justify-between gap-1.5 mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
                <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#aacfbb] font-bold">
                  FLOOR ZONE A
                </span>
              </div>
              <span className="bg-[#18392b] text-[#aeeecb] text-[9px] font-telemetry font-bold px-2 py-0.5 rounded-full border border-[#2c694e]/40">
                Partial Shade
              </span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">
              1.8m × 0.6m Planter Base
            </div>
            <div className="text-[11px] text-[#d8dbd5] font-medium leading-tight">
              4.5 hrs direct sun • Wind Shielded
            </div>
          </div>
        </div>

        {/* Reticle Target Ring on the Balcony Floor */}
        <div
          style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 22 }}
          className="pointer-events-none"
        >
          <div className="w-10 h-10 rounded-full border border-[#52b788]/60 flex items-center justify-center animate-scan-pulse">
            <div className="w-5 h-5 rounded-full border border-[#aeeecb]/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
            </div>
          </div>
        </div>

        {/* Interactive Sun Scrubber Floating Bar (when clicking sun) */}
        {showSunScrubber && (
          <div className="absolute top-[68px] left-4 right-4 z-40 bg-[#012317]/95 backdrop-blur-lg p-3 rounded-2xl border border-white/20 text-white shadow-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#aacfbb] font-telemetry flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#f4a261]" />
                Simulate Solar Trajectory
              </span>
              <span className="font-telemetry font-bold text-[#ffb59e]">
                {solarElevationTime} ({solarElevationDeg}° Angle)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sunRatio * 100}
              onChange={(e) => handleSunSlider(Number(e.target.value))}
              className="w-full accent-[#f4a261] h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/60 font-telemetry mt-1">
              <span>09:00 AM (Sunrise)</span>
              <span>13:45 (Peak Solar)</span>
              <span>05:30 PM (Sunset)</span>
            </div>
          </div>
        )}

        {/* 5. Floating Bottom HUD Cards (Solar Yield & Aero Profile) */}
        <div className="absolute bottom-3 left-3 right-3 z-30 grid grid-cols-2 gap-2.5">
          {/* Card 1: SOLAR YIELD */}
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg border border-[#18392b]/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-[11px] font-telemetry uppercase tracking-wider text-[#414844] font-bold">
                SOLAR YIELD
              </span>
              <Sun className="w-4 h-4 text-[#d97757]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#191c19] tracking-tight">
                {sensors.solarYieldHours} hrs
              </span>
              <span className="text-xs text-[#727974] font-medium">/day</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#414844] font-telemetry mt-0.5 font-medium">
              Peak: {sensors.solarYieldPeak}
            </div>
          </div>

          {/* Card 2: AERO PROFILE */}
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg border border-[#18392b]/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-[11px] font-telemetry uppercase tracking-wider text-[#414844] font-bold">
                AERO PROFILE
              </span>
              <Wind className="w-4 h-4 text-[#2c694e]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#191c19] tracking-tight">
              {sensors.aeroProfile}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#414844] font-telemetry mt-0.5 font-medium">
              {sensors.aeroSub}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
