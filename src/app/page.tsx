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

  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("file-explorer-data");
    if (savedData) {
      setFileData(JSON.parse(savedData));
    } else {
      setFileData(initialData);
    }
    setIsLoaded(true);
  }, []);

  // Save data to LocalStorage whenever fileData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("file-explorer-data", JSON.stringify(fileData));
    }
  }, [fileData, isLoaded]);

  if (!isLoaded) return null;

  return (
    <main className="flex h-screen w-full bg-background overflow-hidden relative">
      <aside className="hidden md:block w-64 border-r flex-shrink-0">
        <Sidebar data={fileData} setSelectedFolderId={setSelectedFolderId} />
      </aside>

      <section className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Render mobile drawer trigger inside Sidebar component */}
        <div className="md:hidden">
          <Sidebar data={fileData} setSelectedFolderId={setSelectedFolderId} />
        </div>

        <MainPanel
          data={fileData}
          selectedFolderId={selectedFolderId}
          setFileData={setFileData}
          setSelectedFolderId={setSelectedFolderId}
        />
      </section>
    </main>
  );
}
