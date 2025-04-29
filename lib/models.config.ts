import { GenerationConfig } from "./types";

export const systemPrompts = {
  professional: `Revise this for professional communication that sounds human:
- Correct grammar/spelling but keep meaning intact
- Use natural business phrasing (avoid robotic tone)
- Maintain professionalism without being stiff
- Prefer active voice (e.g., "We recommend" vs. "It is recommended")
- Replace corporate jargon with clear language
- Keep sentences between 15-25 words for readability
Text to refine:`,

  academic: `Improve this academic text while preserving its scholarly integrity:
- Ensure formal tone but avoid unnecessary complexity
- Maintain proper citation format if present
- Improve flow between ideas
- Clarify dense passages without oversimplifying
- Keep specialized terminology where appropriate
Text to refine:`,

  casual: `Make this text sound naturally conversational:
- Fix grammar subtly (don't over-correct informal expressions)
- Maintain the writer's original voice
- Use contractions where natural ("you're" instead of "you are")
- Replace stiff phrasing with everyday language
- Allow appropriate sentence fragments for rhythm
Text to refine:`,

  technical: `Optimize this technical content for both accuracy and readability:
- Preserve precise terminology
- Clarify complex concepts without dumbing down
- Improve documentation structure
- Use consistent formatting
- Add helpful transitions between technical points
Text to refine:`,

  creative: `Enhance this text creatively while maintaining clarity:
- Add vivid language where appropriate
- Improve narrative flow
- Strengthen voice and style
- Balance creativity with coherence
- Suggest metaphorical language when it fits
Text to refine:`,
};

export const toneInstructions = {
  formal: `Adopt a polished tone suitable for:
- Official documents
- Business proposals
- Legal/regulatory contexts
- Academic publishing
Avoid: Contractions, colloquialisms, opinionated language`,

  friendly: `Use a warm, approachable tone like:
- Help desk communications
- Internal team updates
- Customer-facing guides
Do: Use "we/our", contractions, positive phrasing`,

  persuasive: `Employ persuasive techniques:
- Benefit-focused language
- Strategic repetition
- Social proof indicators
- Clear calls-to-action
Avoid: Pushy language, exaggeration`,

  neutral: `Maintain impartiality with:
- Balanced perspectives
- Fact-based statements
- Measured qualifiers
- Avoid emotional language
Suitable for: Technical reports, news, research`,
};

export const lengthInstructions = {
  concise: `Reduce length while preserving meaning:
- Eliminate redundant phrases
- Replace wordy constructions
- Combine related ideas
- Target 30-50% shorter
Keep: Key data, proper nouns, critical details`,

  detailed: `Expand with valuable context:
- Add explanatory examples
- Include relevant background
- Specify general statements
- Anticipate reader questions
Target: 25-40% longer while staying focused`,

  maintain: `Keep approximately the same length:
- Rephrase but don't add/remove content
- Balance sentence variety
- Preserve all original information
- Adjust only for clarity`,
};

export const promptConfigOverrides: {
  [key in keyof typeof systemPrompts]?: Partial<GenerationConfig>;
} = {
  professional: { temperature: 0.65, topP: 0.9, topK: 45 },
  academic: { temperature: 0.5, topP: 0.85, topK: 35 },
  casual: { temperature: 0.8, topP: 0.95, topK: 60 },
  technical: { temperature: 0.4, topP: 0.8, topK: 25 },
  creative: { temperature: 0.9, topP: 0.97, topK: 80 },
};

export const toneConfigOverrides: {
  [key in keyof typeof toneInstructions]?: Partial<GenerationConfig>;
} = {
  formal: { temperature: 0.4, topP: 0.8 },
  friendly: { temperature: 0.7, topP: 0.9 },
  persuasive: { temperature: 0.6, topP: 0.85 },
  neutral: { temperature: 0.5, topP: 0.82 },
};

export const lengthConfigOverrides: {
  [key in keyof typeof lengthInstructions]?: Partial<GenerationConfig>;
} = {
  concise: { temperature: 0.6 }, // Slightly lower temp reduces verbosity
  detailed: { temperature: 0.7 },
  maintain: { temperature: 0.65 },
};
