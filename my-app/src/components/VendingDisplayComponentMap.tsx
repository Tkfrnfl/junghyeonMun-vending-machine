import React from 'react';
import { useVendingTextStore } from '../store/vendingTextStore';
import { DisplayWaitingComponent } from './display/DisplayWaitingComonent';
import { DisplayBeverageSelectionComponent } from './display/DisplayBeverageSelectionComponent';

// 대기상태 컴포넌트
export const WaitingComponent = () => {
    return (
        <DisplayWaitingComponent/>
    );
};

// 음료 선택 컴포넌트
export const SelectionComponent = () => {
    return (
        <DisplayBeverageSelectionComponent/>
    );
};

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