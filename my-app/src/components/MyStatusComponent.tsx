import React from 'react';
import { useUserMoneyStore } from '../store/userMoneyStore';

// 내 자산 현황 컴포넌트
export const MyStatusComponent: React.FC = () => {
    const { cash, cardBalance, getCashCount } = useUserMoneyStore();

    const denominations = {
        won10000: { value: 10000, label: '10,000원' },
        won5000: { value: 5000, label: '5,000원' },
        won1000: { value: 1000, label: '1,000원' },
        won500: { value: 500, label: '500원' },
        won100: { value: 100, label: '100원' },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">내 자산 현황</h2>
            
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">카드 잔액</h3>
                <p className="text-2xl font-bold text-blue-600">
                    {cardBalance.toLocaleString()}원
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">보유 현금</h3>
                <div className="space-y-2">
                    {Object.entries(denominations).map(([unit, { label }]) => (
                        <div key={unit} className="flex justify-between items-center">
                            <span>{label}</span>
                            <span className="font-medium">
                                {getCashCount(unit as keyof typeof cash)}장
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};