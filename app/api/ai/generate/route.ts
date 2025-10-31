import { NextRequest, NextResponse } from "next/server";
import { getClaudeClient } from "@/lib/ai/claude-client";

export async function POST(request: NextRequest) {
  try {
    const { prompt, context } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const claudeClient = getClaudeClient();
    const generatedCode = await claudeClient.generateCode(prompt, context);

    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      { error: "Failed to generate code" },
      { status: 500 }
    );
  }
}
