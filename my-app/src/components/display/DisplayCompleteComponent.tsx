import React, { useEffect,useRef } from 'react';
import { useUserSelectionStore } from '../../store/userSelectionStore';
import { useBeverageStore } from '../../store/beberageStore';
import { useVendingTextStore } from '../../store/vendingTextStore';
// 완료 컴포넌트

export const DisplayCompleteComponent = () => {
    const { selectedBeverages, resetSelection } = useUserSelectionStore();
    const { getBeverageStock, setBeverageStock } = useBeverageStore();
    const { setVendingTextStatus } = useVendingTextStore();
    const hasProcessed = useRef(false);

    // 재고 차감 처리
    useEffect(() => {
        if (!hasProcessed.current) {
            Object.entries(selectedBeverages).forEach(([beverage, quantity]) => {
                if (quantity > 0) {
                    const currentStock = getBeverageStock(beverage as keyof typeof selectedBeverages);
                    setBeverageStock(
                        beverage as keyof typeof selectedBeverages, 
                        currentStock - quantity
                    );
                }
            });
            
            // 선택 상태 초기화
            resetSelection();
            hasProcessed.current = true;
        }
    }, []);

    const handleConfirm = () => {
        setVendingTextStatus('WAITING');
    };

    return (
        <div className="p-4 bg-green-100 rounded">
            <h3 className="text-xl font-bold mb-4">결제 완료</h3>
        

            <button
                onClick={handleConfirm}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                확인
            </button>
        </div>
    );
};