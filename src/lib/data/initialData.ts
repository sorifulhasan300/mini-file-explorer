import { FileNode } from "@/types/file-system";

const initialData: FileNode[] = [
  {
    id: "root",
    name: "Root",
    type: "folder",
    parentId: null,
    children: [
      {
        id: "1",
        name: "Documents",
        type: "folder",
        parentId: "root",
        children: [
          {
            id: "2",
            name: "resume.txt",
            type: "file",
            parentId: "1",
            content: "My Resume",
          },
        ],
      },
      {
        id: "3",
        name: "index.html",
        type: "file",
        parentId: "root",
        content: "<h1>Hello World</h1>",
      },
    ],
  },
];
