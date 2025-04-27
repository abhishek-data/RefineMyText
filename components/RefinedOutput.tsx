"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Type, Check, X, Copy, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadText } from "@/lib/text-utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RefinedOutputProps {
  text: string;
  onAccept: () => void;
  onReject: () => void;
}

export function RefinedOutput({ text, onAccept, onReject }: RefinedOutputProps) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const textWithComment = `${text}\n\nAdditional Comments:\n${comment}`;
      onAccept();
      setComment("");
      setShowCommentBox(false);
      toast({
        title: "Comment added",
        description: "Your comment has been added to the refined text",
      });
    }
  };

  return (
    <Card className={cn("p-4 flex-1 flex flex-col", !text && "opacity-50")}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold">Refined Text</h2>
        {text && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadText(text)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        )}
      </div>
      <div className="relative flex-1 bg-muted rounded-md p-4">
        {text ? (
          <div className="h-full flex flex-col">
            <p className="flex-1 whitespace-pre-wrap overflow-auto">{text}</p>
            
            {showCommentBox && (
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Add your comments here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddComment}>
                    Add Comment
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setShowCommentBox(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={onAccept}
              >
                <Check className="w-4 h-4" /> Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={onReject}
              >
                <X className="w-4 h-4" /> Reject
              </Button>
              {!showCommentBox && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => setShowCommentBox(true)}
                >
                  <MessageSquarePlus className="w-4 h-4" /> Add Comment
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Type className="w-6 h-6 mr-2" />
            Refined text will appear here
          </div>
        )}
      </div>
    </Card>
  );
}