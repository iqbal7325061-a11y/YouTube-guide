import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateText(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful YouTube assistant.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
}

export async function generateImagePrompt(topic: string) {
  const prompt = `Create a highly descriptive image generation prompt for a YouTube thumbnail about: ${topic}. 
  The prompt should be photorealistic, high quality, and eye-catching.`;
  return await generateText(prompt);
}
