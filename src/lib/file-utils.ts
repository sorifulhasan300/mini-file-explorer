import { FileNode } from "@/types/file-system";

export const deleteNode = (nodes: FileNode[], id: string): FileNode[] => {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({
      ...node,
      children: node.children ? deleteNode(node.children, id) : undefined,
    }));
};

export const renameNode = (
  nodes: FileNode[],
  id: string,
  newName: string,
): FileNode[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return { ...node, children: renameNode(node.children, id, newName) };
    }
    return node;
  });
};

export const addNode = (
  nodes: FileNode[],
  parentId: string,
  newNode: FileNode,
): FileNode[] => {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children) {
      return { ...node, children: addNode(node.children, parentId, newNode) };
    }
    return node;
  });
};

export const findNodeById = (
  nodes: FileNode[],
  id: string,
): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};


