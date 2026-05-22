# 📂 Next.js Responsive File Explorer

A high-performance, full-stack file management system built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This project features a recursive file system, local persistence, and a built-in text editor.

## ✨ Key Features

- **Recursive File System:** Supports infinite nesting of folders and files.
- **Persistent Storage:** Uses `LocalStorage` to save your file structure and content across sessions.
- **Built-in Text Editor:** Open, edit, and save text files directly within the browser.
- **Fully Responsive:**
  - **Desktop:** Sidebar-driven navigation with a fluid grid main panel.
  - **Mobile:** Interactive Slide-out drawer (Sheet) for folder navigation and touch-optimized actions.
- **CRUD Operations:** Create, Rename, and Delete files and folders with real-time state updates.
- **Modern UI:** Built with **Radix UI** primitives and **Lucide React** icons for a polished, accessible experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks (useState, useEffect) with recursive tree-traversal logic.

## 🚀 Getting Started

First, install the dependencies:

```bash
pnpm install
# or
yarn install
```
