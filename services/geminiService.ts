import { GoogleGenAI, Type } from "@google/genai";
import { BloomLevel, Question } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. App will run in limited mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Generate quiz questions based on Bloom level
export const generateQuestionsForLevel = async (level: BloomLevel, count: number = 5): Promise<Question[]> => {
  const ai = getAiClient();
  if (!ai) {
    // Fallback Mock Data if no API key
    return Array.from({ length: count }).map((_, i) => ({
      id: `mock-${level}-${i}`,
      level: level,
      text: `Pregunta simulada (Sin API Key) para el nivel ${level}. ¿Qué ocurrió en 1973?`,
      options: ["Golpe de Estado", "Terremoto", "Mundial de Fútbol", "Nada"],
      correctAnswer: 0,
      explanation: "Esta es una respuesta simulada porque no hay API Key configurada."
    }));
  }

  const prompt = `Genera ${count} preguntas de opción múltiple sobre la Dictadura Militar en Chile (1973-1990).
  Nivel de Taxonomía de Bloom: ${level}.
  Formato JSON estricto.
  La respuesta debe incluir una explicación educativa.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER, description: "Index 0-3" },
              explanation: { type: Type.STRING }
            },
            required: ["id", "text", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.map((q: any) => ({ ...q, level }));
    }
    return [];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};

// Generate detailed explanation for a timeline event or concept
export const generateDetailedExplanation = async (topic: string, type: 'event' | 'concept'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return `Detalle simulado para: ${topic}. (Configura la API Key para contenido real).`;

  const prompt = type === 'event' 
    ? `Explica detalladamente el hito histórico "${topic}" ocurrido durante la dictadura en Chile (1973-1990). Enfócate en causas, desarrollo y consecuencias. Máximo 150 palabras. Tono educativo y objetivo.`
    : `Define y contextualiza el concepto "${topic}" en el marco de la dictadura militar chilena. Explica su relevancia histórica y social. Máximo 100 palabras.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "No se pudo generar la explicación.";
  } catch (error) {
    console.error("Error generating explanation:", error);
    return "Error al conectar con el servicio de IA.";
  }
};