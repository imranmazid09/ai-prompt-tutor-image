import { GoogleGenerativeAI } from "@google/generative-ai";

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

const promptElements: Record<string, ElementCriteria> = {
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
    weakExample: "nice looking",
    scoringCriteria: [
      "Clear artistic medium",
      "Specific style reference",
      "Consistency with subject",
      "Technical specificity"
    ]
  },
  details: {
    description: "Specific characteristics and attributes",
    strongExample: "scales shimmer with an iridescent blue-green hue, worn battle scars visible",
    weakExample: "has scales",
    scoringCriteria: [
      "Level of detail",
      "Sensory descriptions",
      "Unique characteristics",
      "Coherent details"
    ]
  },
  composition: {
    description: "How the image is framed and composed",
    strongExample: "dramatic low-angle view against storm clouds, rule of thirds composition",
    weakExample: "centered",
    scoringCriteria: [
      "Camera angle specified",
      "Framing description",
      "Compositional rules",
      "Scene context"
    ]
  },
  lighting: {
    description: "Light conditions and effects",
    strongExample: "backlit by golden sunset light with dramatic shadows",
    weakExample: "bright",
    scoringCriteria: [
      "Light source specified",
      "Lighting quality",
      "Shadow description",
      "Mood enhancement"
    ]
  },
  color: {
    description: "Color palette and scheme",
    strongExample: "cool teal and silver palette with golden accent highlights",
    weakExample: "colorful",
    scoringCriteria: [
      "Specific colors named",
      "Color relationships",
      "Mood appropriate",
      "Color harmony"
    ]
  }
};

async function evaluatePromptElement(
  element: string,
  content: string,
  criteria: ElementCriteria
) {
  const prompt = `You are an AI image prompt writing tutor. Evaluate the following ${element} description for an AI image generation prompt.

Content to evaluate: "${content}"

Criteria:
${criteria.scoringCriteria.map(c => "- " + c).join("\n")}

Strong example: "${criteria.strongExample}"
Weak example: "${criteria.weakExample}"

Provide a JSON response with:
1. A score from 0-100 based on the criteria
2. Specific, constructive feedback on how to improve
3. A strong example similar to but different from the provided one
4. A weak example demonstrating common mistakes

Format:
{
  "score": number,
  "feedback": "string",
  "examples": {
    "strong": "string",
    "weak": "string"
  }
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Failed to parse evaluation response");
  }
}

export async function evaluateFullPrompt(promptData: Record<string, string>) {
  const evaluations = await Promise.all(
    Object.entries(promptData).map(async ([element, content]) => {
      const criteria = promptElements[element];
      return [element, await evaluatePromptElement(element, content, criteria)];
    })
  );

  const results = Object.fromEntries(evaluations);
  const totalScore = Math.round(
    Object.values(results).reduce((sum, r) => sum + r.score, 0) / 
    Object.keys(results).length
  );

  return {
    totalScore,
    elements: results
  };
}
