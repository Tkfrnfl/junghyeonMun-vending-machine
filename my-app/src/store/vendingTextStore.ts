import { create } from 'zustand';
import { VENDING_STATUS, VENDING_MESSAGES } from '../util/vendingStatusMap';

// 자판기의 상태와 메시지를 관리하는 스토어입니다.
interface VendingTextStore {
    vendingStatus: string
    vendingMsg: string
    setVendingTextStatus: (status: keyof typeof VENDING_STATUS) => void
    //setVendingTextMsg: (msg: string) => void
}

export const useVendingTextStore = create<VendingTextStore>((set) => ({
    vendingStatus: VENDING_STATUS.WAITING,
    vendingMsg: VENDING_MESSAGES[VENDING_STATUS.WAITING],
    
    setVendingTextStatus: (status) => set({ 
        vendingStatus: status,
        vendingMsg: VENDING_MESSAGES[VENDING_STATUS[status]]
    }),
   // setVendingTextMsg: (msg) => set({ vendingMsg: msg })
}));