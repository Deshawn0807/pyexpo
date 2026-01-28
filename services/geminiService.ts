
import { GoogleGenAI } from "@google/genai";
import { Alert } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSafetyReport = async (alert: Alert) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, concise control room incident report for the following railway safety alert:
      Time: ${alert.time}
      Track ID: ${alert.trackId}
      Alert Type: ${alert.type}
      Severity: ${alert.severity}
      Description: ${alert.description}
      
      The report should include:
      1. Immediate Action Taken
      2. Recommended Follow-up
      3. Safety Protocol Check
      Keep it under 150 words and professional in tone.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report:", error);
    return "Error generating AI report. Please consult manual safety protocols.";
  }
};
