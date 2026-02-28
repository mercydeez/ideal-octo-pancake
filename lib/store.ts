import { create } from 'zustand';

interface AppState {
    isHoveringProject: boolean;
    setHoveringProject: (state: boolean) => void;
    cursorVariant: "default" | "target";
    setCursorVariant: (variant: "default" | "target") => void;
}

export const useStore = create<AppState>((set) => ({
    isHoveringProject: false,
    setHoveringProject: (state) => set({ isHoveringProject: state }),
    cursorVariant: "default",
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
