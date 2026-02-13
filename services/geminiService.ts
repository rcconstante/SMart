import { GoogleGenAI } from "@google/genai";
import { SensorData, EngagementData } from "../types";

const API_KEY = process.env.API_KEY || ''; 

export const generateSmartResponse = async (
  query: string, 
  context: { sensors: SensorData; engagement: EngagementData }
): Promise<string> => {
  if (!API_KEY) {
    return "Simulated Response: API Key is missing. Please configure the API Key to use the real AI.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const systemPrompt = `
      You are the "Smart Classroom Assistant" for DLSUD (De La Salle University – Dasmariñas).
      Your goal is to help students, faculty, and admins understand the classroom environment.
      
      Current Real-time Classroom Data:
      - Temperature: ${context.sensors.temperature}°C (Ideal: 22-26°C)
      - Humidity: ${context.sensors.humidity}% (Ideal: 30-60%)
      - CO2 Levels: ${context.sensors.co2} ppm
      - Light Level: ${context.sensors.light} lux
      - Noise Level: ${context.sensors.noise} dBA
      - Air Quality Index: ${context.sensors.airQuality}
      
      Engagement Data:
      - Total Students: ${context.engagement.totalStudents}
      - Average Engagement Score: ${context.engagement.avgEngagement}%
      - Predominant Emotion: ${Object.entries(context.engagement.emotionBreakdown).sort((a,b) => b[1]-a[1])[0][0]}
      
      Instructions:
      1. Answer the user's question directly based on the data above.
      2. If values are outside ideal ranges (e.g., high temp, high humidity), suggest improvements.
      3. Keep responses concise and conversational (under 50 words usually).
      4. Be polite and professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] }, // Pre-prompting with context as a user message for context-setting works well
        { role: 'user', parts: [{ text: query }] }
      ],
    });

    return response.text || "I'm having trouble analyzing the data right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error connecting to the smart classroom brain. Please try again.";
  }
};