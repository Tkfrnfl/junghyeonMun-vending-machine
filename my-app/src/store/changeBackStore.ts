import { create } from 'zustand';

interface ChangeAmount {
    won100: number;
    won500: number;
    won1000: number;
    won5000: number;
    won10000: number;
}

interface ChangeStore {
    isPaymentFailed: boolean;
    changeAmounts: ChangeAmount;
    
    setPaymentFailed: (status: boolean) => void;
    setChangeAmount: (unit: keyof ChangeAmount, count: number) => void;
    resetChangeAmounts: () => void;
}

export const useChangeStore = create<ChangeStore>((set, get) => ({
    isPaymentFailed: false,
    changeAmounts: {
        won100: 0,
        won500: 0,
        won1000: 0,
        won5000: 0,
        won10000: 0
    },

    setPaymentFailed: (status) => set({ 
        isPaymentFailed: status 
    }),

    setChangeAmount: (unit, count) => set((state) => ({
        changeAmounts: {
            ...state.changeAmounts,
            [unit]: Math.max(0, count)
        }
    })),

    resetChangeAmounts: () => set({
        changeAmounts: {
            won100: 0,
            won500: 0,
            won1000: 0,
            won5000: 0,
            won10000: 0
        }
    }),

}));