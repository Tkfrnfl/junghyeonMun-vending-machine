import { create } from 'zustand';

interface Cash {
    value: number;
    count: number;
}

interface VendingMoneyStore {
    cash: {
        won100: Cash;
        won500: Cash;
        won1000: Cash;
        won5000: Cash;
        won10000: Cash;
    };
    cardBalance: number;
    
    getCashCount: (unit: keyof VendingMoneyStore['cash']) => number;
    setCashCount: (unit: keyof VendingMoneyStore['cash'], count: number) => void;
    
    getCardBalance: () => number;
    setCardBalance: (amount: number) => void;
}

export const useUserMoneyStore = create<VendingMoneyStore>((set, get) => ({
    cash: {
        won100: { value: 100, count: 5 },
        won500: { value: 500, count: 5 },
        won1000: { value: 1000, count: 5 },
        won5000: { value: 5000, count: 5 },
        won10000: { value: 10000, count: 5 },
    },
    cardBalance: 10000,

    getCashCount: (unit) => {
        return get().cash[unit].count;
    },

    setCashCount: (unit, count) => set((state) => ({
        cash: {
            ...state.cash,
            [unit]: {
                ...state.cash[unit],
                count: count
            }
        }
    })),

    getCardBalance: () => {
        return get().cardBalance;
    },

    setCardBalance: (amount) => set({ cardBalance: amount }),
}));