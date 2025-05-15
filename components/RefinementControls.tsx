"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, RefreshCw } from "lucide-react";
import { RefinementOptions } from "@/lib/types";

interface RefinementControlsProps {
  options: RefinementOptions;
  onOptionChange: (key: keyof RefinementOptions, value: string) => void;
  onRefine: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

export function RefinementControls({
  options,
  onOptionChange,
  onRefine,
  isProcessing,
  disabled,
}: RefinementControlsProps) {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-center gap-4 bg-white/80 rounded-xl shadow-md">
      <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
        <div className="flex-1 min-w-[120px]">
          <label className="text-sm font-medium mb-1 block">Style</label>
          <Select
            value={options.style}
            onValueChange={(value) => onOptionChange("style", value)}
          >
            <SelectTrigger className="rounded-lg bg-white/90 border border-gray-200 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="text-sm font-medium mb-1 block">Tone</label>
          <Select
            value={options.tone}
            onValueChange={(value) => onOptionChange("tone", value)}
          >
            <SelectTrigger className="rounded-lg bg-white/90 border border-gray-200 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="text-sm font-medium mb-1 block">Length</label>
          <Select
            value={options.length}
            onValueChange={(value) => onOptionChange("length", value)}
          >
            <SelectTrigger className="rounded-lg bg-white/90 border border-gray-200 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="maintain">Maintain Length</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="mt-4 md:mt-[23px] w-full md:w-auto px-8 py-2 text-base font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow hover:from-purple-600 hover:to-indigo-600 transition"
        onClick={onRefine}
        disabled={disabled || isProcessing}
      >
        {isProcessing ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4 mr-2" />
        )}
        Refine Text
      </Button>
    </Card>
  );
}