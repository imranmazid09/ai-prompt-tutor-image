import { GoogleGenerativeAI } from "@google/generative-ai";
import { ElementFeedback, PromptElement, PromptFeedback } from "@/types";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export interface ElementCriteria {
  description: string;
  strongExample: string;
  weakExample: string;
  scoringCriteria: string[];
}

const promptElements: Record<keyof PromptElement, ElementCriteria> = {
  subject: {
    description: "The main focus or subject of the image",
    strongExample: "a majestic silver dragon with intricate scale patterns",
    weakExample: "dragon",
    scoringCriteria: [
      "Specificity of the subject",
      "Clear main focus",
      "Descriptive adjectives",
      "Uniqueness"
    ]
  },
  artisticStyle: {
    description: "The artistic approach or medium",
    strongExample: "detailed digital art in the style of concept art",
    weakExample: "art",
    scoringCriteria: [
      "Clear artistic medium",
      "Specific style reference",
      "Appropriate for subject",
      "Visual coherence"
    ]
  },
  details: {
    description: "Specific characteristics and attributes",
    strongExample: "scales gleaming with iridescent colors, ethereal wisps of steam rising",
    weakExample: "looks cool",
    scoringCriteria: [
      "Level of detail",
      "Visual interest",
      "Sensory language",
      "Coherent with subject"
    ]
  },
  composition: {
    description: "How the image is framed and arranged",
    strongExample: "dramatic low angle view with the subject centered against a stormy sky",
    weakExample: "centered",
    scoringCriteria: [
      "Camera angle specification",
      "Scene arrangement",
      "Depth and perspective",
      "Overall composition clarity"
    ]
  },
  lighting: {
    description: "Light conditions and effects",
    strongExample: "backlit by a golden sunset with dramatic shadows",
    weakExample: "bright",
    scoringCriteria: [
      "Light source specification",
      "Mood enhancement",
      "Shadow consideration",
      "Time of day/atmosphere"
    ]
  },
  color: {
    description: "Color palette and scheme",
    strongExample: "rich jewel tones with emerald green highlights and deep purple shadows",
    weakExample: "colorful",
    scoringCriteria: [
      "Color palette specification",
      "Mood appropriateness",
      "Color harmony",
      "Visual impact"
    ]
  }
};

async function evaluatePromptElement(
  element: keyof PromptElement,
  content: string,
  criteria: ElementCriteria
): Promise<ElementFeedback> {
  const prompt = `
    You are an AI art prompt evaluation expert. Analyze this ${element} prompt element:
    "${content}"
    
    Consider these criteria:
    ${criteria.scoringCriteria.join("\n")}
    
    Return a JSON object with:
    1. score (0-100)
    2. feedback (constructive critique)
    3. examples object with:
       - strong (an improved version)
       - weak (a weaker version for contrast)
    
    Focus on actionable feedback and specific improvements.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Find the JSON object in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }
    
    const feedback = JSON.parse(jsonMatch[0]) as ElementFeedback;
    return feedback;
  } catch (error) {
    console.error(`Error evaluating ${element}:`, error);
    throw new Error(`Failed to evaluate ${element} prompt element`);
  }
}

export async function evaluatePrompt(promptData: Record<keyof PromptElement, string>): Promise<PromptFeedback> {
  const evaluations = await Promise.all(
    Object.entries(promptData).map(async ([element, content]) => {
      const criteria = promptElements[element as keyof PromptElement];
      return [element, await evaluatePromptElement(element as keyof PromptElement, content, criteria)];
    })
  );

  const results = Object.fromEntries(evaluations) as {
    [K in keyof PromptElement]: ElementFeedback;
  };
  
  const totalScore = Math.round(
    Object.values(results).reduce((sum, r) => sum + r.score, 0) / 
    Object.keys(results).length
  );

  return {
    totalScore,
    elements: results
  };
}
