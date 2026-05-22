import { useState } from "react";
import { FileNode } from "@/types/file-system";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";

const TreeNode = ({
  node,
  setSelectedFolderId,
}: {
  node: FileNode;
  setSelectedFolderId: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren =
    node.type === "folder" && node.children && node.children.length > 0;

  return (
    <div className="pl-4">
      <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-accent rounded-sm cursor-pointer text-sm"
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

      {/* If it's a folder and is open, render its children */}
      {isOpen && node.children && (
        <div className="border-l ml-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              setSelectedFolderId={setSelectedFolderId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({
  data,
  setSelectedFolderId,
}: {
  data: FileNode[];
  setSelectedFolderId: (id: string) => void;
}) {
  return (
    <div className="py-4 overflow-y-auto h-full">
      <h2 className="px-6 mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </h2>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          setSelectedFolderId={setSelectedFolderId}
        />
      ))}
    </div>
  );
}
