import { GoogleGenAI, Type } from "@google/genai";
import { Quiz, Estuary } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateEstuaryDetails = async (estuaryName: string): Promise<any> => {
  if (!apiKey) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide detailed academic and ecological content for the ${estuaryName} estuary. 
      Focus on hydrodynamics, specific biodiversity lists (scientific names if possible), conservation status (IUCN categories), and anthropogenic impacts.
      Keep it informative and structured.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            biodiversity: { type: Type.STRING, description: "Detailed flora and fauna" },
            ecologicalSignificance: { type: Type.STRING, description: "Hydrographic and ecosystem services" },
            conservationStatus: { type: Type.STRING, description: "Current status and threats" },
            funFact: { type: Type.STRING, description: "A unique scientific or historical fact" }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error (Details):", error);
    return null;
  }
};

export const generateQuiz = async (estuaryName: string): Promise<Quiz | null> => {
  if (!apiKey) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a challenging 3-question multiple choice quiz about the ${estuaryName} estuary for a university-level audience.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.INTEGER, description: "Zero-based index of correct option" },
                  explanation: { type: Type.STRING, description: "Detailed explanation" }
                }
              }
            }
          }
        }
      }
    });
    const data = JSON.parse(response.text);
    return {
      estuaryId: estuaryName.toLowerCase().replace(/\s/g, '-'),
      questions: data.questions
    };
  } catch (error) {
    console.error("Gemini API Error (Quiz):", error);
    return null;
  }
};

// New function to discover estuaries dynamically
export const searchGlobalEstuaries = async (query: string): Promise<Estuary[]> => {
  if (!apiKey) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Conduct an exhaustive academic census of estuarine systems located in or near "${query}".
      
      CRITICAL INSTRUCTIONS FOR RESEARCH PURPOSES:
      1. QUANTITY: List as many valid systems as possible (target 30-50 if applicable to the region).
      2. SCOPE: Do NOT limit to "major" deltas. You must include:
         - Minor river mouths
         - Coastal lagoons and barrier systems
         - Fjords, rias, and bays
         - Estuarine wetlands
      3. PRECISION: Provide accurate coordinates.
      4. If the query is a country (e.g., "Vietnam"), traverse the entire coastline from North to South.
      
      Return strictly JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estuaries: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  location: { type: Type.STRING, description: "Region/Province/State within the country" },
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER },
                  shortDescription: { type: Type.STRING, description: "Hydrographic classification (e.g., 'Wave-dominated delta')" },
                  scale: { type: Type.STRING, enum: ["Small", "Medium", "Large", "Massive"] },
                  populationDensity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                  biodiversityRating: { type: Type.STRING, enum: ["Low", "Medium", "High", "Very High"], description: "General biodiversity richness" }
                }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text);
    
    // Map response to our Estuary type
    if (data.estuaries && Array.isArray(data.estuaries)) {
        return data.estuaries.map((e: any) => ({
            id: e.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: e.name,
            location: e.location,
            coordinates: { lat: e.lat, lng: e.lng },
            shortDescription: e.shortDescription,
            scale: e.scale,
            populationDensity: e.populationDensity || 'Medium',
            biodiversityRating: e.biodiversityRating || 'Medium',
            image: `https://picsum.photos/seed/${e.name.replace(/\s/g, '')}/400/300` // Fallback image
        }));
    }
    return [];

  } catch (error) {
    console.error("Gemini API Error (Search):", error);
    return [];
  }
};
