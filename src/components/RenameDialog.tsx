"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { renameNode } from "@/lib/file-utils";
import { FileNode } from "@/types/file-system";

interface RenameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  node: FileNode | null;
  setFileData: React.Dispatch<React.SetStateAction<FileNode[]>>;
}

export default function RenameDialog({
  isOpen,
  onClose,
  node,
  setFileData,
}: RenameDialogProps) {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (node) setNewName(node.name);
  }, [node]);

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (node && newName.trim()) {
      setFileData((prev) => renameNode(prev, node.id, newName.trim()));
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleRename} className="space-y-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <DialogFooter>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
