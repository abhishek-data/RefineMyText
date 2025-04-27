export interface RefinementOptions {
  style: 'professional' | 'academic' | 'casual' | 'technical' | 'creative';
  tone: 'formal' | 'friendly' | 'persuasive' | 'neutral';
  length: 'concise' | 'detailed' | 'maintain';
}

export interface TextStats {
  wordCount: number;
  charCount: number;
}