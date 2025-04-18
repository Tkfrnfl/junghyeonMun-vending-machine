import { create } from 'zustand';

// 자판기에서 판매하는 음료수의 재고와 가격을 관리하는 스토어입니다.
interface Beverage {
    name: string;
    stock: number;
    price: number;
}

interface BeverageStore {
    beverages: {
        cola: Beverage;
        water: Beverage;
        coffee: Beverage;
    };
    getBeverageStock: (beverageName: keyof BeverageStore['beverages']) => number;
    setBeverageStock: (beverageName: keyof BeverageStore['beverages'], quantity: number) => void;
}

export const useBeverageStore = create<BeverageStore>((set, get) => ({
    beverages: {
        cola: { name: '콜라', stock: 5, price: 1100 },
        water: { name: '물', stock: 5, price: 600 },
        coffee: { name: '커피', stock: 5, price: 700 },
    },

    getBeverageStock: (beverageName) => {
        return get().beverages[beverageName].stock;
    },

    setBeverageStock: (beverageName, quantity) => set((state) => ({
        beverages: {
            ...state.beverages,
            [beverageName]: {
                ...state.beverages[beverageName],
                stock: quantity
            }
        }
    })),
}));