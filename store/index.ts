import { create } from 'zustand';

interface AppState {
    // Settings
    baseSpeed: number;
    highlightColor: string;
    fontSize: 'small' | 'medium' | 'large';

    // Reading state
    text: string;
    words: string[];
    currentIndex: number;
    isPlaying: boolean;

    // Actions
    updateSpeed: (speed: number) => void;
    setText: (text: string) => void;
    setWords: (words: string[]) => void;
    setCurrentIndex: (index: number) => void;
    setIsPlaying: (playing: boolean) => void;
    nextWord: () => void;
    resetReading: () => void;
    resetAll: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial state
    baseSpeed: 250,
    highlightColor: 'red',
    fontSize: 'large',
    text: '',
    words: [],
    currentIndex: 0,
    isPlaying: false,

    // Actions
    updateSpeed: (speed) => set({ baseSpeed: speed }),
    setText: (text) => set({ text }),
    setWords: (words) => set({ words, currentIndex: 0 }),
    setCurrentIndex: (index) => set({ currentIndex: index }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
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