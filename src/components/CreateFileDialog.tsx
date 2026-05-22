"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileNode, NodeType } from "@/types/file-system";
import { addNode } from "@/lib/file-utils";

interface CreateFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parentId: string;
  setFileData: React.Dispatch<React.SetStateAction<FileNode[]>>;
}

export default function CreateFileDialog({
  isOpen,
  onClose,
  parentId,
  setFileData,
}: CreateFileDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<NodeType>("folder");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // Creating the new unique node
    const newNode: FileNode = {
      id: crypto.randomUUID(), // Generates a unique ID securely
      name:
        type === "file" && !name.endsWith(".txt")
          ? `${name.trim()}.txt`
          : name.trim(),
      type: type,
      parentId: parentId,
      children: type === "folder" ? [] : undefined,
      content: type === "file" ? "" : undefined, // Empty starting content for files
    };

    // Update global tree state
    setFileData((prevData) => addNode(prevData, parentId, newNode));

    // Reset form and close
    setName("");
    setType("folder");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Type Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Item Type</label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as NodeType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="folder">Folder</SelectItem>
                <SelectItem value="file">Text File (.txt)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              type="text"
              placeholder={
                type === "folder" ? "e.g., Documents" : "e.g., notes"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              autoFocus
            />
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
          </div>

          {/* Footer Action Buttons */}
          <DialogFooter className="pt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
