import React from 'react';
import { useBeverageStore } from '../store/beberageStore';
import { useVendingMoneyStore } from '../store/vendingMoneyStore';

export const VendingStatusComponent: React.FC = () => {
    const { beverages } = useBeverageStore();
    const { getCashCount} = useVendingMoneyStore();

    const denominations = {
        won10000: { value: 10000, label: '10,000원' },
        won5000: { value: 5000, label: '5,000원' },
        won1000: { value: 1000, label: '1,000원' },
        won500: { value: 500, label: '500원' },
        won100: { value: 100, label: '100원' },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">자판기 상태</h2>

            {/* 음료 재고 현황 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">재고 현황</h3>
                <div className="space-y-2">
                    {Object.entries(beverages).map(([key, beverage]) => (
                        <div key={key} className="flex justify-between items-center">
                            <div>
                                <span className="font-medium">{beverage.name}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                    ({beverage.price.toLocaleString()}원)
                                </span>
                            </div>
                            <span className={`font-medium ${
                                beverage.stock < 2 ? 'text-red-500' : 'text-green-600'
                            }`}>
                                {beverage.stock}개
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 보유 현금 현황 */}
            <div>
                <h3 className="text-lg font-semibold mb-2">보유 현금</h3>
                <div className="space-y-2">
                    {Object.entries(denominations).map(([unit, { label }]) => (
                        <div key={unit} className="flex justify-between items-center">
                            <span>{label}</span>
                            <span className="font-medium">
                                {getCashCount(unit as keyof typeof denominations)}장
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};