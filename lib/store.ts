import { create } from 'zustand';

interface AppState {
    isHoveringProject: boolean;
    setHoveringProject: (state: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    isHoveringProject: false,
    setHoveringProject: (state) => set({ isHoveringProject: state }),
}));

export interface CursorStore {
    cursorVariant: 'default' | 'targeting'
    setCursorVariant: (variant: 'default' | 'targeting') => void
}

export const useCursorStore = create<CursorStore>((set) => ({
    cursorVariant: 'default',
    setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
