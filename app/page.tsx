"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { TextEditor } from "@/components/TextEditor";
import { RefinementControls } from "@/components/RefinementControls";
import { RefinedOutput } from "@/components/RefinedOutput";
import { calculateTextStats } from "@/lib/text-utils";
import { RefinementOptions } from "@/lib/types";
import { refineText } from "@/lib/actions"; 
import { useToast } from "@/hooks/use-toast";

export default function Home() {
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
    <main className="h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="h-full flex flex-col max-w-7xl mx-auto gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Text Refinement Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Enhance your writing with AI-powered refinements
            </p>
          </div>
          <Button onClick={() => {}} variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          <TextEditor
            value={text}
            onChange={setText}
            stats={textStats}
            placeholder="Enter or paste your text here..."
            title="Original Text"
          />

          <div className="flex flex-col gap-4 min-h-0">
            <RefinementControls
              options={options}
              onOptionChange={handleOptionChange}
              onRefine={handleRefine}
              isProcessing={isProcessing}
              disabled={!text}
            />

            <RefinedOutput
              text={refinedText}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </div>
        </div>
      </div>
    </main>
  );
}