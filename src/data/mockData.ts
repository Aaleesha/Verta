import { PlantCrop, SensorData, SpatialZone } from '../types';

export const INITIAL_ZONES: SpatialZone[] = [
  {
    id: 'wall-trellis',
    name: 'WALL TRELLIS',
    badge: 'Morning Sun',
    badgeType: 'morning',
    dimensions: '1.4m × 2.0m Vertical',
    exposure: 'Diffused Morning Light',
    directSunHours: 3.8,
    areaSqMeters: 2.8,
    orientation: 'South-East Vertical Facet',
    recommendedTypes: 'Runner Beans',
    recommendedCrops: ['Scarlet Runner Beans', 'Sugar Snap Peas', 'Climbing Malabar Spinach', 'Alpine Clematis'],
    currentPlanted: ['Scarlet Runner Beans'],
    pos: {
      top: '19%',
      left: '4%',
      lidarAnchor: { x: 22, y: 38 }
    }
  },
  {
    id: 'railing-tier',
    name: 'RAILING TIER',
    badge: 'Full Sun',
    badgeType: 'sun',
    dimensions: '2.2m Linear Bracket Zone',
    exposure: '6.8 hrs direct sun • Solar Peak',
    directSunHours: 6.8,
    areaSqMeters: 0.9,
    orientation: 'Unobstructed South Horizon',
    recommendedTypes: 'Herbs, Peppers',
    recommendedCrops: ['Genovese Basil', 'Thai Birdseye Chili', 'Greek Dwarf Oregano', 'Bush Roma Tomato'],
    currentPlanted: ['Genovese Basil', 'Thai Birdseye Chili'],
    pos: {
      top: '25%',
      left: '48%',
      lidarAnchor: { x: 50, y: 31 }
    }
  },
  {
    id: 'floor-zone-a',
    name: 'FLOOR ZONE A',
    badge: 'Partial Shade',
    badgeType: 'shade',
    dimensions: '1.8m × 0.6m Planter Base',
    exposure: '4.5 hrs direct sun • Wind Shielded',
    directSunHours: 4.5,
    areaSqMeters: 1.08,
    orientation: 'Protected Floor Slab (Behind Railing)',
    recommendedTypes: 'Leafy Greens',
    recommendedCrops: ['Tuscan Lacinato Kale', 'Wild Rocket Arugula', 'Butterhead Lettuce', 'French Breakfast Radish'],
    currentPlanted: ['Tuscan Lacinato Kale', 'Wild Rocket Arugula'],
    pos: {
      top: '36%',
      left: '5%',
      lidarAnchor: { x: 64, y: 36 }
    }
  }
];

export const INITIAL_SENSOR_DATA: SensorData = {
  solarYieldHours: 5.8,
  solarYieldPeak: '11:30 - 15:00',
  currentLux: 52400,
  aeroProfile: 'Moderate',
  aeroSub: 'SW Buffering • Sheltered',
  windSpeedKmh: 14,
  ambientTempC: 24.2,
  brickThermalTempC: 28.6,
  humidityPercent: 48,
  uvIndex: 7.4,
  soilMoistureZones: [
    { zoneId: 'railing-tier', name: 'Railing Bracket Tier', moisturePercent: 42, status: 'dry' },
    { zoneId: 'floor-zone-a', name: 'Floor Sub-Irrigated Bed', moisturePercent: 64, status: 'optimal' },
    { zoneId: 'wall-trellis', name: 'Vertical Trellis Root Basin', moisturePercent: 58, status: 'optimal' }
  ]
};

export const PLANT_CATALOG: PlantCrop[] = [
  {
    id: 'basil-genovese',
    name: 'Genovese Sweet Basil',
    latinName: 'Ocimum basilicum',
    category: 'herb',
    suitableZones: ['railing-tier'],
    matchScore: 98,
    sunlight: 'Full Sun',
    sunHoursNeeded: 6,
    waterNeed: 'Moderate',
    rootDepthCm: 18,
    daysToHarvest: 28,
    expectedYieldKg: 1.4,
    companionWith: ['Bush Roma Tomato', 'Thai Birdseye Chili'],
    pestDeterrent: 'Repels thrips & whiteflies; enhances tomato sweetness',
    description: 'Thrives under the high solar irradiance of the Railing Tier. Deep green, aromatic leaves packed with essential oils.',
    imageUrl: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80',
    tags: ['Culinary', 'Fast Growth', 'High UV Resistant']
  },
  {
    id: 'chili-birdseye',
    name: "Thai Bird's Eye Chili",
    latinName: 'Capsicum annuum',
    category: 'vegetable',
    suitableZones: ['railing-tier'],
    matchScore: 96,
    sunlight: 'Full Sun',
    sunHoursNeeded: 7,
    waterNeed: 'Low',
    rootDepthCm: 22,
    daysToHarvest: 65,
    expectedYieldKg: 2.1,
    companionWith: ['Genovese Sweet Basil', 'Greek Dwarf Oregano'],
    pestDeterrent: 'Capsaicin scent deters chewing insects and aphids',
    description: 'Perfect for south-facing high-heat bracket planters. High fruit set under concentrated midday solar exposure.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    tags: ['Compact', 'Heat Loving', 'Heavy Producer']
  },
  {
    id: 'tomato-bush',
    name: 'Bush Roma Micro-Tomato',
    latinName: 'Solanum lycopersicum var. humile',
    category: 'fruit',
    suitableZones: ['railing-tier', 'floor-zone-a'],
    matchScore: 94,
    sunlight: 'Full Sun',
    sunHoursNeeded: 6.5,
    waterNeed: 'High',
    rootDepthCm: 25,
    daysToHarvest: 55,
    expectedYieldKg: 4.8,
    companionWith: ['Genovese Sweet Basil', 'French Breakfast Radish'],
    pestDeterrent: 'Glandular leaf trichomes trap microscopic pests',
    description: 'Determinate dwarf tomato bred for container bracket cultivation without sprawling vine mess.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    tags: ['Heavy Feeder', 'Cascading', 'Vitamin C']
  },
  {
    id: 'arugula-wild',
    name: 'Wild Rocket Arugula',
    latinName: 'Diplotaxis tenuifolia',
    category: 'leafy',
    suitableZones: ['floor-zone-a'],
    matchScore: 97,
    sunlight: 'Partial Shade',
    sunHoursNeeded: 4.0,
    waterNeed: 'Moderate',
    rootDepthCm: 15,
    daysToHarvest: 24,
    expectedYieldKg: 1.8,
    companionWith: ['Bush Roma Micro-Tomato', 'French Breakfast Radish'],
    pestDeterrent: 'Mustard glycosides discourage soil nematodes',
    description: 'Peppery salad staple. Does not bolt prematurely due to Floor Zone A’s lower midday heat accumulation.',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    tags: ['Quick Cropping', 'Peppery', 'Self-Seeding']
  },
  {
    id: 'beans-scarlet',
    name: 'Scarlet Runner Beans',
    latinName: 'Phaseolus coccineus',
    category: 'climber',
    suitableZones: ['wall-trellis'],
    matchScore: 99,
    sunlight: 'Morning Sun',
    sunHoursNeeded: 4,
    waterNeed: 'High',
    rootDepthCm: 28,
    daysToHarvest: 60,
    expectedYieldKg: 5.6,
    companionWith: ['Bush Roma Micro-Tomato', 'Sweet Spearmint'],
    pestDeterrent: 'Vigorous vertical foliage attracts beneficial pollinators',
    description: 'Ideal for the 2.0m vertical wall trellis. Climbs naturally, providing thermal shade for the apartment wall and heavy pod yields.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    tags: ['Nitrogen Fixer', 'Vertical Bio-Shield', 'Edible Flowers']
  },
  {
    id: 'oregano-greek',
    name: 'Greek Dwarf Oregano',
    latinName: 'Origanum vulgare subsp. hirtum',
    category: 'herb',
    suitableZones: ['railing-tier'],
    matchScore: 93,
    sunlight: 'Full Sun',
    sunHoursNeeded: 6,
    waterNeed: 'Low',
    rootDepthCm: 16,
    daysToHarvest: 35,
    expectedYieldKg: 0.9,
    companionWith: ['Genovese Sweet Basil', 'Thai Birdseye Chili'],
    pestDeterrent: 'Potent carvacrol vapors naturally repel white cabbage butterflies',
    description: 'Drought-hardy perennial that enjoys dry, windy microclimates on the top balcony railing.',
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80',
    tags: ['Perennial', 'Low Water', 'Pollinator Magnet']
  },
  {
    id: 'strawberries-alpine',
    name: 'Alpine Woodland Strawberry',
    latinName: 'Fragaria vesca',
    category: 'fruit',
    suitableZones: ['floor-zone-a', 'wall-trellis'],
    matchScore: 91,
    sunlight: 'Partial Shade',
    sunHoursNeeded: 4.5,
    waterNeed: 'Moderate',
    rootDepthCm: 18,
    daysToHarvest: 50,
    expectedYieldKg: 1.2,
    companionWith: ['Wild Rocket Arugula', 'Bush Roma Micro-Tomato'],
    pestDeterrent: 'Acts as living mulch suppressing weed growth',
    description: 'Produces intensely sweet wild berries continuously from late spring until first frost.',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    tags: ['Sweet Fruit', 'Continuous Harvest', 'Evergreen']
  }
];

export const BALCONY_SCENARIOS = [
  {
    id: 'south-balcony',
    name: 'South Balcony (12th Fl)',
    orientation: 'South 182°',
    temp: '24°C High UV',
    solarHours: '5.8 hrs/day',
    bgImage: 'https://images.unsplash.com/photo-1545048702-7936070012f7?auto=format&fit=crop&w=1200&q=85',
    description: 'High solar yield balcony with city skyline vistas and partial wind protection.'
  },
  {
    id: 'east-terrace',
    name: 'East Morning Terrace (7th Fl)',
    orientation: 'East 088°',
    temp: '21°C Mild UV',
    solarHours: '4.9 hrs/day',
    bgImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85',
    description: 'Soft morning light ideal for delicate leafy greens and moisture-retaining moss planters.'
  },
  {
    id: 'sunset-penthouse',
    name: 'West Penthouse Deck (22nd Fl)',
    orientation: 'West 265°',
    temp: '27°C Intense Heat',
    solarHours: '6.4 hrs/day',
    bgImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    description: 'High wind shear and late afternoon heat sink. Suited for drought-tolerant Mediterranean xerophytic plants.'
  }
];
