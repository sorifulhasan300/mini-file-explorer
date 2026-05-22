"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteNode } from "@/lib/file-utils";
import { FileNode } from "@/types/file-system";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  node: FileNode | null;
  setFileData: React.Dispatch<React.SetStateAction<FileNode[]>>;
}

export default function DeleteDialog({
  isOpen,
  onClose,
  node,
  setFileData,
}: DeleteDialogProps) {
  const handleDelete = () => {
    if (node) {
      setFileData((prev) => deleteNode(prev, node.id));
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{node?.name}</strong>
            {node?.type === "folder" && " and all its contents"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="cursor-pointer bg-destructive text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
