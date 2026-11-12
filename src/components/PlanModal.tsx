import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Download,
  Check,
  Calendar,
  Layers,
  Droplet,
  Scale,
  Sun,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { SpatialZone } from '../types';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: SpatialZone[];
}

export const PlanModal: React.FC<PlanModalProps> = ({
  isOpen,
  onClose,
  zones
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'chef' | 'nutrition' | 'yield' | 'drought'>('chef');
  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState(false);

  if (!isOpen) return null;

  const handleApplyPreset = (presetKey: 'chef' | 'nutrition' | 'yield' | 'drought') => {
    setSelectedPreset(presetKey);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAppliedNotification(true);
      setTimeout(() => setAppliedNotification(false), 2500);
    }, 600);
  };

  const getPresetData = () => {
    switch (selectedPreset) {
      case 'chef':
        return {
          title: 'Mediterranean Culinary Kitchen',
          focus: 'Aromatics, Fresh Caprese Salad & Pasta Greens',
          railing: 'Genovese Basil, Roma Micro-Tomatoes, Greek Oregano',
          floor: 'Wild Rocket Arugula, French Breakfast Radishes',
          trellis: 'Scarlet Runner Beans (Vertical Green Screen)',
          harvestKg: 15.4,
          waterLiters: 12.8,
          efficiency: 94
        };
      case 'nutrition':
        return {
          title: 'High-Density Antioxidant Green Machine',
          focus: 'Vitamins A/C/K, Iron, Polyphenols & Living Enzymes',
          railing: 'Dwarf Bell Peppers, Thai Hot Chilis, Thyme',
          floor: 'Tuscan Lacinato Kale, Rainbow Swiss Chard, Spinach',
          trellis: 'Sugar Snap Climbing Peas & Malabar Spinach',
          harvestKg: 18.2,
          waterLiters: 14.1,
          efficiency: 97
        };
      case 'yield':
        return {
          title: 'Max-Biomass High-Yield Harvest',
          focus: 'Maximum edible caloric and kilogram output',
          railing: 'Cascading Bush Roma Tomatoes, Jalapeño Peppers',
          floor: 'Butterhead Lettuce, Alpine Strawberries, Bush Beans',
          trellis: 'Heavy Bearing Scarlet Runner Pods (5.6 kg)',
          harvestKg: 21.6,
          waterLiters: 16.5,
          efficiency: 98
        };
      case 'drought':
        return {
          title: 'Low-Maintenance Xerophytic Botanical',
          focus: 'Resilient herbs requiring only 1 watering every 7 days',
          railing: 'Prostrate Rosemary, English Thyme, Greek Oregano',
          floor: 'Wild Rocket Arugula, Self-Seeding Purslane',
          trellis: 'Hardy Climbing Clematis & Passionfruit Vine',
          harvestKg: 9.8,
          waterLiters: 6.2,
          efficiency: 89
        };
    }
  };

  const plan = getPresetData();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f8faf4] w-full max-w-xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#18392b]/15 animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-[#18392b]/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#012317] flex items-center justify-center text-[#aeeecb]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
                BIO-ALGORITHMIC MASTER PLAN
              </span>
              <h3 className="text-lg font-extrabold text-[#012317] leading-tight">
                {plan.title}
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
          {appliedNotification && (
            <div className="bg-[#aeeecb] text-[#002115] text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Bio-Algorithmic Layout recalculated and synchronized with LiDAR mesh!</span>
            </div>
          )}

          {/* Preset Selector */}
          <div>
            <div className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold mb-2">
              Optimize Planting Objective
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'chef', label: 'Chef Kitchen', icon: '🌿' },
                { id: 'nutrition', label: 'Nutrient Dense', icon: '🥗' },
                { id: 'yield', label: 'Max Yield', icon: '⚖️' },
                { id: 'drought', label: 'Low Water', icon: '💧' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleApplyPreset(p.id as any)}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedPreset === p.id
                      ? 'bg-[#012317] text-white border-[#012317] shadow-sm'
                      : 'bg-white text-[#414844] border-[#18392b]/10 hover:bg-[#f2f4ee]'
                  }`}
                >
                  <div className="text-base mb-1">{p.icon}</div>
                  <div className="text-xs font-bold leading-tight">{p.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* KPI Dashboard */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 text-center">
              <Scale className="w-4 h-4 text-[#2c694e] mx-auto mb-1" />
              <div className="text-base font-extrabold text-[#012317]">
                {plan.harvestKg} kg
              </div>
              <div className="text-[10px] text-[#727974] font-telemetry">
                Projected Bio-Yield
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 text-center">
              <Droplet className="w-4 h-4 text-[#2c694e] mx-auto mb-1" />
              <div className="text-base font-extrabold text-[#012317]">
                {plan.waterLiters} L
              </div>
              <div className="text-[10px] text-[#727974] font-telemetry">
                Weekly Drip Budget
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 text-center">
              <ShieldCheck className="w-4 h-4 text-[#d97757] mx-auto mb-1" />
              <div className="text-base font-extrabold text-[#012317]">
                {plan.efficiency}%
              </div>
              <div className="text-[10px] text-[#727974] font-telemetry">
                Solar Efficiency
              </div>
            </div>
          </div>

          {/* Zone Allocation Breakdown */}
          <div className="bg-white p-4 rounded-3xl border border-[#18392b]/10 space-y-3">
            <h4 className="text-xs font-telemetry uppercase tracking-wider text-[#012317] font-bold">
              Spatial Balcony Allocation
            </h4>

            {/* Railing Tier */}
            <div className="p-3 bg-[#f2f4ee] rounded-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-[#012317] mb-1">
                <span>Railing Tier (2.2m Linear Bracket)</span>
                <span className="text-[#7a2f15] font-telemetry text-[11px]">Full Sun • 6.8h</span>
              </div>
              <div className="text-xs text-[#414844] font-medium">
                {plan.railing}
              </div>
            </div>

            {/* Floor Zone A */}
            <div className="p-3 bg-[#f2f4ee] rounded-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-[#012317] mb-1">
                <span>Floor Zone A (1.8m × 0.6m Planter Base)</span>
                <span className="text-[#2c694e] font-telemetry text-[11px]">Part Shade • 4.5h</span>
              </div>
              <div className="text-xs text-[#414844] font-medium">
                {plan.floor}
              </div>
            </div>

            {/* Wall Trellis */}
            <div className="p-3 bg-[#f2f4ee] rounded-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-[#012317] mb-1">
                <span>Wall Trellis (1.4m × 2.0m Vertical)</span>
                <span className="text-[#012317] font-telemetry text-[11px]">Morning Sun • 3.8h</span>
              </div>
              <div className="text-xs text-[#414844] font-medium">
                {plan.trellis}
              </div>
            </div>
          </div>

          {/* 16-Week Crop Rotation Schedule */}
          <div className="bg-white p-4 rounded-3xl border border-[#18392b]/10">
            <h4 className="text-xs font-telemetry uppercase tracking-wider text-[#012317] font-bold mb-3 flex items-center justify-between">
              <span>16-Week Succession Timeline</span>
              <span className="text-[10px] text-[#2c694e] font-bold font-telemetry">Automated Cycle</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 pb-2 border-b border-[#18392b]/5">
                <span className="px-2 py-0.5 rounded-full bg-[#18392b] text-white text-[10px] font-telemetry font-bold shrink-0">
                  Wk 1-2
                </span>
                <div>
                  <div className="font-bold text-[#191c19]">Direct Seeding &amp; Sprouting</div>
                  <div className="text-[#727974] text-[11px]">Sow arugula &amp; radishes in Floor Zone A; install climbing bean plugs at Trellis base.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pb-2 border-b border-[#18392b]/5">
                <span className="px-2 py-0.5 rounded-full bg-[#2c694e] text-white text-[10px] font-telemetry font-bold shrink-0">
                  Wk 4-6
                </span>
                <div>
                  <div className="font-bold text-[#191c19]">First Greens Harvest &amp; Vine Training</div>
                  <div className="text-[#727974] text-[11px]">Cut-and-come-again harvest for wild rocket. Guide runner beans up vertical wire lattice.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#d97757] text-white text-[10px] font-telemetry font-bold shrink-0">
                  Wk 8-12
                </span>
                <div>
                  <div className="font-bold text-[#191c19]">Peak Fruiting &amp; Succession Sowing</div>
                  <div className="text-[#727974] text-[11px]">Harvest ripe Bush Roma tomatoes and sweet basil; re-sow autumn spinach in Floor Zone.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              onClick={() => {
                alert('Plan blueprint exported as PDF / Balcony CAD specification.');
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#012317] hover:bg-[#18392b] active:scale-[0.99] text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4 text-[#aeeecb]" />
              <span>Export Bio-Blueprint (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-2xl bg-[#edefe9] hover:bg-[#e1e3dd] text-[#191c19] text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
