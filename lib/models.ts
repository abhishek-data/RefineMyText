import { RefinementOptions } from "./types";

interface ModelResponse {
  content: string;
}

export class DeepSeekModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(text: string, systemPrompt: string): Promise<ModelResponse> {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content
    };
  }
}

export class GeminiModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(text: string, systemPrompt: string): Promise<ModelResponse> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              },
              {
                text: text
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text
    };
  }
}

export const systemPrompts = {
  professional: "Improve the following text for professional business communication. Correct grammar, enhance clarity, and maintain a formal tone while preserving the original meaning:",
  academic: "Refine this text for academic writing. Ensure proper citations, formal language, and logical flow while maintaining the original argument:",
  casual: "Make this text sound more natural and conversational while keeping it grammatically correct:",
  technical: "Optimize this text for technical documentation. Use precise terminology, clear structure, and maintain technical accuracy:",
  creative: "Enhance this text with creative elements while maintaining clarity and engagement:",
};

export const toneInstructions = {
  formal: "Use formal language and maintain professional distance.",
  friendly: "Adopt a warm, approachable tone while remaining professional.",
  persuasive: "Emphasize compelling points and use persuasive language techniques.",
  neutral: "Maintain an objective, balanced tone throughout.",
};

export const lengthInstructions = {
  concise: "Make the text more concise while preserving key information.",
  detailed: "Expand on important points while maintaining clarity.",
  maintain: "Keep the text length similar to the original.",
}; 