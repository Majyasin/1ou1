import Anthropic from "@anthropic-ai/sdk";

export interface StreamChunk {
  type: "text" | "code" | "file" | "complete";
  content: string;
  filename?: string;
  language?: string;
}

export class StreamingAIService {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY || "",
    });
  }

  async *streamGeneration(
    prompt: string,
    onProgress?: (chunk: StreamChunk) => void
  ): AsyncGenerator<StreamChunk> {
    const systemPrompt = `You are an expert full-stack developer building complete applications.

When generating projects, follow this structure:
1. Create all necessary files (package.json, config files, source code)
2. Use modern best practices
3. Include TypeScript types
4. Add helpful comments
5. Make it production-ready

Format your response as follows:
- Start with: FILE: filename.ext
- Then the code
- End with: END_FILE
- Repeat for each file

Example:
FILE: package.json
{
  "name": "my-app",
  "version": "1.0.0"
}
END_FILE

FILE: src/App.tsx
export default function App() {
  return <div>Hello World</div>
}
END_FILE
`;

    try {
      const stream = await this.client.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      let currentFile = "";
      let currentFilename = "";
      let currentLanguage = "";

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          const text = chunk.delta.text;

          // Check for file markers
          if (text.includes("FILE:")) {
            if (currentFile) {
              // Yield previous file
              const fileChunk: StreamChunk = {
                type: "file",
                content: currentFile.trim(),
                filename: currentFilename,
                language: currentLanguage,
              };
              yield fileChunk;
              onProgress?.(fileChunk);
              currentFile = "";
            }

            const filenameMatch = text.match(/FILE:\s*(.+)/);
            if (filenameMatch) {
              currentFilename = filenameMatch[1].trim();
              currentLanguage = this.getLanguageFromFilename(currentFilename);
            }
          } else if (text.includes("END_FILE")) {
            if (currentFile) {
              const fileChunk: StreamChunk = {
                type: "file",
                content: currentFile.trim(),
                filename: currentFilename,
                language: currentLanguage,
              };
              yield fileChunk;
              onProgress?.(fileChunk);
              currentFile = "";
              currentFilename = "";
            }
          } else {
            currentFile += text;

            // Also yield text chunks for real-time display
            const textChunk: StreamChunk = {
              type: "text",
              content: text,
            };
            yield textChunk;
            onProgress?.(textChunk);
          }
        }
      }

      // Yield any remaining file
      if (currentFile && currentFilename) {
        const fileChunk: StreamChunk = {
          type: "file",
          content: currentFile.trim(),
          filename: currentFilename,
          language: currentLanguage,
        };
        yield fileChunk;
        onProgress?.(fileChunk);
      }

      // Signal completion
      const completeChunk: StreamChunk = {
        type: "complete",
        content: "Generation complete",
      };
      yield completeChunk;
      onProgress?.(completeChunk);
    } catch (error) {
      console.error("Streaming error:", error);
      throw error;
    }
  }

  private getLanguageFromFilename(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      ts: "typescript",
      tsx: "typescript",
      js: "javascript",
      jsx: "javascript",
      json: "json",
      css: "css",
      scss: "scss",
      html: "html",
      md: "markdown",
      py: "python",
      go: "go",
      rs: "rust",
      java: "java",
      php: "php",
      rb: "ruby",
      yml: "yaml",
      yaml: "yaml",
      toml: "toml",
      sql: "sql",
    };
    return langMap[ext || ""] || "text";
  }
}

export const streamingAI = new StreamingAIService();
