"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { TextEditor } from "@/components/TextEditor";
import { RefinementControls } from "@/components/RefinementControls";
import { RefinedOutput } from "@/components/RefinedOutput";
import { calculateTextStats } from "@/lib/text-utils";
import { RefinementOptions } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { refineText } from "@/lib/actions";

export default function TextRefinementApp() {
  const [text, setText] = useState("");
  const [refinedText, setRefinedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<RefinementOptions>({
    style: "professional",
    tone: "formal",
    length: "maintain",
    model: "gemini",
  });

  const { toast } = useToast();
  const textStats = calculateTextStats(text);

  const handleOptionChange = (key: keyof RefinementOptions, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleRefine = async () => {
    try {
      setIsProcessing(true);
      const refined = await refineText(text, options);
      setRefinedText(refined);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refine text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAccept = () => {
    setText(refinedText);
    setRefinedText("");
  };

  const handleReject = () => {
    setRefinedText("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center mb-8 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          Text, <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Refined.</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Transform Your Writing for Any Audience</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Instantly refine your text for professionalism, academic rigor, technical clarity, creativity, or a natural conversational style. Make your writing sound more human, clear, and effective no matter the context.
        </p>
      </section>

      {/* Main Card*/}
      <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-8">
        {/* Paste & Try Sample Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-2 text-base font-medium"
            onClick={() => navigator.clipboard.readText().then(setText)}
          >
            <span role="img" aria-label="paste">📋</span> Paste
          </Button>
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-6 py-2 text-base font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
            onClick={() => setText("This is a sample AI-generated text. Edit or refine it to see the magic! Use &apos;Refine Text&apos; to see results.")}
          >
            <span role="img" aria-label="sample">✨</span> Try a Sample
          </Button>
        </div>

        {/* Original Text Card with header controls */}
        <div className="flex flex-col gap-6">
          <div className="p-0">
            <div className="flex flex-col gap-2">
              {/* Textarea */}
              <TextEditor
                value={text}
                onChange={setText}
                stats={textStats}
                placeholder="Enter or paste your text here..."
                title="Original Text"
              />
              <RefinementControls
                options={options}
                onOptionChange={handleOptionChange}
                onRefine={handleRefine}
                isProcessing={isProcessing}
                disabled={!text}
              />
            </div>
          </div>

          {/* Refined Output*/}
          <RefinedOutput
            text={refinedText}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      </div>

      {/* How it works section */}
      <section className="w-full flex justify-center mt-10 mb-8">
        <div className="w-full max-w-5xl bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col items-center text-center flex-1">
            <span className="text-3xl mb-2">①</span>
            <h3 className="font-bold text-lg mb-1">Paste or type your text</h3>
            <p className="text-sm text-muted-foreground">Start with any draft, email, essay, technical doc, or creative writing you want to improve.</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-purple-200 to-indigo-200 mx-4" />
          <div className="flex flex-col items-center text-center flex-1">
            <span className="text-3xl mb-2">②</span>
            <h3 className="font-bold text-lg mb-1">Choose your refinement style</h3>
            <p className="text-sm text-muted-foreground">Select from Professional, Academic, Casual, Technical, or Creative modes, and set the tone and length you need.</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-purple-200 to-indigo-200 mx-4" />
          <div className="flex flex-col items-center text-center flex-1">
            <span className="text-3xl mb-2">③</span>
            <h3 className="font-bold text-lg mb-1">Get refined, humanized results</h3>
            <p className="text-sm text-muted-foreground">Receive text that is clearer, more natural, and tailored for your audience—ready to use anywhere.</p>
          </div>
        </div>
      </section>
    </main>
  );
}