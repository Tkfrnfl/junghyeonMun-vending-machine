import { create } from 'zustand';
import { useBeverageStore } from './beberageStore';


// 사용자 선택 음료수의 수량과 가격을 관리하는 스토어입니다.
interface BeverageSelection {
    cola: number;
    water: number;
    coffee: number;
}

interface UserSelectionStore {
    selectedBeverages: BeverageSelection;
    getTotalPrice: () => number;
    setSelectedAmount: (beverage: keyof BeverageSelection, amount: number) => void;
    resetSelection: () => void;
}

export const useUserSelectionStore = create<UserSelectionStore>((set, get) => ({
    selectedBeverages: {
        cola: 0,
        water: 0,
        coffee: 0
    },

    getTotalPrice: () => {
        const { selectedBeverages } = get();
        const { beverages } = useBeverageStore.getState();

        return Object.entries(selectedBeverages).reduce((total, [beverage, quantity]) => {
            return total + (beverages[beverage as keyof BeverageSelection].price * quantity);
        }, 0);
    },

    setSelectedAmount: (beverage, amount) => set((state) => ({
        selectedBeverages: {
            ...state.selectedBeverages,
            [beverage]: Math.max(0, amount)
        }
    })),

    resetSelection: () => set({
        selectedBeverages: {
            cola: 0,
            water: 0,
            coffee: 0
        }
    })
}));