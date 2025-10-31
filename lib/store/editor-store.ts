import { create } from "zustand";

export interface File {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  files: File[];
  createdAt: Date;
  updatedAt: Date;
}

interface EditorState {
  // Project
  currentProject: Project | null;
  projects: Project[];

  // Files
  openFiles: File[];
  activeFileId: string | null;

  // UI State
  showPreview: boolean;
  showChat: boolean;
  showTerminal: boolean;
  showSuggestions: boolean;
  previewMode: "desktop" | "tablet" | "mobile";

  // Actions
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  openFile: (file: File) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;

  togglePreview: () => void;
  toggleChat: () => void;
  toggleTerminal: () => void;
  toggleSuggestions: () => void;
  setPreviewMode: (mode: "desktop" | "tablet" | "mobile") => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  currentProject: null,
  projects: [],
  openFiles: [],
  activeFileId: null,
  showPreview: true,
  showChat: false,
  showTerminal: true,
  showSuggestions: true,
  previewMode: "desktop",

  // Project actions
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      ),
      currentProject:
        state.currentProject?.id === id
          ? { ...state.currentProject, ...updates, updatedAt: new Date() }
          : state.currentProject,
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject:
        state.currentProject?.id === id ? null : state.currentProject,
    })),

  // File actions
  openFile: (file) =>
    set((state) => {
      const exists = state.openFiles.find((f) => f.id === file.id);
      if (exists) {
        return { activeFileId: file.id };
      }
      return {
        openFiles: [...state.openFiles, file],
        activeFileId: file.id,
      };
    }),
  closeFile: (fileId) =>
    set((state) => {
      const newOpenFiles = state.openFiles.filter((f) => f.id !== fileId);
      const newActiveFileId =
        state.activeFileId === fileId
          ? newOpenFiles[newOpenFiles.length - 1]?.id || null
          : state.activeFileId;
      return {
        openFiles: newOpenFiles,
        activeFileId: newActiveFileId,
      };
    }),
  setActiveFile: (fileId) => set({ activeFileId: fileId }),
  updateFileContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) =>
        f.id === fileId ? { ...f, content } : f
      ),
    })),

  // UI actions
  togglePreview: () => set((state) => ({ showPreview: !state.showPreview })),
  toggleChat: () => set((state) => ({ showChat: !state.showChat })),
  toggleTerminal: () => set((state) => ({ showTerminal: !state.showTerminal })),
  toggleSuggestions: () => set((state) => ({ showSuggestions: !state.showSuggestions })),
  setPreviewMode: (mode) => set({ previewMode: mode }),
}));
