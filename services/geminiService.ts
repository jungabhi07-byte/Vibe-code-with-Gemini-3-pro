import { GoogleGenAI, Type, Schema } from "@google/genai";
import { HealthAssessmentResponse, UrgencyLevel } from "../types";

const apiKey = process.env.API_KEY;

// Define the schema for the health assessment response
const healthSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A compassionate summary of the user's situation.",
    },
    urgency: {
      type: Type.STRING,
      enum: [UrgencyLevel.LOW, UrgencyLevel.MODERATE, UrgencyLevel.HIGH, UrgencyLevel.CRITICAL],
      description: "The estimated urgency level of the condition.",
    },
    potentialConditions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the medical condition." },
          probability: { type: Type.STRING, description: "Likelihood (e.g., High, Moderate, Low)." },
          description: { type: Type.STRING, description: "Brief description of the condition." },
          reasoning: { type: Type.STRING, description: "Why this condition matches the symptoms." },
        },
        required: ["name", "probability", "description", "reasoning"],
      },
    },
    recommendedActions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Immediate actions the user should take (e.g., go to ER, drink water).",
    },
    lifestyleTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Long-term advice or comfort measures.",
    },
    disclaimer: {
      type: Type.STRING,
      description: "A mandatory medical disclaimer string.",
    },
  },
  required: ["summary", "urgency", "potentialConditions", "recommendedActions", "lifestyleTips", "disclaimer"],
};

export const analyzeSymptoms = async (
  age: string,
  gender: string,
  symptoms: string,
  duration: string,
  history: string
): Promise<HealthAssessmentResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following health information and provide a preliminary assessment.
    
    User Profile:
    - Age: ${age}
    - Gender: ${gender}
    - Duration of Symptoms: ${duration}
    - Medical History: ${history || "None provided"}
    
    Symptoms:
    ${symptoms}
    
    You are a helpful, empathetic medical AI assistant. 
    Analyze the symptoms carefully. 
    Identify potential conditions, assess urgency, and provide actionable advice.
    ALWAYS prioritize safety. If symptoms suggest an emergency (heart attack, stroke, severe trauma), mark urgency as CRITICAL.
    
    Output strictly in JSON format matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: healthSchema,
        temperature: 0.2, // Low temperature for more analytical/consistent results
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as HealthAssessmentResponse;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw error;
  }
};
