import { create } from 'zustand';

export interface PreviousRead {
    id: string;
    words: string[];
    currentIndex: number;
    date: Date;
}

interface AppState {
    // Settings
    baseSpeed: number;
    fontSize: 'small' | 'medium' | 'large';

    // Reading state
    id: string;
    text: string;
    words: string[];
    currentIndex: number;
    isPlaying: boolean;

    // History
    previousReads: Map<string, PreviousRead>;

    // Actions
    updateSpeed: (speed: number) => void;
    setId: (text: string) => void;
    setText: (text: string) => void;
    setWords: (words: string[]) => void;
    setCurrentIndex: (index: number) => void;
    setIsPlaying: (playing: boolean) => void;
    addPreviousRead: () => void;
    nextWord: () => void;
    resetReading: () => void;
    resetAll: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial state
    baseSpeed: 250,
    fontSize: 'large',
    id: '',
    text: '',
    words: [],
    currentIndex: 0,
    isPlaying: false,
    previousReads: new Map(),

    // Actions
    updateSpeed: (baseSpeed) => set({ baseSpeed }),
    setId: (id) => set({ id }),
    setText: (text) => set({ text }),
    setWords: (words) => set({ words }),
    setCurrentIndex: (currentIndex) => set({ currentIndex }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    addPreviousRead: () => set((state) => {
        const newPreviousReads = new Map(state.previousReads);
        newPreviousReads.set(state.id, {
            words: state.words, 
            currentIndex: state.currentIndex, 
            date: new Date(), 
            id: state.id
        });
        return {
            previousReads: newPreviousReads
        };
    }),
    nextWord: () => set((state) => ({
        currentIndex: Math.min(state.currentIndex + 1, state.words.length)
    })),
    resetReading: () => set({ currentIndex: 0, isPlaying: false }),
    resetAll: () => set({
        text: '',
        words: [],
        currentIndex: 0,
        isPlaying: false,
    }),
}));