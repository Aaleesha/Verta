import React, { useState } from 'react';
import { Cpu, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SpatialZone } from '../types';

interface AssessmentCardProps {
  zones: SpatialZone[];
  onSelectZone: (zone: SpatialZone) => void;
  onRescan: () => void;
  onAnalyzePlan: () => void;
  isRescanning?: boolean;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  zones,
  onSelectZone,
  onRescan,
  onAnalyzePlan,
  isRescanning = false
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 mx-3 my-3 shadow-xs border border-[#18392b]/10 transition-all">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Bio-Algorithmic Icon */}
          <div className="w-10 h-10 rounded-2xl bg-[#d8f3e5] flex items-center justify-center text-[#18392b] shrink-0 shadow-xs">
            <Cpu className="w-5 h-5 text-[#2c694e]" />
          </div>

          <div>
            <div className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
              BIO-ALGORITHMIC ASSESSMENT
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#191c19] tracking-tight leading-snug">
              Balcony Microclimate Ready
            </h2>
          </div>
        </div>

        {/* Grade A Badge */}
        <div className="bg-[#18392b] text-white px-3.5 py-1 rounded-full text-xs font-telemetry font-bold shrink-0 shadow-xs flex items-center gap-1">
          <span>Grade A</span>
        </div>
      </div>

      {/* Narrative Bio-Architectural Summary */}
      <p className="text-sm text-[#414844] leading-relaxed mb-4 font-normal">
        LiDAR has accurately mapped 3 planting geometries. The south-facing orientation and partial brick retaining wall provide high heat retention, ideal for Mediterranean herbs, cascading bush tomatoes, and climbing greens.
      </p>

      {/* 3 Zone Mini-Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-5">
        {/* Railing Tier */}
        <div
          onClick={() => {
            const z = zones.find((item) => item.id === 'railing-tier');
            if (z) onSelectZone(z);
          }}
          className="bg-[#f2f4ee] hover:bg-[#e7e9e3] cursor-pointer rounded-xl p-2.5 sm:p-3 transition-colors border border-transparent hover:border-[#18392b]/10"
        >
          <div className="text-[11px] text-[#414844] font-medium leading-none mb-1">
            Railing Tier
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-[#7a2f15] leading-tight mb-1">
            Full Sun
          </div>
          <div className="text-[10px] sm:text-[11px] text-[#727974] leading-tight font-telemetry">
            Herbs, Peppers
          </div>
        </div>

        {/* Floor Zone */}
        <div
          onClick={() => {
            const z = zones.find((item) => item.id === 'floor-zone-a');
            if (z) onSelectZone(z);
          }}
          className="bg-[#f2f4ee] hover:bg-[#e7e9e3] cursor-pointer rounded-xl p-2.5 sm:p-3 transition-colors border border-transparent hover:border-[#18392b]/10"
        >
          <div className="text-[11px] text-[#414844] font-medium leading-none mb-1">
            Floor Zone
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-[#2c694e] leading-tight mb-1">
            Part Shade
          </div>
          <div className="text-[10px] sm:text-[11px] text-[#727974] leading-tight font-telemetry">
            Leafy Greens
          </div>
        </div>

        {/* Wall Trellis */}
        <div
          onClick={() => {
            const z = zones.find((item) => item.id === 'wall-trellis');
            if (z) onSelectZone(z);
          }}
          className="bg-[#f2f4ee] hover:bg-[#e7e9e3] cursor-pointer rounded-xl p-2.5 sm:p-3 transition-colors border border-transparent hover:border-[#18392b]/10"
        >
          <div className="text-[11px] text-[#414844] font-medium leading-none mb-1">
            Wall Trellis
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-[#191c19] leading-tight mb-1">
            Morning Sun
          </div>
          <div className="text-[10px] sm:text-[11px] text-[#727974] leading-tight font-telemetry">
            Runner Beans
          </div>
        </div>
      </div>

      {/* Action Buttons: Rescan & Analyze */}
      <div className="flex items-center gap-2.5">
        {/* Rescan Button */}
        <button
          onClick={onRescan}
          disabled={isRescanning}
          className="bg-[#edefe9] hover:bg-[#e1e3dd] active:scale-95 text-[#191c19] font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className={`w-4 h-4 text-[#191c19] ${isRescanning ? 'animate-spin' : ''}`} />
          <span>Rescan</span>
        </button>

        {/* Analyze & Generate Plan Button */}
        <button
          onClick={onAnalyzePlan}
          className="flex-1 bg-[#012317] hover:bg-[#18392b] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-[#aeeecb] group-hover:rotate-12 transition-transform" />
          <span>Analyze &amp; Generate Plan</span>
        </button>
      </div>
    </div>
  );
};
