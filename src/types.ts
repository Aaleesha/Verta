export type ScanMode = 'lidar' | 'thermal' | 'spatial';

export type TabType = 'scan' | 'picks' | 'visualizer' | 'care';

export interface SpatialZone {
  id: string;
  name: string;
  badge: string;
  badgeType: 'sun' | 'shade' | 'morning';
  dimensions: string;
  exposure: string;
  directSunHours: number;
  areaSqMeters: number;
  orientation: string;
  recommendedCrops: string[];
  recommendedTypes: string;
  currentPlanted?: string[];
  pos: {
    top: string;
    left: string;
    lidarAnchor: { x: number; y: number };
  };
}

export interface PlantCrop {
  id: string;
  name: string;
  latinName: string;
  category: 'herb' | 'vegetable' | 'fruit' | 'climber' | 'leafy';
  suitableZones: string[];
  matchScore: number;
  sunlight: 'Full Sun' | 'Partial Shade' | 'Morning Sun' | 'Any';
  sunHoursNeeded: number;
  waterNeed: 'Low' | 'Moderate' | 'High';
  rootDepthCm: number;
  daysToHarvest: number;
  expectedYieldKg: number;
  companionWith: string[];
  pestDeterrent: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface SensorData {
  solarYieldHours: number;
  solarYieldPeak: string;
  currentLux: number;
  aeroProfile: string;
  aeroSub: string;
  windSpeedKmh: number;
  ambientTempC: number;
  brickThermalTempC: number;
  humidityPercent: number;
  uvIndex: number;
  soilMoistureZones: {
    zoneId: string;
    name: string;
    moisturePercent: number;
    status: 'optimal' | 'dry' | 'damp';
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  handle: string;
  avatarUrl: string;
  level: string;
  joinedDate: string;
  balconyType: string;
  isLoggedIn: boolean;
  totalHarvestKg: number;
  speciesActive: number;
}

export interface SystemSettings {
  tempUnit: 'celsius' | 'fahrenheit';
  lidarSensitivity: 'high' | 'balanced' | 'power-saver';
  autoWateringAlerts: boolean;
  solarTrackingNotifications: boolean;
  hapticFeedback: boolean;
  meshResolution: 'ultra' | 'standard' | 'coarse';
}

