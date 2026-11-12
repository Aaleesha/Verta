import React, { useState } from 'react';
import {
  Droplets,
  Sun,
  Wind,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Bell,
  RefreshCw,
  Sparkles,
  Droplet
} from 'lucide-react';
import { SensorData, SpatialZone } from '../types';

interface CareViewProps {
  sensors: SensorData;
  zones: SpatialZone[];
}

export const CareView: React.FC<CareViewProps> = ({ sensors, zones }) => {
  const [moistureData, setMoistureData] = useState(sensors.soilMoistureZones);
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Water Railing Bracket Zone',
      zone: 'Railing Tier',
      crop: 'Genovese Basil & Thai Chili',
      urgent: true,
      completed: false,
      note: 'Moisture dropped to 42% under high midday irradiance.'
    },
    {
      id: 'task-2',
      title: 'Pinch Off Early Sucker Shoots',
      zone: 'Railing Tier',
      crop: 'Bush Roma Micro-Tomato',
      urgent: false,
      completed: false,
      note: 'Focus solar energy into central fruit trusses.'
    },
    {
      id: 'task-3',
      title: 'Harvest Outer Lacinato Kale Leaves',
      zone: 'Floor Zone A',
      crop: 'Tuscan Lacinato Kale',
      urgent: false,
      completed: true,
      note: 'Encourages new crown foliage production.'
    },
    {
      id: 'task-4',
      title: 'Check Trellis Vine Tension',
      zone: 'Wall Trellis',
      crop: 'Scarlet Runner Beans',
      urgent: false,
      completed: false,
      note: 'Vertical runners nearing 1.8m height.'
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleWaterZone = (zoneId: string) => {
    setMoistureData((prev) =>
      prev.map((z) =>
        z.zoneId === zoneId ? { ...z, moisturePercent: 72, status: 'optimal' } : z
      )
    );
    // Auto-complete water task if present
    setTasks((prev) =>
      prev.map((t) =>
        t.id === 'task-1' ? { ...t, completed: true } : t
      )
    );
  };

  return (
    <div className="pb-24 px-4 pt-3 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
            MICROCLIMATE VITALS &amp; CARE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#191c19] tracking-tight">
          Balcony Crop Care
        </h2>
        <p className="text-xs text-[#414844] mt-1 leading-relaxed">
          Real-time telemetry from capacitive soil probes, thermal retaining wall sensors, and solar radiation index.
        </p>
      </div>

      {/* Sensor Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Ambient & Thermal */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 shadow-xs">
          <div className="flex items-center justify-between text-[#727974] mb-1">
            <span className="text-[10px] font-telemetry uppercase tracking-wider font-semibold">
              Ambient
            </span>
            <Thermometer className="w-3.5 h-3.5 text-[#d97757]" />
          </div>
          <div className="text-xl font-extrabold text-[#191c19]">
            {sensors.ambientTempC}°C
          </div>
          <div className="text-[10px] text-[#2c694e] font-telemetry mt-0.5 font-medium">
            Brick Wall: {sensors.brickThermalTempC}°C
          </div>
        </div>

        {/* Solar Radiation */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 shadow-xs">
          <div className="flex items-center justify-between text-[#727974] mb-1">
            <span className="text-[10px] font-telemetry uppercase tracking-wider font-semibold">
              Solar Lux
            </span>
            <Sun className="w-3.5 h-3.5 text-[#f4a261]" />
          </div>
          <div className="text-xl font-extrabold text-[#191c19]">
            {(sensors.currentLux / 1000).toFixed(1)}k
          </div>
          <div className="text-[10px] text-[#d97757] font-telemetry mt-0.5 font-medium">
            UV Index: {sensors.uvIndex} (High)
          </div>
        </div>

        {/* Wind Profile */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 shadow-xs">
          <div className="flex items-center justify-between text-[#727974] mb-1">
            <span className="text-[10px] font-telemetry uppercase tracking-wider font-semibold">
              Wind Aero
            </span>
            <Wind className="w-3.5 h-3.5 text-[#2c694e]" />
          </div>
          <div className="text-xl font-extrabold text-[#191c19]">
            {sensors.windSpeedKmh} km/h
          </div>
          <div className="text-[10px] text-[#2c694e] font-telemetry mt-0.5 font-medium">
            SW Glass Baffled
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 shadow-xs">
          <div className="flex items-center justify-between text-[#727974] mb-1">
            <span className="text-[10px] font-telemetry uppercase tracking-wider font-semibold">
              Humidity
            </span>
            <Droplets className="w-3.5 h-3.5 text-[#2c694e]" />
          </div>
          <div className="text-xl font-extrabold text-[#191c19]">
            {sensors.humidityPercent}%
          </div>
          <div className="text-[10px] text-[#2c694e] font-telemetry mt-0.5 font-medium">
            VPD: 1.1 kPa (Good)
          </div>
        </div>
      </div>

      {/* Soil Moisture per Zone */}
      <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#191c19] tracking-tight mb-3 flex items-center justify-between">
          <span>Substrate Soil Moisture Sensors</span>
          <span className="text-[11px] font-telemetry text-[#2c694e] font-bold">
            3 Telemetry Nodes
          </span>
        </h3>

        <div className="space-y-3">
          {moistureData.map((node) => {
            const isDry = node.status === 'dry' || node.moisturePercent < 50;
            return (
              <div
                key={node.zoneId}
                className="p-3.5 rounded-2xl bg-[#f2f4ee] border border-[#18392b]/5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#012317]">
                      {node.name}
                    </span>
                    <span
                      className={`ml-2 text-[10px] font-telemetry font-bold px-2 py-0.5 rounded-full ${
                        isDry
                          ? 'bg-[#601c03] text-[#ffdbd0]'
                          : 'bg-[#aeeecb] text-[#002115]'
                      }`}
                    >
                      {isDry ? 'Watering Triggered' : 'Optimal Hydration'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-telemetry font-extrabold text-sm text-[#012317]">
                      {node.moisturePercent}%
                    </span>
                    {isDry && (
                      <button
                        onClick={() => handleWaterZone(node.zoneId)}
                        className="px-2.5 py-1 bg-[#2c694e] hover:bg-[#18392b] text-white text-[10px] font-bold rounded-lg cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Droplet className="w-2.5 h-2.5" />
                        <span>Quick Soak</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDry ? 'bg-[#d97757]' : 'bg-[#52b788]'
                    }`}
                    style={{ width: `${node.moisturePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Agronomic Care Tasks */}
      <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#191c19] tracking-tight">
            Today’s Bio-Care Protocol
          </h3>
          <span className="text-[11px] font-telemetry text-[#727974] font-semibold">
            {tasks.filter((t) => t.completed).length}/{tasks.length} Completed
          </span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                task.completed
                  ? 'bg-[#f2f4ee]/70 border-transparent opacity-60'
                  : 'bg-white hover:bg-[#f2f4ee] border-[#18392b]/10'
              }`}
            >
              <div className="mt-0.5 text-[#2c694e] shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-[#2c694e]" />
                ) : (
                  <Circle className="w-4 h-4 text-[#727974]" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-extrabold ${
                      task.completed ? 'line-through text-[#727974]' : 'text-[#191c19]'
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.urgent && !task.completed && (
                    <span className="text-[9px] font-telemetry font-bold bg-[#ffb59e] text-[#390b00] px-1.5 py-0.2 rounded">
                      Action Needed
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#2c694e] font-telemetry font-semibold">
                  {task.zone} • {task.crop}
                </div>
                <div className="text-[11px] text-[#727974] mt-0.5">
                  {task.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
