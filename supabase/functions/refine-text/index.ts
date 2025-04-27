import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface RefinementRequest {
  text: string;
  style: string;
  tone: string;
  length: string;
}

const systemPrompts = {
  professional: "Improve the following text for professional business communication. Correct grammar, enhance clarity, and maintain a formal tone while preserving the original meaning:",
  academic: "Refine this text for academic writing. Ensure proper citations, formal language, and logical flow while maintaining the original argument:",
  casual: "Make this text sound more natural and conversational while keeping it grammatically correct:",
  technical: "Optimize this text for technical documentation. Use precise terminology, clear structure, and maintain technical accuracy:",
  creative: "Enhance this text with creative elements while maintaining clarity and engagement:",
};

const toneInstructions = {
  formal: "Use formal language and maintain professional distance.",
  friendly: "Adopt a warm, approachable tone while remaining professional.",
  persuasive: "Emphasize compelling points and use persuasive language techniques.",
  neutral: "Maintain an objective, balanced tone throughout.",
};

const lengthInstructions = {
  concise: "Make the text more concise while preserving key information.",
  detailed: "Expand on important points while maintaining clarity.",
  maintain: "Keep the text length similar to the original.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, style, tone, length }: RefinementRequest = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    const systemPrompt = `${systemPrompts[style] || systemPrompts.professional}
${toneInstructions[tone] || toneInstructions.formal}
${lengthInstructions[length] || lengthInstructions.maintain}`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("DEEPSEEK_API_KEY")}`,
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
    const refinedText = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ refinedText }),
      { 
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});