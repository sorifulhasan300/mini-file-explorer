"use client";
import { useState } from "react"; // Added useState
import { FileNode } from "@/types/file-system";
import { findNodeById } from "@/lib/file-utils";
import {
  Folder,
  FileText,
  MoreVertical,
  Trash2,
  Edit2,
  Plus,
} from "lucide-react";
import CreateFileDialog from "./CreateFileDialog"; // Import the Modal
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainPanelProps {
  data: FileNode[];
  selectedFolderId: string;
  setFileData: React.Dispatch<React.SetStateAction<FileNode[]>>;
}

export default function MainPanel({
  data,
  selectedFolderId,
  setFileData,
}: MainPanelProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false); // Modal control state
  const currentFolder = findNodeById(data, selectedFolderId);

  if (!currentFolder) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Select a folder to view contents
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Folder className="text-blue-500" /> {currentFolder.name}
        </h1>

        {/* Triggering button */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-primary text-primary-foreground flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> New
          </button>
        </div>
      </div>

      {/* Grid Content... (keep your existing grid implementation mapping over currentFolder.children) */}

      {/* Render the Create Dialog */}
      <CreateFileDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        parentId={selectedFolderId}
        setFileData={setFileData}
      />
    </div>
  );
}
