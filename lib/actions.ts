"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RefinementOptions } from "./types";
import { DeepSeekModel, GeminiModel, systemPrompts, toneInstructions, lengthInstructions } from "./models";

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
    // Initialize the appropriate model based on the selected model
    const model = options.model === 'gemini' 
      ? new GeminiModel(process.env.GEMINI_API_KEY!)
      : new DeepSeekModel(process.env.DEEPSEEK_API_KEY!);

    const response = await model.generateResponse(text, systemPrompt);
    const refinedText = response.content;

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