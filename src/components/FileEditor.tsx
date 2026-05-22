"use client";

import { useState } from "react";
import { FileNode } from "@/types/file-system";
import { X, Save } from "lucide-react";

interface FileEditorProps {
  file: FileNode;
  onClose: () => void;
  onSave: (id: string, newContent: string) => void;
}

export default function FileEditor({ file, onClose, onSave }: FileEditorProps) {
  const [content, setContent] = useState(file.content || "");

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in zoom-in duration-200">
      <header className="h-16 border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full"
          >
            <X size={20} />
          </button>
          <h2 className="font-semibold">{file.name}</h2>
        </div>
        <button
          onClick={() => onSave(file.id, content)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Save size={16} /> Save Changes
        </button>
      </header>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-8 bg-transparent outline-none resize-none font-mono text-sm leading-relaxed"
        placeholder="Start typing..."
        autoFocus
      />
    </div>
  );
}
