import { Estuary } from './types';

export const INITIAL_ESTUARIES: Estuary[] = [
  // --- North America ---
  {
    id: 'chesapeake-bay',
    name: 'Chesapeake Bay',
    location: 'USA (MD/VA)',
    coordinates: { lat: 37.5, lng: -76.0 },
    shortDescription: 'The largest estuary in the United States, a drowned river valley.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/chesapeake/400/300'
  },
  {
    id: 'san-francisco-bay',
    name: 'San Francisco Bay',
    location: 'USA (CA)',
    coordinates: { lat: 37.8, lng: -122.4 },
    shortDescription: 'A complex shallow estuary heavily modified by human activity.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/sfbay/400/300'
  },
  {
    id: 'puget-sound',
    name: 'Puget Sound',
    location: 'USA (WA)',
    coordinates: { lat: 47.6, lng: -122.4 },
    shortDescription: 'A complex fjord system of flooded glacial valleys.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/puget/400/300'
  },
  {
    id: 'delaware-bay',
    name: 'Delaware Bay',
    location: 'USA (DE/NJ)',
    coordinates: { lat: 39.0, lng: -75.2 },
    shortDescription: 'A major estuary outlet for the Delaware River, critical for horseshoe crabs.',
    scale: 'Large',
    populationDensity: 'Medium',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/delaware/400/300'
  },
  {
    id: 'st-lawrence',
    name: 'Gulf of St. Lawrence',
    location: 'Canada',
    coordinates: { lat: 48.0, lng: -61.0 },
    shortDescription: 'One of the world\'s largest estuaries, with a unique two-layer flow.',
    scale: 'Massive',
    populationDensity: 'Medium',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/stlawrence/400/300'
  },
  {
    id: 'mississippi-delta',
    name: 'Mississippi River Delta',
    location: 'USA (LA)',
    coordinates: { lat: 29.1, lng: -89.2 },
    shortDescription: 'A bird-foot delta dominated by riverine sediment processes.',
    scale: 'Massive',
    populationDensity: 'Medium',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/mississippi/400/300'
  },
  {
    id: 'fraser-river',
    name: 'Fraser River Estuary',
    location: 'Canada (BC)',
    coordinates: { lat: 49.1, lng: -123.1 },
    shortDescription: 'A major delta on the Strait of Georgia, vital for salmon migration.',
    scale: 'Medium',
    populationDensity: 'High',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/fraser/400/300'
  },

  // --- South America ---
  {
    id: 'amazon-delta',
    name: 'Amazon Delta',
    location: 'Brazil',
    coordinates: { lat: -0.5, lng: -49.5 },
    shortDescription: 'The world\'s largest discharge of freshwater, creating a massive plume.',
    scale: 'Massive',
    populationDensity: 'Low',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/amazon/400/300'
  },
  {
    id: 'rio-de-la-plata',
    name: 'Rio de la Plata',
    location: 'Argentina/Uruguay',
    coordinates: { lat: -35.0, lng: -57.0 },
    shortDescription: 'A funnel-shaped estuary formed by the Uruguay and Paraná rivers.',
    scale: 'Massive',
    populationDensity: 'High',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/plata/400/300'
  },
  {
    id: 'lagoa-dos-patos',
    name: 'Lagoa dos Patos',
    location: 'Brazil',
    coordinates: { lat: -31.0, lng: -51.5 },
    shortDescription: 'The largest barrier-lagoon system in South America.',
    scale: 'Large',
    populationDensity: 'Medium',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/patos/400/300'
  },
  {
    id: 'orinoco-delta',
    name: 'Orinoco Delta',
    location: 'Venezuela',
    coordinates: { lat: 8.9, lng: -61.3 },
    shortDescription: 'A vast, fan-shaped delta largely covered in undisturbed rainforest.',
    scale: 'Large',
    populationDensity: 'Low',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/orinoco/400/300'
  },

  // --- Europe ---
  {
    id: 'thames-estuary',
    name: 'Thames Estuary',
    location: 'UK',
    coordinates: { lat: 51.5, lng: 0.6 },
    shortDescription: 'Macrotidal estuary with significant historic anthropogenic influence.',
    scale: 'Medium',
    populationDensity: 'High',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/thames/400/300'
  },
  {
    id: 'severn-estuary',
    name: 'Severn Estuary',
    location: 'UK',
    coordinates: { lat: 51.5, lng: -3.0 },
    shortDescription: 'Features the second highest tidal range in the world.',
    scale: 'Large',
    populationDensity: 'Medium',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/severn/400/300'
  },
  {
    id: 'shannon-estuary',
    name: 'Shannon Estuary',
    location: 'Ireland',
    coordinates: { lat: 52.6, lng: -9.0 },
    shortDescription: 'Ireland\'s largest river estuary, a deep-water habitat.',
    scale: 'Medium',
    populationDensity: 'Low',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/shannon/400/300'
  },
  {
    id: 'gironde-estuary',
    name: 'Gironde Estuary',
    location: 'France',
    coordinates: { lat: 45.4, lng: -0.9 },
    shortDescription: 'Large estuary formed by the confluence of Dordogne and Garonne.',
    scale: 'Medium',
    populationDensity: 'Medium',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/gironde/400/300'
  },
  {
    id: 'rhine-meuse',
    name: 'Rhine-Meuse-Scheldt',
    location: 'Netherlands',
    coordinates: { lat: 51.8, lng: 4.3 },
    shortDescription: 'A highly engineered delta protecting Northern Europe.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/rhine/400/300'
  },
  {
    id: 'tagus-estuary',
    name: 'Tagus Estuary',
    location: 'Portugal',
    coordinates: { lat: 38.7, lng: -9.0 },
    shortDescription: 'One of the largest wetlands in Europe.',
    scale: 'Medium',
    populationDensity: 'High',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/tagus/400/300'
  },
  {
    id: 'oslofjord',
    name: 'Oslofjord',
    location: 'Norway',
    coordinates: { lat: 59.5, lng: 10.6 },
    shortDescription: 'A scenic fjord inlet in the south-east of Norway.',
    scale: 'Large',
    populationDensity: 'Medium',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/oslo/400/300'
  },

  // --- Africa ---
  {
    id: 'nile-delta',
    name: 'Nile Delta',
    location: 'Egypt',
    coordinates: { lat: 31.0, lng: 31.0 },
    shortDescription: 'Arcuate delta, historically the breadbasket of civilizations.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/nile/400/300'
  },
  {
    id: 'niger-delta',
    name: 'Niger Delta',
    location: 'Nigeria',
    coordinates: { lat: 4.8, lng: 6.0 },
    shortDescription: 'A vast, oil-rich delta with complex mangrove systems.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/niger/400/300'
  },
  {
    id: 'congo-estuary',
    name: 'Congo Estuary',
    location: 'DRC/Angola',
    coordinates: { lat: -6.0, lng: 12.4 },
    shortDescription: 'Deep submarine canyon estuary with high discharge velocity.',
    scale: 'Massive',
    populationDensity: 'Medium',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/congo/400/300'
  },
  {
    id: 'st-lucia',
    name: 'Lake St. Lucia',
    location: 'South Africa',
    coordinates: { lat: -28.0, lng: 32.4 },
    shortDescription: 'Africa\'s largest estuarine system, part of iSimangaliso Wetland Park.',
    scale: 'Medium',
    populationDensity: 'Low',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/stlucia/400/300'
  },

  // --- Asia ---
  {
    id: 'ganges-brahmaputra',
    name: 'Ganges-Brahmaputra',
    location: 'Bangladesh',
    coordinates: { lat: 22.5, lng: 89.5 },
    shortDescription: 'The world\'s largest delta, home to the Sundarbans.',
    scale: 'Massive',
    populationDensity: 'High',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/ganges/400/300'
  },
  {
    id: 'mekong-delta',
    name: 'Mekong Delta',
    location: 'Vietnam',
    coordinates: { lat: 10.0, lng: 106.0 },
    shortDescription: 'A tide-dominated delta; the agricultural heart of Vietnam.',
    scale: 'Massive',
    populationDensity: 'High',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/mekong/400/300'
  },
  {
    id: 'red-river-delta',
    name: 'Red River Delta',
    location: 'Vietnam',
    coordinates: { lat: 20.3, lng: 106.5 },
    shortDescription: 'Agriculturally intensive delta in Northern Vietnam.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/redriver/400/300'
  },
  {
    id: 'saigon-dongnai-estuary',
    name: 'Saigon-Dongnai',
    location: 'Vietnam',
    coordinates: { lat: 10.4, lng: 106.9 },
    shortDescription: 'Complex mangrove estuary system including Can Gio.',
    scale: 'Medium',
    populationDensity: 'High',
    biodiversityRating: 'Very High',
    image: 'https://picsum.photos/seed/saigon/400/300'
  },
  {
    id: 'yangtze-delta',
    name: 'Yangtze Delta',
    location: 'China',
    coordinates: { lat: 31.2, lng: 121.8 },
    shortDescription: 'A colossal delta supporting one of the world\'s largest urban clusters.',
    scale: 'Massive',
    populationDensity: 'High',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/yangtze/400/300'
  },
  {
    id: 'pearl-river-delta',
    name: 'Pearl River Delta',
    location: 'China',
    coordinates: { lat: 22.3, lng: 113.5 },
    shortDescription: 'Complex system of distributaries in South China.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/pearl/400/300'
  },
  {
    id: 'tokyo-bay',
    name: 'Tokyo Bay',
    location: 'Japan',
    coordinates: { lat: 35.5, lng: 139.9 },
    shortDescription: 'Highly urbanized semi-enclosed bay.',
    scale: 'Medium',
    populationDensity: 'High',
    biodiversityRating: 'Low',
    image: 'https://picsum.photos/seed/tokyo/400/300'
  },
  {
    id: 'seto-inland-sea',
    name: 'Seto Inland Sea',
    location: 'Japan',
    coordinates: { lat: 34.2, lng: 133.5 },
    shortDescription: 'A vast body of water separating Honshu, Shikoku, and Kyushu.',
    scale: 'Large',
    populationDensity: 'High',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/seto/400/300'
  },

  // --- Oceania ---
  {
    id: 'murray-mouth',
    name: 'Murray Mouth',
    location: 'Australia',
    coordinates: { lat: -35.5, lng: 138.9 },
    shortDescription: 'Wave-dominated estuary, often restricted by sand deposits.',
    scale: 'Small',
    populationDensity: 'Low',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/murray/400/300'
  },
  {
    id: 'spencer-gulf',
    name: 'Spencer Gulf',
    location: 'Australia',
    coordinates: { lat: -34.0, lng: 137.0 },
    shortDescription: 'Inverse estuary where evaporation exceeds freshwater input.',
    scale: 'Large',
    populationDensity: 'Low',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/spencer/400/300'
  },
  {
    id: 'derwent-estuary',
    name: 'Derwent Estuary',
    location: 'Australia (Tas)',
    coordinates: { lat: -42.9, lng: 147.3 },
    shortDescription: 'Drowned river valley hosting the city of Hobart.',
    scale: 'Medium',
    populationDensity: 'Medium',
    biodiversityRating: 'Medium',
    image: 'https://picsum.photos/seed/derwent/400/300'
  },
  {
    id: 'kaipara-harbour',
    name: 'Kaipara Harbour',
    location: 'New Zealand',
    coordinates: { lat: -36.4, lng: 174.2 },
    shortDescription: 'One of the largest harbours in the world by area.',
    scale: 'Large',
    populationDensity: 'Low',
    biodiversityRating: 'High',
    image: 'https://picsum.photos/seed/kaipara/400/300'
  }
];

export const GEOJSON_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
