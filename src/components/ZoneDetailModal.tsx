import React from 'react';
import { X, Sun, Wind, Maximize2, Check, ArrowRight, ShieldCheck, Droplet, Sprout } from 'lucide-react';
import { SpatialZone, PlantCrop } from '../types';
import { PLANT_CATALOG } from '../data/mockData';

interface ZoneDetailModalProps {
  zone: SpatialZone | null;
  onClose: () => void;
  onAddCropToZone: (zoneId: string, cropName: string) => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({
  zone,
  onClose,
  onAddCropToZone
}) => {
  if (!zone) return null;

  const suitablePlants = PLANT_CATALOG.filter((p) =>
    p.suitableZones.includes(zone.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f8faf4] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#18392b]/15 animate-in slide-in-from-bottom duration-250">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-[#18392b]/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#52b788] animate-pulse" />
            <div>
              <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
                LIDAR ZONE TELEMETRY
              </span>
              <h3 className="text-lg font-extrabold text-[#012317] leading-tight">
                {zone.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edefe9] hover:bg-[#e1e3dd] flex items-center justify-center text-[#191c19] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-white p-3 rounded-2xl border border-[#18392b]/10 text-center">
              <div className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-semibold mb-1">
                Dimensions
              </div>
              <div className="text-sm font-extrabold text-[#191c19]">
                {zone.dimensions.split(' ')[0]}
              </div>
              <div className="text-[10px] text-[#2c694e] font-telemetry font-bold">
                {zone.areaSqMeters} m² surface
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#18392b]/10 text-center">
              <div className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-semibold mb-1">
                Solar Yield
              </div>
              <div className="text-sm font-extrabold text-[#7a2f15]">
                {zone.directSunHours} hrs/day
              </div>
              <div className="text-[10px] text-[#727974] font-telemetry font-medium">
                {zone.badge}
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#18392b]/10 text-center">
              <div className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-semibold mb-1">
                Orientation
              </div>
              <div className="text-sm font-extrabold text-[#012317] truncate">
                {zone.orientation.split(' ')[0]}
              </div>
              <div className="text-[10px] text-[#2c694e] font-telemetry font-bold">
                Optimized
              </div>
            </div>
          </div>

          {/* Microclimate Profile Summary */}
          <div className="bg-white p-4 rounded-2xl border border-[#18392b]/10">
            <h4 className="text-xs font-telemetry uppercase tracking-wider text-[#2c694e] font-bold mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2c694e]" />
              Bio-Algorithmic Exposure Profile
            </h4>
            <p className="text-xs text-[#414844] leading-relaxed mb-3">
              {zone.exposure}. This micro-niche benefits from structured airflow patterns and thermal buffer dynamics mapped via infrared LiDAR surface topology.
            </p>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-telemetry bg-[#f2f4ee] text-[#191c19] px-2.5 py-1 rounded-full font-medium">
                Target Crops: {zone.recommendedTypes}
              </span>
              <span className="text-[11px] font-telemetry bg-[#aeeecb]/40 text-[#0e5138] px-2.5 py-1 rounded-full font-bold">
                Root Depth: Up to 25cm
              </span>
            </div>
          </div>

          {/* Currently Planted / Planned */}
          {zone.currentPlanted && zone.currentPlanted.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-[#18392b]/10">
              <div className="text-xs font-telemetry uppercase tracking-wider text-[#727974] font-bold mb-2 flex items-center justify-between">
                <span>Active Crops in Zone</span>
                <span className="text-[#2c694e] font-bold font-telemetry">
                  {zone.currentPlanted.length} Cultivars
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {zone.currentPlanted.map((cropName) => (
                  <div
                    key={cropName}
                    className="flex items-center gap-1.5 bg-[#f2f4ee] border border-[#18392b]/10 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#012317]"
                  >
                    <Sprout className="w-3.5 h-3.5 text-[#2c694e]" />
                    <span>{cropName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Bio-Algorithmic Matches for this zone */}
          <div>
            <h4 className="text-xs font-telemetry uppercase tracking-wider text-[#012317] font-bold mb-2.5 flex items-center justify-between">
              <span>Bio-Compatible Matches ({suitablePlants.length})</span>
              <span className="text-[11px] text-[#2c694e]">LiDAR Ranked</span>
            </h4>

            <div className="space-y-2">
              {suitablePlants.map((plant) => {
                const isPlanted = zone.currentPlanted?.includes(plant.name);
                return (
                  <div
                    key={plant.id}
                    className="bg-white p-3 rounded-2xl border border-[#18392b]/10 flex items-center justify-between gap-3 hover:border-[#2c694e]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={plant.imageUrl}
                        alt={plant.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs sm:text-sm text-[#191c19]">
                            {plant.name}
                          </span>
                          <span className="text-[10px] font-telemetry font-bold px-1.5 py-0.2 rounded bg-[#aeeecb] text-[#002115]">
                            {plant.matchScore}%
                          </span>
                        </div>
                        <div className="text-[11px] text-[#727974] italic">
                          {plant.latinName}
                        </div>
                        <div className="text-[10px] text-[#414844] font-telemetry mt-0.5">
                          Yield: ~{plant.expectedYieldKg}kg • {plant.daysToHarvest}d to harvest
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddCropToZone(zone.id, plant.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        isPlanted
                          ? 'bg-[#aeeecb]/50 text-[#0e5138]'
                          : 'bg-[#012317] hover:bg-[#18392b] text-white active:scale-95'
                      }`}
                    >
                      {isPlanted ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" /> Planted
                        </span>
                      ) : (
                        'Add'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
