import React from 'react';
import { useVendingTextStore } from '../store/vendingTextStore';
import { VENDING_STATUS } from '../util/vendingStatusMap';
import {
    WaitingComponent,
    SelectingComponent,
    PaymentComponent,
    CompleteComponent,
    ErrorComponent
} from './VendingDisplayComponentMap';

import { VendingStatusType } from '../util/vendingStatusMap';

const statusComponentMap: Record<VendingStatusType, () => JSX.Element> = {
    'WAITING': WaitingComponent,
    'SELECTING': SelectingComponent,
    'PAYMENT': PaymentComponent,
    'COMPLETE': CompleteComponent,
    'ERROR': ErrorComponent,
};

const VendingDisplayComponent = () => {
    const { vendingStatus, vendingMsg, setVendingTextStatus } = useVendingTextStore();
    
    const StatusComponent = statusComponentMap[vendingStatus as VendingStatusType];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-4 text-lg font-bold">
                현재 상태: {vendingStatus}
            </div>

            <div className="text-center text-xl mb-4">
                {vendingMsg}
            </div>

            <div className="w-full max-w-md">
                <StatusComponent />
            </div>
        </div>
    );
};

export default VendingDisplayComponent;