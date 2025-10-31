import { NextRequest, NextResponse } from "next/server";
import { getClaudeClient } from "@/lib/ai/claude-client";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const claudeClient = getClaudeClient();
    const response = await claudeClient.chat(messages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
