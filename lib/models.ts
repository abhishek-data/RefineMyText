import { GenerationConfig } from "./types";

interface ModelResponse {
  content: string;
}

export class DeepSeekModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(
    text: string,
    systemPrompt: string,
    generationConfig: GenerationConfig
  ): Promise<ModelResponse> {
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: text,
            },
          ],
          ...generationConfig,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
    };
  }
}

export class GeminiModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(
    text: string,
    systemPrompt: string,
    generationConfig: GenerationConfig
  ): Promise<ModelResponse> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: systemPrompt,
                  },
                  {
                    text: text,
                  },
                ],
              },
            ],
            generationConfig: {
              ...generationConfig,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error(
          `Gemini API error: ${response.status} - ${response.statusText}`
        );
        const errorData = await response.json();
        console.error("Gemini API error details:", errorData);
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.candidates[0].content.parts[0].text,
      };
    } catch (error: any) {
      console.error("Error during Gemini API call:", error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}