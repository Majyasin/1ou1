import { NextRequest } from "next/server";
import { StreamingAIService } from "@/lib/ai/streaming-service";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  const encoder = new TextEncoder();
  const service = new StreamingAIService();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of service.streamGeneration(prompt)) {
          const data = JSON.stringify(chunk) + "\n";
          controller.enqueue(encoder.encode(data));
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
