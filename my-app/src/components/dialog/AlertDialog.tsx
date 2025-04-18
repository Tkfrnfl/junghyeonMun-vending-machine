import React from 'react';
import { useVendingTextStore } from '../../store/vendingTextStore';
import { VendingStatusType } from '../../util/vendingStatusMap';
import { useChangeStore } from '../../store/changeBackStore';

interface AlertDialogProps {
    message: string;
    returnStatus: VendingStatusType;
    onClose: () => void;
    isOpen: boolean;
    isPayment?: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ 
    message, 
    returnStatus, 
    onClose,
    isOpen,
    isPayment 
}) => {
    const { setVendingTextStatus } = useVendingTextStore();
    const {setPaymentFailed} = useChangeStore()
    if (!isOpen) return null;

    const handleConfirm = () => {
        setVendingTextStatus(returnStatus);
        onClose();
    };

    const handleCancel = () => {
        setPaymentFailed(true);
        setVendingTextStatus('CHANGEBACK');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <div className="mb-4 text-lg">
                    {message}
                </div>
                <div className="flex justify-end space-x-2">
                    {isPayment && (
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            취소
                        </button>
                    )}
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};