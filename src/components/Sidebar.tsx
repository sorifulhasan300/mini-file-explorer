"use client";

import { useState } from "react";
import { FileNode } from "@/types/file-system";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const TreeNode = ({
  node,
  setSelectedFolderId,
  onSelect,
}: {
  node: FileNode;
  setSelectedFolderId: (id: string) => void;
  onSelect?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren =
    node.type === "folder" && node.children && node.children.length > 0;

  return (
    <div className="pl-4">
      <div
        className="flex items-center gap-2 py-1.5 px-2 hover:bg-accent rounded-sm cursor-pointer text-sm"
        onClick={() => {
          if (node.type === "folder") {
            setIsOpen(!isOpen);
            setSelectedFolderId(node.id);
          }
        }}
      >
        {node.type === "folder" && (
          <span className="w-4">
            {hasChildren ? (
              isOpen ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )
            ) : null}
          </span>
        )}
        {node.type === "folder" ? (
          <Folder size={16} className="text-blue-500" />
        ) : (
          <FileText size={16} className="text-gray-400" />
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {isOpen && node.children && (
        <div className="border-l ml-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              setSelectedFolderId={setSelectedFolderId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Sidebar Component
export default function Sidebar({
  data,
  setSelectedFolderId,
}: {
  data: FileNode[];
  setSelectedFolderId: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <div className="py-4 h-full overflow-y-auto">
      <h2 className="px-6 mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </h2>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          setSelectedFolderId={setSelectedFolderId}
          onSelect={() => setOpen(false)}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-background border rounded-md shadow-sm">
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="flex items-center gap-2">
                <Folder size={20} className="text-blue-500" /> File Explorer
              </SheetTitle>
            </SheetHeader>
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block w-full h-full border-r bg-muted/20">
        {SidebarContent}
      </div>
    </>
  );
}
