import { GoogleGenAI, Type } from "@google/genai";
import { AiRecipeResponse } from '../types';

const apiKey = process.env.API_KEY || '';

// Fallback mock if no API key is present (for development safety)
const isConfigured = !!apiKey;

export const consultGeminiForRecipe = async (query: string): Promise<AiRecipeResponse | null> => {
  if (!isConfigured) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert Albion Online crafter. 
      The user is asking about a recipe or crafting advice for: "${query}".
      Provide a structured JSON response with the best guess for ingredients based on the game's mechanics.
      If the user input is vague, suggest a popular relevant item.
      The quantities should be for ONE batch (yield) of the item (usually 10 for food, 5 for potions).
      For 'recommendedCity', choose from: Martlock, Bridgewatch, Lymhurst, Fort Sterling, Thetford, Caerleon, Brecilien.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the item to craft" },
            description: { type: Type.STRING, description: "Brief description of utility" },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  quantity: { type: Type.NUMBER },
                  recommendedCity: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AiRecipeResponse;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};