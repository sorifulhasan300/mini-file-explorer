"use client";
import { FileNode } from "@/types/file-system";
import { findNodeById } from "@/lib/file-utils";
import { Folder, FileText, MoreVertical, Trash2, Edit2 } from "lucide-react";
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
  // বর্তমান ফোল্ডারটি খুঁজে বের করা
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

        {/* Actions Button (Add File/Folder) */}
        <div className="flex gap-2">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
            + New
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {currentFolder.children && currentFolder.children.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {currentFolder.children.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-center p-4 rounded-lg border bg-card hover:bg-accent hover:shadow-sm transition-all cursor-pointer"
            >
              {/* Item Icon */}
              <div className="mb-2">
                {item.type === "folder" ? (
                  <Folder
                    size={48}
                    className="text-blue-500 fill-blue-500/20"
                  />
                ) : (
                  <FileText size={48} className="text-gray-400" />
                )}
              </div>

              {/* Item Name */}
              <span className="text-sm font-medium text-center truncate w-full px-2">
                {item.name}
              </span>

              {/* Actions Dropdown (Rename/Delete) */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 hover:bg-muted rounded-full">
                    <MoreVertical size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Edit2 size={14} /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 size={14} /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-xl">
          <p>This folder is empty</p>
        </div>
      )}
    </div>
  );
}
