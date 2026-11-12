import React, { useState } from 'react';
import { Search, Filter, Sparkles, Droplets, Sun, Calendar, Plus, Check, Info } from 'lucide-react';
import { PLANT_CATALOG } from '../data/mockData';
import { PlantCrop, SpatialZone } from '../types';

interface PicksViewProps {
  zones: SpatialZone[];
  onAddCropToZone: (zoneId: string, cropName: string) => void;
  onOpenPlantDetail?: (plant: PlantCrop) => void;
}

export const PicksView: React.FC<PicksViewProps> = ({
  zones,
  onAddCropToZone
}) => {
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlantDetail, setSelectedPlantDetail] = useState<PlantCrop | null>(null);

  // Filter crops
  const filteredPlants = PLANT_CATALOG.filter((p) => {
    const matchesZone =
      selectedZoneFilter === 'all' || p.suitableZones.includes(selectedZoneFilter);
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    return matchesZone && matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 px-4 pt-3 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
            BIO-ALGORITHMIC SEED BANK
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#191c19] tracking-tight">
          Microclimate Plant Picks
        </h2>
        <p className="text-xs text-[#414844] mt-1 leading-relaxed">
          Cultivars dynamically matched to your South Balcony LiDAR mesh, solar irradiance curves, and brick thermal retention profiles.
        </p>

        {/* Search input */}
        <div className="relative mt-3.5">
          <Search className="w-4 h-4 text-[#727974] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search herbs, tomatoes, leafy greens..."
            className="w-full bg-[#f2f4ee] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#191c19] placeholder-[#727974] border border-transparent focus:border-[#2c694e] focus:bg-white outline-none transition-all"
          />
        </div>
      </div>

      {/* Zone Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedZoneFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedZoneFilter === 'all'
              ? 'bg-[#012317] text-white shadow-xs'
              : 'bg-white text-[#414844] border border-[#18392b]/10 hover:bg-[#f2f4ee]'
          }`}
        >
          All Microclimates ({PLANT_CATALOG.length})
        </button>

        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZoneFilter(zone.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedZoneFilter === zone.id
                ? 'bg-[#012317] text-white shadow-xs'
                : 'bg-white text-[#414844] border border-[#18392b]/10 hover:bg-[#f2f4ee]'
            }`}
          >
            {zone.name} ({zone.badge})
          </button>
        ))}
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredPlants.map((plant) => {
          // Check which zone it is currently planted in
          const isPlanted = zones.some((z) => z.currentPlanted?.includes(plant.name));

          return (
            <div
              key={plant.id}
              className="bg-white rounded-3xl p-4 border border-[#18392b]/10 shadow-xs hover:border-[#2c694e]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 group">
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#012317]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-telemetry font-bold text-[#aeeecb] flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{plant.matchScore}% Match</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-telemetry text-white font-medium">
                    {plant.sunlight}
                  </div>
                </div>

                {/* Name & Latin */}
                <div className="mb-2">
                  <h3 className="font-extrabold text-base text-[#191c19] tracking-tight leading-snug">
                    {plant.name}
                  </h3>
                  <div className="text-xs text-[#727974] italic">
                    {plant.latinName}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#414844] leading-relaxed mb-3">
                  {plant.description}
                </p>

                {/* Microclimate Telemetry Pill Row */}
                <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-xl bg-[#f2f4ee] mb-3 text-center">
                  <div>
                    <div className="text-[9px] font-telemetry uppercase text-[#727974] font-semibold">
                      Yield
                    </div>
                    <div className="text-xs font-bold text-[#012317]">
                      ~{plant.expectedYieldKg} kg
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-telemetry uppercase text-[#727974] font-semibold">
                      Harvest
                    </div>
                    <div className="text-xs font-bold text-[#012317]">
                      {plant.daysToHarvest} days
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-telemetry uppercase text-[#727974] font-semibold">
                      Water
                    </div>
                    <div className="text-xs font-bold text-[#012317]">
                      {plant.waterNeed}
                    </div>
                  </div>
                </div>

                {/* Companion Synergy Note */}
                <div className="text-[11px] text-[#2c694e] font-medium bg-[#aeeecb]/20 px-2.5 py-1.5 rounded-xl mb-3 flex items-start gap-1.5">
                  <span className="font-bold text-[#0e5138] shrink-0 font-telemetry">
                    Synergy:
                  </span>
                  <span>{plant.pestDeterrent}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#18392b]/5">
                <button
                  onClick={() => setSelectedPlantDetail(plant)}
                  className="px-3 py-2 text-xs font-semibold text-[#414844] hover:text-[#012317] rounded-xl hover:bg-[#f2f4ee] transition-colors"
                >
                  Inspect
                </button>

                <button
                  onClick={() => {
                    const targetZoneId = plant.suitableZones[0];
                    if (targetZoneId) onAddCropToZone(targetZoneId, plant.name);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isPlanted
                      ? 'bg-[#aeeecb]/50 text-[#0e5138]'
                      : 'bg-[#012317] hover:bg-[#18392b] text-white active:scale-95'
                  }`}
                >
                  {isPlanted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In Balcony Plan</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Deploy to {zones.find((z) => z.id === plant.suitableZones[0])?.name || 'Balcony'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botanical Inspector Detail Modal */}
      {selectedPlantDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-3xl p-5 shadow-2xl border border-[#18392b]/15 space-y-3.5 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-telemetry font-bold text-[#2c694e] uppercase tracking-wider">
                  BOTANICAL AGRONOMIC CARD
                </span>
                <h3 className="text-xl font-extrabold text-[#191c19]">
                  {selectedPlantDetail.name}
                </h3>
                <div className="text-xs text-[#727974] italic">
                  {selectedPlantDetail.latinName}
                </div>
              </div>
              <button
                onClick={() => setSelectedPlantDetail(null)}
                className="w-7 h-7 rounded-full bg-[#f2f4ee] hover:bg-[#e1e3dd] flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedPlantDetail.imageUrl}
              alt={selectedPlantDetail.name}
              className="w-full h-44 object-cover rounded-2xl"
            />

            <div className="text-xs text-[#414844] leading-relaxed">
              {selectedPlantDetail.description}
            </div>

            <div className="bg-[#f2f4ee] p-3 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#727974]">Root Depth Requirement:</span>
                <span className="font-bold text-[#012317]">
                  {selectedPlantDetail.rootDepthCm} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#727974]">Daily Direct Sun:</span>
                <span className="font-bold text-[#7a2f15]">
                  {selectedPlantDetail.sunHoursNeeded}+ hours
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#727974]">Companion Partners:</span>
                <span className="font-bold text-[#2c694e]">
                  {selectedPlantDetail.companionWith.join(', ')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const targetZoneId = selectedPlantDetail.suitableZones[0];
                if (targetZoneId) {
                  onAddCropToZone(targetZoneId, selectedPlantDetail.name);
                  setSelectedPlantDetail(null);
                }
              }}
              className="w-full py-3 bg-[#012317] hover:bg-[#18392b] text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Cultivar to Balcony System</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
