
import { DisplayWaitingComponent } from './display/DisplayWaitingComonent';
import { DisplayBeverageSelectionComponent } from './display/DisplayBeverageSelectionComponent';
import { DisplayPaymentComponent } from './display/DisplayPaymentComponent';
import { DisplayChangeBackComponent } from './display/DisplayChangeBackComponent';
import { DisplayCompleteComponent } from './display/DisplayCompleteComponent';

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
export const ChangeBackComponent = () => {
    return (
     <DisplayChangeBackComponent/>  
    );
};

// 결제 완료 컴포넌트
export const CompleteComponent = () => {
    return (
     <DisplayCompleteComponent/>
    );
};
