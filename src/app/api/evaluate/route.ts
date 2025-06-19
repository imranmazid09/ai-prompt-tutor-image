import { NextRequest } from "next/server";
import { evaluateFullPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const promptData = await request.json();

    // Validate input
    const requiredFields = [
      "subject",
      "artisticStyle",
      "details",
      "composition",
      "lighting",
      "color",
    ];

    for (const field of requiredFields) {
      if (!promptData[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400 }
        );
      }
    }

    const evaluation = await evaluateFullPrompt(promptData);
    
    return new Response(JSON.stringify(evaluation), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/evaluate:", error);
    return new Response(
      JSON.stringify({ error: "Failed to evaluate prompt" }),
      { status: 500 }
    );
  }
}
