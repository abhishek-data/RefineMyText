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
    <Card className="p-6 flex flex-col h-full bg-white/80 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {stats.wordCount} words | {stats.charCount} characters
        </div>
      </div>
      <Textarea
        placeholder={placeholder}
        className="flex-1 resize-none rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-4 text-base text-gray-800 min-h-[180px] shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Card>
  );
}