import React from 'react';
import { useVendingTextStore } from '../store/vendingTextStore';
import {
    WaitingComponent,
    SelectionComponent,
    PaymentComponent,
    ChangeBackComponent,
    CompleteComponent,
} from './VendingDisplayComponentMap';

import { VendingStatusType } from '../util/vendingStatusMap';

// 자판기 상태에 따라 다른 컴포넌트를 렌더링 해주는 컴포넌트

const statusComponentMap: Record<VendingStatusType, () => JSX.Element> = {
    'WAITING': WaitingComponent,
    'SELECTING': SelectionComponent,
    'PAYMENT': PaymentComponent,
    'CHANGEBACK': ChangeBackComponent,
    'COMPLETE': CompleteComponent,
};

const VendingDisplayComponent:React.FC = () => {
    const { vendingStatus, vendingMsg, setVendingTextStatus } = useVendingTextStore();
    
    const StatusComponent = statusComponentMap[vendingStatus as VendingStatusType];

    return (
        <div className="flex flex-col items-center justify-center h-full">

            <div className="text-center text-xl mb-4">
                {vendingMsg}
            </div>

            <div className="w-full max-w-md">
                {StatusComponent ? <StatusComponent /> : <div>상태를 찾을 수 없습니다.</div>}
            </div>
        </div>
    );
};

export default VendingDisplayComponent;