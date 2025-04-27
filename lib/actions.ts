"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RefinementOptions } from "./types";

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

export async function refineText(text: string, options: RefinementOptions) {
  const supabase = createServerActionClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const systemPrompt = `${systemPrompts[options.style] || systemPrompts.professional}
${toneInstructions[options.tone] || toneInstructions.formal}
${lengthInstructions[options.length] || lengthInstructions.maintain}`;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
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

    // Store the refinement in Supabase
    await supabase.from("refinements").insert({
      user_id: session.user.id,
      original_text: text,
      refined_text: refinedText,
      options: options
    });

    return refinedText;
  } catch (error) {
    console.error("Error refining text:", error);
    throw error;
  }
}