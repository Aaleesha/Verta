import React, { useState } from 'react';
import { Sun, Clock, Layers, Sparkles, Scale, Droplet, Eye, ChevronRight } from 'lucide-react';
import { SpatialZone } from '../types';

interface VisualizerViewProps {
  zones: SpatialZone[];
  onSelectZone: (zone: SpatialZone) => void;
  onOpenPlan: () => void;
}

export const VisualizerView: React.FC<VisualizerViewProps> = ({
  zones,
  onSelectZone,
  onOpenPlan
}) => {
  const [timeOfDay, setTimeOfDay] = useState<number>(13.75); // 13:45
  const [growthStage, setGrowthStage] = useState<'seedling' | 'vegetative' | 'harvest'>('vegetative');

  // Format decimal hour to HH:MM string
  const formatTime = (hourVal: number) => {
    const h = Math.floor(hourVal);
    const m = Math.floor((hourVal - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // Shadow calculation based on time of day (07:00 to 19:00)
  // At 07:00, angle is steep from East (long shadow to West)
  // At 13:00, sun is high South (short shadow to North)
  // At 19:00, sun is West (long shadow to East)
  const sunProgress = (timeOfDay - 7) / 12; // 0 to 1
  const shadowOffsetX = (sunProgress - 0.5) * 60; // -30px to +30px
  const shadowLength = Math.max(10, Math.abs(sunProgress - 0.5) * 45 + 15);
  const sunElevationAngle = Math.round(Math.sin(sunProgress * Math.PI) * 65);

  // Microclimate status at current time
  const getZoneLightingStatus = (zoneId: string) => {
    if (zoneId === 'wall-trellis') {
      if (timeOfDay < 11.5) return { status: 'Direct Sunlight', color: 'text-[#d97757]' };
      return { status: 'Filtered / Ambient Light', color: 'text-[#727974]' };
    }
    if (zoneId === 'railing-tier') {
      if (timeOfDay >= 10 && timeOfDay <= 17) return { status: 'Peak Solar Irradiance', color: 'text-[#d97757]' };
      return { status: 'Low Angle Sun', color: 'text-[#e9c46a]' };
    }
    // Floor Zone A
    if (timeOfDay >= 11 && timeOfDay <= 15.5) return { status: 'Partial Light / Diffused', color: 'text-[#2c694e]' };
    return { status: 'Full Cool Shadow', color: 'text-[#727974]' };
  };

  return (
    <div className="pb-24 px-4 pt-3 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
            SPATIAL SOLAR SIMULATOR
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#191c19] tracking-tight">
          Balcony 3D Studio &amp; Shadow Engine
        </h2>
        <p className="text-xs text-[#414844] mt-1 leading-relaxed">
          Simulate solar angles, cast shadow dynamics, and canopy biomass growth over a typical 12-hour cycle.
        </p>

        {/* Time Scrubber */}
        <div className="mt-4 p-3 bg-[#f2f4ee] rounded-2xl border border-[#18392b]/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#414844] font-telemetry font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2c694e]" />
              Solar Time: <span className="text-[#012317]">{formatTime(timeOfDay)}</span>
            </span>
            <span className="text-[11px] font-telemetry font-bold text-[#d97757]">
              Elevation: ~{sunElevationAngle}°
            </span>
          </div>
          <input
            type="range"
            min="7"
            max="19"
            step="0.25"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(Number(e.target.value))}
            className="w-full accent-[#18392b] h-2 bg-white rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#727974] font-telemetry mt-1">
            <span>07:00 (Dawn)</span>
            <span>13:00 (Solar Noon)</span>
            <span>19:00 (Dusk)</span>
          </div>
        </div>

        {/* Growth Stage Selector */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#18392b]/5">
          <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold">
            Canopy Stage:
          </span>
          <div className="flex gap-1.5 flex-1 justify-end">
            {(['seedling', 'vegetative', 'harvest'] as const).map((stage) => (
              <button
                key={stage}
                onClick={() => setGrowthStage(stage)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                  growthStage === stage
                    ? 'bg-[#012317] text-white shadow-xs'
                    : 'bg-[#f2f4ee] text-[#414844] hover:bg-[#e7e9e3]'
                }`}
              >
                {stage === 'harvest' ? 'Full Harvest' : stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2D/Isometric Balcony Schematic Container */}
      <div className="bg-[#0a1811] rounded-3xl p-5 border border-[#18392b]/20 shadow-xl overflow-hidden relative">
        <div className="flex items-center justify-between text-xs text-[#aacfbb] mb-3">
          <div className="font-telemetry font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
            ISOMETRIC SOLAR PROJECTION (TOP-DOWN)
          </div>
          <div className="text-[10px] font-telemetry text-white/70">
            Grid Unit: 0.2m²
          </div>
        </div>

        {/* Schematic Canvas representation */}
        <div className="relative w-full aspect-[4/3] bg-[#112419] rounded-2xl border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
          {/* Simulated Solar Rays Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              background: `linear-gradient(${180 + (sunProgress - 0.5) * 60}deg, rgba(244, 162, 97, 0.15) 0%, transparent 70%)`
            }}
          />

          {/* Wall Trellis (North Wall / Top) */}
          <div
            onClick={() => {
              const z = zones.find((item) => item.id === 'wall-trellis');
              if (z) onSelectZone(z);
            }}
            className="relative cursor-pointer group bg-[#18392b]/80 border border-[#52b788]/40 rounded-xl p-3 hover:border-[#52b788] transition-all"
            style={{
              boxShadow: `${-shadowOffsetX * 0.4}px ${shadowLength * 0.4}px 12px rgba(0,0,0,0.6)`
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#aeeecb] uppercase tracking-wider">
                Wall Trellis (1.4m × 2.0m)
              </span>
              <span className={`text-[10px] font-telemetry font-semibold ${getZoneLightingStatus('wall-trellis').color}`}>
                {getZoneLightingStatus('wall-trellis').status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="text-xs text-white/90 font-medium">
                Runner Beans &amp; Sugar Snap Peas
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2c694e] text-white font-telemetry">
                {growthStage === 'seedling' ? '15cm Tendrils' : growthStage === 'vegetative' ? '1.2m Dense Foliage' : '2.0m Bearing Pods'}
              </span>
            </div>
          </div>

          {/* Middle Floor Zone A */}
          <div
            onClick={() => {
              const z = zones.find((item) => item.id === 'floor-zone-a');
              if (z) onSelectZone(z);
            }}
            className="relative cursor-pointer group bg-[#152e22]/90 border border-[#f4a261]/40 rounded-xl p-3 hover:border-[#f4a261] transition-all mx-4 my-2"
            style={{
              boxShadow: `${-shadowOffsetX * 0.6}px ${shadowLength * 0.5}px 14px rgba(0,0,0,0.6)`
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#ffb59e] uppercase tracking-wider">
                Floor Zone A (1.8m × 0.6m)
              </span>
              <span className={`text-[10px] font-telemetry font-semibold ${getZoneLightingStatus('floor-zone-a').color}`}>
                {getZoneLightingStatus('floor-zone-a').status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="text-xs text-white/90 font-medium">
                Tuscan Lacinato Kale, Rocket Arugula, Alpine Strawberries
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2c694e] text-white font-telemetry">
                {growthStage === 'harvest' ? 'Cut-and-Come-Again' : 'Active Growth'}
              </span>
            </div>
          </div>

          {/* Railing Tier (South Glass Railing / Bottom) */}
          <div
            onClick={() => {
              const z = zones.find((item) => item.id === 'railing-tier');
              if (z) onSelectZone(z);
            }}
            className="relative cursor-pointer group bg-[#1d4332]/90 border border-[#52b788]/60 rounded-xl p-3 hover:border-[#aeeecb] transition-all"
            style={{
              boxShadow: `${-shadowOffsetX * 0.8}px ${shadowLength * 0.7}px 16px rgba(0,0,0,0.6)`
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#aeeecb] uppercase tracking-wider">
                Railing Tier (2.2m Linear Bracket)
              </span>
              <span className={`text-[10px] font-telemetry font-semibold ${getZoneLightingStatus('railing-tier').color}`}>
                {getZoneLightingStatus('railing-tier').status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="text-xs text-white/90 font-medium">
                Genovese Basil, Roma Bush Tomato, Thai Chili, Oregano
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#601c03] text-[#ffdbd0] font-telemetry">
                Full Sun 6.8h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Yield & Bio-Metabolic Performance */}
      <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs space-y-3">
        <h3 className="font-extrabold text-base text-[#191c19] tracking-tight flex items-center justify-between">
          <span>Estimated Annual Bio-Yield</span>
          <span className="text-xs font-telemetry text-[#2c694e] font-bold">
            91% Spatial Efficiency
          </span>
        </h3>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#f2f4ee] p-3 rounded-2xl text-center">
            <Scale className="w-4 h-4 text-[#2c694e] mx-auto mb-1" />
            <div className="text-base font-extrabold text-[#012317]">
              14.8 kg
            </div>
            <div className="text-[10px] text-[#727974] font-telemetry">
              Total Harvest/Yr
            </div>
          </div>

          <div className="bg-[#f2f4ee] p-3 rounded-2xl text-center">
            <Sparkles className="w-4 h-4 text-[#d97757] mx-auto mb-1" />
            <div className="text-base font-extrabold text-[#012317]">
              420 g
            </div>
            <div className="text-[10px] text-[#727974] font-telemetry">
              Weekly Fresh Herb/Greens
            </div>
          </div>

          <div className="bg-[#f2f4ee] p-3 rounded-2xl text-center">
            <Droplet className="w-4 h-4 text-[#2c694e] mx-auto mb-1" />
            <div className="text-base font-extrabold text-[#012317]">
              12.4 L
            </div>
            <div className="text-[10px] text-[#727974] font-telemetry">
              Weekly Drip Need
            </div>
          </div>
        </div>

        <button
          onClick={onOpenPlan}
          className="w-full mt-2 py-3 bg-[#012317] hover:bg-[#18392b] active:scale-[0.99] text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Open Full Bio-Algorithmic Master Plan</span>
          <ChevronRight className="w-4 h-4 text-[#aeeecb]" />
        </button>
      </div>
    </div>
  );
};
