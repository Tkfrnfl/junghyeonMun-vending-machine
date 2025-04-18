import React, { useState } from 'react';
import { useVendingTextStore } from '../../store/vendingTextStore';
import { useBeverageStore } from '../../store/beberageStore';
import { useUserSelectionStore } from '../../store/userSelectionStore';
import { VendingStatusType } from '../../util/vendingStatusMap';
import { AlertDialog } from '../dialog/AlertDialog';

interface BeverageSelection {
    cola: number;
    water: number;
    coffee: number;
}

export const DisplayBeverageSelectionComponent = () => {
    const { setVendingTextStatus } = useVendingTextStore();
    const { getBeverageStock } = useBeverageStore();
    const { selectedBeverages, setSelectedAmount } = useUserSelectionStore();

    const [dialogConfig, setDialogConfig] = useState({
        isOpen: false,
        message: '',
        returnStatus: 'WAITING' as VendingStatusType
    });

    const handleQuantityChange = (beverage: keyof BeverageSelection, value: number) => {
        setSelectedAmount(beverage, Math.max(0, value));
    };

    const handleComplete = () => {
        const totalSelected = Object.values(selectedBeverages).reduce((sum, curr) => sum + curr, 0);
        if (totalSelected === 0) {
            setDialogConfig({
                isOpen: true,
                message: '최소 1개 이상의 음료를 선택해주세요.',
                returnStatus: 'SELECTING'
            });
            return;
        }

        // 재고 확인
        const stockCheck = Object.entries(selectedBeverages).every(([beverage, quantity]) => {
            const currentStock = getBeverageStock(beverage as keyof BeverageSelection);
            return quantity <= currentStock;
        });

        if (!stockCheck) {
            setDialogConfig({
                isOpen: true,
                message: '선택하신 수량이 재고보다 많습니다.',
                returnStatus: 'SELECTING'
            });
            return;
        }

        // 결제 진행
        setVendingTextStatus('PAYMENT');
    };

    return (
        <div className="p-4 bg-blue-100 rounded">
            <h3 className="text-xl font-bold mb-4">음료 선택</h3>
            
            <div className="space-y-4">
                {Object.entries(selectedBeverages).map(([beverage, quantity]) => (
                    <div key={beverage} className="flex items-center justify-between">
                        <span className="font-medium">
                            {beverage === 'cola' ? '콜라' : 
                             beverage === 'water' ? '물' : '커피'}
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleQuantityChange(beverage as keyof BeverageSelection, quantity - 1)}
                                className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                -
                            </button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(beverage as keyof BeverageSelection, quantity + 1)}
                                className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleComplete}
                className="mt-6 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                선택 완료
            </button>
            <AlertDialog 
                isOpen={dialogConfig.isOpen}
                message={dialogConfig.message}
                returnStatus={dialogConfig.returnStatus}
                onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};