export type NodeType = "folder" | "file";

export interface FileNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  children?: FileNode[];
  content?: string;
}
