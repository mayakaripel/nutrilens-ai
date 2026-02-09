import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AnalysisResponse {
  markdownReport: string;
  executionSteps: string[];
}

export const analyzeFoodImage = async (
  imageFile: File,
  profile: UserProfile
): Promise<AnalysisResponse> => {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(imageFile);
    
    const prompt = `
      ROLE: You are the "Senior Biological Systems Engineer" (Full Stack Nutritionist). You view the human body as a production environment and food as the deployment payload.

      USER SYSTEM SPECS (Profile):
      - Hardware Model: ${profile.age} years, ${profile.gender}
      - Optimization Goal: ${profile.goal}
      - Incompatible Dependencies (Allergies): ${profile.sensitivities.length > 0 ? profile.sensitivities.join(', ') : 'None'}
      - Known Bugs/Issues: ${profile.dislikes || 'None'}
      - User Logs (Bio): ${profile.bio || 'None'}
      - Current System Load (Hunger): ${profile.hungerLevel}/10
      
      TASK: Perform a Code Review on the uploaded food payload and define an Execution Plan.
      
      DEBUGGING PROCESS:
      1. STATIC ANALYSIS (Vision): Identify modules (dishes). Detect technical debt (sugar/cream).
      2. RESOURCE ESTIMATION: Analyze 'Capacity Cost' (Heap Allocation).
      3. COMPATIBILITY CHECK: Check for breaking changes against 'Incompatible Dependencies'.
      4. DEPLOYMENT FORECAST: Determine 'Next Morning Comfort Score'.
      
      OUTPUT REQUIREMENTS:
      Return a JSON object.
      - "markdownReport": A string containing the "Build Status" and "System Forecast" sections in Markdown. DO NOT include the "Execution Plan" header or content here, as it will be provided in the separate list.
      - "executionSteps": An array of strings. Each string is a specific, actionable step for the "Eat Order" (e.g., "1. Initialize with salad to prime the cache.").
    `;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        markdownReport: {
          type: Type.STRING,
          description: "The detailed Full Stack Developer persona analysis (Build Status, System Forecast) in Markdown format."
        },
        executionSteps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A step-by-step list of actionable eating advice (the Execution Plan/Eat Order)."
        }
      },
      required: ["markdownReport", "executionSteps"]
    };

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: imageFile.type,
              data: base64Data
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text generated");

    try {
      const jsonResponse = JSON.parse(text) as AnalysisResponse;
      return jsonResponse;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // Fallback if JSON parsing fails but we have text (unlikely with schema mode but good practice)
      return {
        markdownReport: text,
        executionSteps: []
      };
    }

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("500 Internal Server Error: Failed to analyze payload.");
  }
};

// Helper to convert File to Base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};