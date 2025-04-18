import { create } from 'zustand';

interface TextStore {
    displayText: string
    setDisplayText: (text: string) => void
}

export const useTextStore = create<TextStore>((set) => ({
    displayText: 'Hello World',
    setDisplayText: (text: string) => set({ displayText: text }),
}))