import { create } from 'zustand';

export interface PreviousRead {
    id: string;
    previewText: string;
    words: string[];
    currentIndex: number;
    date: Date;
}

interface AppState {
    // Settings
    baseSpeed: number;
    fontSize: 'small' | 'medium' | 'large';

    // Preview state
    previewText: string;

    // Reading state
    id: string;
    words: string[];
    currentIndex: number;
    isPlaying: boolean;

    // Playback
    rewindAmount: number; // How many words to rewind.
    forwardAmount: number // How many words to skip.

    // History
    previousReads: Map<string, PreviousRead>;

    // Actions
    updateSpeed: (speed: number) => void;
    setPreviewText: (previewText: string) => void;
    setId: (id: string) => void;
    setWords: (words: string[]) => void;
    setCurrentIndex: (index: number) => void;
    setIsPlaying: (playing: boolean) => void;
    setRewindAmount: (amount: number) => void;
    setForwardAmount: (amount: number) => void;
    rewind: () => void;
    forward: () => void;
    addPreviousRead: () => void;
    nextWord: () => void;
    resetReading: () => void;
    resetPreview: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial state
    baseSpeed: 250,
    fontSize: 'large',
    previewText: '',
    id: '',
    words: [],
    currentIndex: 0,
    rewindAmount: 5,
    forwardAmount: 5,
    isPlaying: false,
    previousReads: new Map(),

    // Actions
    updateSpeed: (baseSpeed) => set({ baseSpeed }),
    setPreviewText: (previewText) => set({ previewText }),
    setId: (id) => set({ id }),
    setWords: (words) => set({ words }),
    setCurrentIndex: (currentIndex) => set({ currentIndex }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setRewindAmount: (rewindAmount) => set({ rewindAmount }),
    setForwardAmount: (forwardAmount) => set({ forwardAmount }),
    rewind: () => set((state) => {
        if (state.currentIndex - state.rewindAmount < 0) {
            return {
                currentIndex: 0
            }
        }
        return { 
            currentIndex: state.currentIndex - state.rewindAmount 
        }
    }),
    forward: () => set((state) => ({ currentIndex: state.currentIndex + state.forwardAmount })),
    addPreviousRead: () => set((state) => {
        const newPreviousReads = new Map(state.previousReads);
        newPreviousReads.set(state.id, {
            previewText: state.previewText,
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
    resetReading: () => set({ isPlaying: false }),
    resetPreview: () => set({ currentIndex: 0, previewText: '' }),
}));