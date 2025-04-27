"use client";

import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { TextStats } from "@/lib/types";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  stats: TextStats;
  placeholder?: string;
  title: string;
}

export function TextEditor({
  value,
  onChange,
  stats,
  placeholder,
  title,
}: TextEditorProps) {
  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {stats.wordCount} words | {stats.charCount} characters
        </div>
      </div>
      <Textarea
        placeholder={placeholder}
        className="flex-1 resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Card>
  );
}