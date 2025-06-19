import { NextRequest } from "next/server";
import { generateImage } from "@/lib/image-generation";

export async function POST(request: NextRequest) {
  try {
    const { feedback } = await request.json();

    if (!feedback || feedback.totalScore < 80) {
      return new Response(
        JSON.stringify({ error: "Score must be at least 80% to generate image" }),
        { status: 400 }
      );
    }

    // Construct the final prompt from the evaluated elements
    const promptParts = [
      feedback.elements.subject.content,
      feedback.elements.artisticStyle.content,
      feedback.elements.details.content,
      feedback.elements.composition.content,
      feedback.elements.lighting.content,
      feedback.elements.color.content,
    ];

    const finalPrompt = promptParts.join(", ");

    const imageUrl = await generateImage(finalPrompt);

    return new Response(
      JSON.stringify({ 
        imageUrl,
        prompt: finalPrompt
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in /api/generate-image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate image" }),
      { status: 500 }
    );
  }
}
