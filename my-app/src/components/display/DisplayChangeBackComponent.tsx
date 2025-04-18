import React from 'react';
import { useChangeStore } from '../../store/changeBackStore';
import { useVendingTextStore } from '../../store/vendingTextStore';
// 잔돈 반환 컴포넌트
export const DisplayChangeBackComponent = () => {
    const { changeAmounts, resetChangeAmounts,getPaymentFailed, getAdditionalMsg } = useChangeStore();
    const { setVendingTextStatus } = useVendingTextStore();

    const currencies = {
        won10000: { value: 10000, label: '10,000원' },
        won5000: { value: 5000, label: '5,000원' },
        won1000: { value: 1000, label: '1,000원' },
        won500: { value: 500, label: '500원' },
        won100: { value: 100, label: '100원' }
    };

    const handleConfirm = () => {
        if(getPaymentFailed()){
            resetChangeAmounts();
            setVendingTextStatus('PAYMENT');
        }else{ 
            resetChangeAmounts();
            setVendingTextStatus('COMPLETE');
        }

       
    };

    return (
        <div className="p-4 bg-purple-100 rounded">
            <h3 className="text-xl font-bold mb-4">잔돈 반환</h3>
            <h4 className="text-xl font-bold mb-4">{getAdditionalMsg()}</h4>
            <div className="space-y-2 mb-6">
                {Object.entries(changeAmounts).map(([unit, count]) => {
                    if (count > 0) {
                        return (
                            <div key={unit} className="flex justify-between items-center">
                                <span>{currencies[unit as keyof typeof currencies].label}</span>
                                <span className="font-medium">{count}장</span>
                            </div>
                        );
                    }
                    return null;
                })}
                
            </div>

            <button
                onClick={handleConfirm}
                className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
                확인
            </button>
        </div>
    );
};