
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

export const analyzePlantImage = async (base64Image: string): Promise<DiagnosisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: 'Analyze this plant leaf image. Identify if the plant is healthy or has a disease. Provide a detailed diagnosis including the disease name, a description of the condition, step-by-step treatment options, and preventive measures for the future. Ensure the response is in valid JSON format.',
          },
        ],
      },
    ],
    config: {
      systemInstruction: 'You are a world-class plant pathologist and agricultural expert named "The Green Oracle". Your goal is to help farmers and gardeners accurately identify plant diseases from images. Be scientific yet accessible. If the image is not a plant leaf, set status to "Unknown".',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          status: { 
            type: Type.STRING,
            description: "Must be 'Healthy', 'Diseased', or 'Unknown'"
          },
          confidence: { type: Type.NUMBER },
          description: { type: Type.STRING },
          treatmentOptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          preventionMeasures: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['diseaseName', 'status', 'confidence', 'description', 'treatmentOptions', 'preventionMeasures']
      }
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as DiagnosisResult;
};
