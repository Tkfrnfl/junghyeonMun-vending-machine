import React from 'react';
import { useVendingTextStore } from '../../store/vendingTextStore';
import { VendingStatusType } from '../../util/vendingStatusMap';

interface AlertDialogProps {
    message: string;
    returnStatus: VendingStatusType;
    onClose: () => void;
    isOpen: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ 
    message, 
    returnStatus, 
    onClose,
    isOpen 
}) => {
    const { setVendingTextStatus } = useVendingTextStore();

    if (!isOpen) return null;

    const handleConfirm = () => {
        setVendingTextStatus(returnStatus);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <div className="mb-4 text-lg">
                    {message}
                </div>
                <div className="flex justify-end space-x-2">
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