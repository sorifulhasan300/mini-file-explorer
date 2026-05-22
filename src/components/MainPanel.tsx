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
  ChevronLeft,
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

  // Placeholder for initial state or missing folder
  if (!currentFolder) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground bg-background px-6 text-center">
        <p>Select a folder from the sidebar to see its contents.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background min-w-0">
      {/* --- Responsive Header Area --- */}
      <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 overflow-hidden mr-10">
          {/* Back Button for mobile view - Hidden on Desktop */}
          <button
            onClick={() => setSelectedFolderId("root")}
            className="md:hidden p-1 hover:bg-accent rounded-full shrink-0"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 ml-4 overflow-hidden">
            <Folder className="text-blue-500 shrink-0 " size={20} />
            <h1 className="text-base sm:text-lg font-semibold truncate">
              {currentFolder.name}
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-3 sm:px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus size={16} />
          <span className="hidden xs:inline">New Item</span>
        </button>
      </header>

      {/* --- Responsive Grid Content --- */}
      <div className="p-4 sm:p-6 overflow-y-auto">
        {currentFolder.children && currentFolder.children.length > 0 ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
            {currentFolder.children.map((item) => (
              <div
                key={item.id}
                onDoubleClick={() => {
                  if (item.type === "folder") setSelectedFolderId(item.id);
                }}
                className="group relative flex flex-col items-center p-3 sm:p-4 rounded-xl border bg-card hover:bg-accent/50 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
              >
                {/* Visual Icon */}
                <div className="mb-2 sm:mb-3">
                  {item.type === "folder" ? (
                    <Folder className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 fill-blue-500/10" />
                  ) : (
                    <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
                  )}
                </div>

                {/* Name Label */}
                <span className="text-xs sm:text-sm font-medium text-center truncate w-full px-1">
                  {item.name}
                </span>

                {/* Dropdown for Actions - Always visible on touch devices, hover on desktop */}
                <div className="absolute top-1 right-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 md:p-1 hover:bg-background/80 rounded-md outline-none">
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
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-[50vh] sm:h-[60vh] text-muted-foreground space-y-2 border-2 border-dashed rounded-2xl p-4 text-center">
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

      {/* --- Modals --- */}
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
