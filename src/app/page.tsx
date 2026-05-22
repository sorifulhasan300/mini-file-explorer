/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { FileNode } from "@/types/file-system";
import { initialData } from "@/lib/data/initialData";
import Sidebar from "@/components/Sidebar";
import MainPanel from "@/components/MainPanel";

export default function FileExplorer() {
  const [fileData, setFileData] = useState<FileNode[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("root");
  const [isLoaded, setIsLoaded] = useState(false);

  // ১. মাউন্ট হওয়ার সময় LocalStorage থেকে ডেটা লোড করা
  useEffect(() => {
    const savedData = localStorage.getItem("file-explorer-data");
    if (savedData) {
      setFileData(JSON.parse(savedData));
    } else {
      setFileData(initialData);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("file-explorer-data", JSON.stringify(fileData));
    }
  }, [fileData, isLoaded]);

  if (!isLoaded) return null;

  return (
    <main className="flex h-screen w-full bg-background overflow-hidden">
      {/* --- Sidebar --- */}
      <div className="w-64 border-r">
        <Sidebar data={fileData} setSelectedFolderId={setSelectedFolderId} />
      </div>

      {/* --- Main Panel --- */}
      <MainPanel
        data={fileData}
        selectedFolderId={selectedFolderId}
        setFileData={setFileData}
        setSelectedFolderId={setSelectedFolderId}
      />
    </main>
  );
}
