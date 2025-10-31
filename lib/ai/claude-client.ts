import Anthropic from "@anthropic-ai/sdk";

export class ClaudeClient {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY || "",
    });
  }

  async generateCode(prompt: string, context?: string): Promise<string> {
    try {
      const systemPrompt = `You are an expert full-stack developer and AI coding assistant.
You help users build web applications by generating clean, production-ready code.

Key guidelines:
- Write modern, idiomatic code using best practices
- Include proper TypeScript types
- Add helpful comments for complex logic
- Ensure code is secure and performant
- Use modern frameworks and libraries (React, Next.js, Tailwind, etc.)
- Generate complete, working code that can be used immediately

${context ? `\nProject Context:\n${context}` : ""}`;

      const message = await this.client.messages.create({
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

      const content = message.content[0];
      if (content.type === "text") {
        return content.text;
      }

      return "Unable to generate code. Please try again.";
    } catch (error) {
      console.error("Error generating code:", error);
      throw new Error("Failed to generate code with AI");
    }
  }

  async chat(
    messages: Array<{ role: "user" | "assistant"; content: string }>
  ): Promise<string> {
    try {
      const systemPrompt = `You are an expert AI coding assistant helping developers build applications.
You provide clear, helpful guidance and can generate code, fix bugs, explain concepts, and more.
Be concise but thorough in your explanations.`;

      const response = await this.client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const content = response.content[0];
      if (content.type === "text") {
        return content.text;
      }

      return "Unable to process your message. Please try again.";
    } catch (error) {
      console.error("Error in chat:", error);
      throw new Error("Failed to communicate with AI");
    }
  }

  async generateComponent(
    componentName: string,
    description: string
  ): Promise<string> {
    const prompt = `Generate a React component named "${componentName}" with the following requirements:

${description}

Requirements:
- Use TypeScript
- Use functional component with hooks
- Include proper TypeScript interfaces for props
- Add JSDoc comments
- Use Tailwind CSS for styling
- Make it responsive and accessible
- Include example usage in comments

Generate only the component code, nothing else.`;

    return this.generateCode(prompt);
  }

  async fixCode(code: string, error: string): Promise<string> {
    const prompt = `Fix the following code that is producing this error:

Error: ${error}

Code:
\`\`\`
${code}
\`\`\`

Please provide the corrected code with an explanation of what was wrong.`;

    return this.generateCode(prompt);
  }

  async optimizeCode(code: string): Promise<string> {
    const prompt = `Optimize the following code for better performance, readability, and maintainability:

\`\`\`
${code}
\`\`\`

Provide the optimized code with comments explaining the improvements.`;

    return this.generateCode(prompt);
  }

  async generateTests(code: string, framework = "jest"): Promise<string> {
    const prompt = `Generate comprehensive unit tests for the following code using ${framework}:

\`\`\`
${code}
\`\`\`

Include:
- Test setup and teardown
- Happy path tests
- Edge cases
- Error handling tests
- Mock data where needed`;

    return this.generateCode(prompt);
  }
}

// Singleton instance
let claudeClientInstance: ClaudeClient | null = null;

export function getClaudeClient(apiKey?: string): ClaudeClient {
  if (!claudeClientInstance) {
    claudeClientInstance = new ClaudeClient(apiKey);
  }
  return claudeClientInstance;
}
