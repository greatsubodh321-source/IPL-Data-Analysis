
import { GoogleGenAI, Type } from "@google/genai";
import { Player } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getWinProbability = async (runs: number, wickets: number, balls: number, target: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Calculate chasing team win probability for target ${target}. Current Score: ${target - runs} runs needed, ${wickets} wickets lost, ${balls} balls left. Provide a probability percentage and a brief tactical reason.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            probability: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ['probability', 'reasoning']
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insight error:", error);
    return { probability: 50, reasoning: "Unable to calculate probability at this time." };
  }
};

export const getPlayerCluster = async (players: Player[]) => {
  const playersSummary = players.map(p => `${p.name}: SR ${p.stats.strikeRate}, Avg ${p.stats.average}, Econ ${p.stats.economy}`).join('\n');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Categorize these players into unique roles (e.g. "Finisher", "Middle Over Specialist", "Strike Bowler", "Anchor") based on their stats. Return as an array of objects.\n${playersSummary}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ['name', 'role', 'description']
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Clustering error:", error);
    return [];
  }
};

export const getAICommentary = async (playerName: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a 2-sentence tactical analysis for the IPL player ${playerName} based on his historic performance and reputation. Focus on his role in a T20 setup.`
      });
      return response.text;
    } catch (error) {
      return "Strategic analysis unavailable.";
    }
}
