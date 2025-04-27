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
    <Card className="p-4">
      <h2 className="text-base font-semibold mb-3">Refinement Options</h2>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium">Style</label>
          <Select
            value={options.style}
            onValueChange={(value) => onOptionChange("style", value)}
          >
            <SelectTrigger>
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

        <div>
          <label className="text-sm font-medium">Tone</label>
          <Select
            value={options.tone}
            onValueChange={(value) => onOptionChange("tone", value)}
          >
            <SelectTrigger>
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

        <div>
          <label className="text-sm font-medium">Length</label>
          <Select
            value={options.length}
            onValueChange={(value) => onOptionChange("length", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="maintain">Maintain Length</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="col-span-3"
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
      </div>
    </Card>
  );
}