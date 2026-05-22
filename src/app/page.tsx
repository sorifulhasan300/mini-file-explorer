"use client";
import { useState } from "react";
import { FileNode } from "@/types/file-system";
import { initialData } from "@/lib/data/initialData";
import Sidebar from "@/components/Sidebar";
import MainPanel from "@/components/MainPanel";

export default function FileExplorer() {
  const [fileData, setFileData] = useState<FileNode[]>(initialData);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("root");

  return (
    <main className="flex h-screen w-full bg-background overflow-hidden">
      {/* বাম পাশ: সাইডবার */}
      <div className="w-64 border-r bg-muted/30">
        <Sidebar data={fileData} setSelectedFolderId={setSelectedFolderId} />
      </div>

      {/* ডান পাশ: মেইন কন্টেন্ট */}
      <div className="flex-1 flex flex-col">
        <MainPanel
          data={fileData}
          selectedFolderId={selectedFolderId}
          setFileData={setFileData}
        />
      </div>
    </main>
  );
}
