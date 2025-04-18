import React from 'react';
import { useVendingTextStore } from '../store/vendingTextStore';
import { DisplayWaitingComponent } from './display/DisplayWaitingComonent';
import { DisplayBeverageSelectionComponent } from './display/DisplayBeverageSelectionComponent';
import { DisplayPaymentComponent } from './display/DisplayPaymentComponent';

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

// 결제 진행 컴포넌트
export const PaymentComponent = () => {
    return (
     <DisplayPaymentComponent/>
    );
};

// 잔돈 반환 컴포넌트
export const ChangeBackComponent = () => (
    <div className="p-4 bg-purple-100 rounded">
        <h3>잔돈 반환</h3>
    </div>
);

// 결제 완료 컴포넌트
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