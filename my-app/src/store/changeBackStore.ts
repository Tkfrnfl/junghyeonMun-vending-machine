import { create } from 'zustand';

// 자판기에서 거스름돈을 관리하는 스토어입니다.
interface ChangeAmount {
    won100: number;
    won500: number;
    won1000: number;
    won5000: number;
    won10000: number;
}

interface ChangeStore {
    isPaymentFailed: boolean;
    additionalMsg: string;
    changeAmounts: ChangeAmount;
    
    setPaymentFailed: (status: boolean) => void;
    getPaymentFailed: () => boolean;
    setAdditionalMsg: (msg: string) => void;
    getAdditionalMsg: () => string;
    setChangeAmount: (unit: keyof ChangeAmount, count: number) => void;
    resetChangeAmounts: () => void;
}

export const useChangeStore = create<ChangeStore>((set, get) => ({
    isPaymentFailed: false,
    additionalMsg: '', 
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
    
    getPaymentFailed: () => get().isPaymentFailed,

    setAdditionalMsg: (msg) => set({ 
        additionalMsg: msg 
    }),
    
    getAdditionalMsg: () => get().additionalMsg,

    setChangeAmount: (unit, count) => set((state) => ({
        changeAmounts: {
            ...state.changeAmounts,
            [unit]: Math.max(0, count)
        }
    })),

    resetChangeAmounts: () => set((state) => ({
        changeAmounts: {
            won100: 0,
            won500: 0,
            won1000: 0,
            won5000: 0,
            won10000: 0
        },
        isPaymentFailed: false,    
        additionalMsg: ''         
    }))
}));