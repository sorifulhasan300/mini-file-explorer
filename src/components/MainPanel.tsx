"use client";

import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateFileDialog from "./CreateFileDialog";
import RenameDialog from "./RenameDialog";
import DeleteDialog from "./DeleteDialog";

interface MainPanelProps {
  data: FileNode[];
  selectedFolderId: string;
  setFileData: React.Dispatch<React.SetStateAction<FileNode[]>>;
  setSelectedFolderId: (id: string) => void;
}

export default function MainPanel({
  data,
  selectedFolderId,
  setFileData,
  setSelectedFolderId,
}: MainPanelProps) {
  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<FileNode | null>(null);

  // Find the currently selected folder's data
  const currentFolder = findNodeById(data, selectedFolderId);

  // if folder not found (e.g. on initial load), show a placeholder
  if (!currentFolder) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground bg-background">
        <p>Select a folder from the sidebar to see its contents.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* --- Header Area --- */}
      <header className="h-16 border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-2 overflow-hidden">
          <Folder className="text-blue-500 shrink-0" size={20} />
          <h1 className="text-lg font-semibold truncate">
            {currentFolder.name}
          </h1>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> New Item
        </button>
      </header>

      {/* --- Main Content Area --- */}
      <div className="p-6 overflow-y-auto">
        {currentFolder.children && currentFolder.children.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentFolder.children.map((item) => (
              <div
                key={item.id}
                onDoubleClick={() => {
                  if (item.type === "folder") setSelectedFolderId(item.id);
                }}
                className="group relative flex flex-col items-center p-4 rounded-xl border bg-card hover:bg-accent/50 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
              >
                {/* Icon Layout */}
                <div className="mb-3">
                  {item.type === "folder" ? (
                    <Folder
                      size={48}
                      className="text-blue-500 fill-blue-500/10"
                    />
                  ) : (
                    <FileText size={48} className="text-slate-400" />
                  )}
                </div>

                {/* Name */}
                <span className="text-sm font-medium text-center truncate w-full px-1">
                  {item.name}
                </span>

                {/* Quick Actions (Dropdown) */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 hover:bg-background/80 rounded-md">
                      <MoreVertical
                        size={16}
                        className="text-muted-foreground"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => {
                          setActiveNode(item);
                          setIsRenameOpen(true);
                        }}
                        className="gap-2"
                      >
                        <Edit2 size={14} /> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setActiveNode(item);
                          setIsDeleteOpen(true);
                        }}
                        className="gap-2 text-destructive focus:text-destructive"
                      >
                        <Trash2 size={14} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground space-y-2 border-2 border-dashed rounded-2xl">
            <Folder size={40} className="opacity-20" />
            <p className="text-sm">This folder is empty</p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="text-primary text-xs font-semibold hover:underline"
            >
              Create something new
            </button>
          </div>
        )}
      </div>

      {/* --- Modals / Dialogs --- */}
      <CreateFileDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        parentId={selectedFolderId}
        setFileData={setFileData}
      />

      <RenameDialog
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        node={activeNode}
        setFileData={setFileData}
      />

      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        node={activeNode}
        setFileData={setFileData}
      />
    </div>
  );
}
