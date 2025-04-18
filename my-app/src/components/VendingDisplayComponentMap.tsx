import React from 'react';
import { useVendingTextStore } from '../store/vendingTextStore';
import { VendingStatusType } from '../util/vendingStatusMap'; 

export const WaitingComponent = () => {
    const { setVendingTextStatus } = useVendingTextStore();

    const handleNextClick = () => {
        let nextStatus: VendingStatusType = 'SELECTING';
        setVendingTextStatus(nextStatus);
    };

    return (
        <div className="p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-bold mb-4">대기 화면</h3>
            <button 
                onClick={handleNextClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                다음으로
            </button>
        </div>
    );
};
export const SelectingComponent = () => (
    <div className="p-4 bg-blue-100 rounded">
        <h3>음료 선택</h3>
    </div>
);

export const PaymentComponent = () => (
    <div className="p-4 bg-green-100 rounded">
        <h3>결제 진행</h3>
    </div>
);

export const CompleteComponent = () => (
    <div className="p-4 bg-yellow-100 rounded">
        <h3>결제 완료</h3>
    </div>
);

export const ErrorComponent = () => (
    <div className="p-4 bg-red-100 rounded">
        <h3>오류 발생</h3>
    </div>
);