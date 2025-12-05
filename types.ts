export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Estuary {
  id: string;
  name: string;
  location: string;
  coordinates: Coordinates;
  shortDescription: string;
  image?: string;
  
  // Detailed data (loaded dynamically or mocked)
  biodiversity?: string;
  biodiversityRating?: 'Low' | 'Medium' | 'High' | 'Very High';
  conservationStatus?: 'Critical' | 'Endangered' | 'Vulnerable' | 'Stable' | 'Protected';
  ecologicalSignificance?: string;
  scale?: 'Small' | 'Medium' | 'Large' | 'Massive';
  populationDensity?: 'Low' | 'Medium' | 'High';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface Quiz {
  estuaryId: string;
  questions: QuizQuestion[];
}

export type SortOption = 'name' | 'scale' | 'population' | 'biodiversity';

export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][];
  };
  properties: {
    name: string;
  };
}

export interface GeoJSON {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
