import React, { useState } from 'react';
import { useVendingTextStore } from '../../store/vendingTextStore';
import { useBeverageStore } from '../../store/beberageStore';
import { useUserMoneyStore } from '../../store/userMoneyStore';
import { useChangeStore } from '../../store/changeBackStore';
import { AlertDialog } from '../dialog/AlertDialog';
import { VendingStatusType } from '../../util/vendingStatusMap';
import { useUserSelectionStore } from '../../store/userSelectionStore';
import { useVendingMoneyStore } from '../../store/vendingMoneyStore';
// 결제 컴포넌트
interface PaymentInput {
    cash: {
        won100: number;
        won500: number;
        won1000: number;
        won5000: number;
        won10000: number;
        other: number;
    };
    card: number;
}

export const DisplayPaymentComponent = () => {
    const { setVendingTextStatus } = useVendingTextStore();
    const { beverages } = useBeverageStore();
    const { cash, cardBalance,setCardBalance } = useUserMoneyStore();
    const { setChangeAmount, setPaymentFailed,setAdditionalMsg } = useChangeStore();
    const { selectedBeverages, getTotalPrice } = useUserSelectionStore();
    const { 
        getCashCount: getUserCashCount, 
        setCashCount: setUserCashCount 
    } = useUserMoneyStore();
    
    const {
        getCashCount: getVendingCashCount,
        setCashCount: setVendingCashCount
    } = useVendingMoneyStore();

    const [paymentInput, setPaymentInput] = useState<PaymentInput>({
        cash: {
            won100: 0,
            won500: 0,
            won1000: 0,
            won5000: 0,
            won10000: 0,
            other: 0
        },
        card: 0
    });

    const [dialogConfig, setDialogConfig] = useState({
        isOpen: false,
        message: '',
        returnStatus: 'SELECTING' as VendingStatusType,
        isPayment: false,
    });

    const currencies = {
        won10000: 10000,
        won5000: 5000,
        won1000: 1000,
        won500: 500,
        won100: 100
    };

    // 입력된 현금 총액 계산
    const getInputCashTotal = () => {
        const { cash } = paymentInput;
        return (cash.won100 * 100) +
               (cash.won500 * 500) +
               (cash.won1000 * 1000) +
               (cash.won5000 * 5000) +
               (cash.won10000 * 10000) +
               cash.other;
    };

    // 결제 처리
    const handlePayment = () => {
        const totalPrice = getTotalPrice();
        const inputCash = getInputCashTotal();
        const inputCard = paymentInput.card;
        const totalInput = inputCash + inputCard;

        // 기타 화폐 체크
        if (paymentInput.cash.other > 0) {
            setPaymentFailed(true);
            setDialogConfig({
                isOpen: true,
                message: '미등록 화폐가 포함되어 있습니다. 결제를 취소합니다.',
                returnStatus: 'PAYMENT',
                isPayment:false
            });
            return;
        }

        // 금액 부족
        if (totalInput < totalPrice) {
            calculateChange(totalInput)
            setDialogConfig({
                isOpen: true,
                message: '금액이 부족합니다. 다시 결제하시겠습니까?',
                returnStatus: 'PAYMENT',
                isPayment: true
            });
            return;
        }
        // 카드 결제 처리
        if (inputCard > 0) {
            // 카드 잔액 검증
            if (inputCard > cardBalance) {
                setDialogConfig({
                    isOpen: true,
                    message: '카드 잔액이 부족합니다.',
                    returnStatus: 'PAYMENT',
                    isPayment: false
                });
                return;
            }
            const remainingPrice = totalPrice - inputCard; 

            // 카드로만 결제하는 경우
            const hasCashInput = Object.entries(paymentInput.cash)
                .some(([unit, count]) => unit !== 'other' && count > 0);

            if (!hasCashInput && inputCard >= totalPrice) {
                setCardBalance(cardBalance - totalPrice);
                setVendingTextStatus('COMPLETE');
                return;
            }

            // 카드 잔액 차감           
            setCardBalance(cardBalance - inputCard);


            // 카드 + 현금 결제인 경우
            if (remainingPrice > 0) {
                if (inputCash < remainingPrice) {
                    setPaymentFailed(true);
                    setDialogConfig({
                        isOpen: true,
                        message: '현금이 부족합니다.',
                        returnStatus: 'PAYMENT',
                        isPayment: true
                    });
                    // 카드 결제 롤백
                    setCardBalance(cardBalance);
                    return;
                }
                // 거스름돈 계산 (현금 투입액 - 남은 결제금액)
                const change = inputCash - remainingPrice;
                if (change > 0) {
                    calculateChange(change);
                    setVendingTextStatus('CHANGEBACK');
                    return;
                }
            }
        } else {
            // 현금만 사용하는 경우
            const change = totalInput - totalPrice;
            if (change > 0) {
                calculateChange(change);
                setVendingTextStatus('CHANGEBACK');
                return;
            }else {
                // 거스름돈이 없는 경우에도 현금 이동 처리
                Object.entries(paymentInput.cash).forEach(([unit, count]) => {
                    if (unit !== 'other' && count > 0) {
                        // 자판기에 현금 추가
                        const vendingCurrentCount = getVendingCashCount(unit as keyof typeof currencies);
                        setVendingCashCount(unit as keyof typeof currencies, vendingCurrentCount + count);
                        
                        // 사용자 현금 차감
                        const userCurrentCount = getUserCashCount(unit as keyof typeof currencies);
                        setUserCashCount(unit as keyof typeof currencies, userCurrentCount - count);
                    }
                });
            }
        }

        // 거스름돈 계산
        const change = totalInput - totalPrice;
        if (change > 0) {
            calculateChange(change);
            setVendingTextStatus('CHANGEBACK');
            return;
        }

        setVendingTextStatus('COMPLETE');
    };

    // 거스름돈 계산 및 저장
    const calculateChange = (amount: number) => {
    
        // 거스름돈 객체 초기화
        const change = {} as Record<keyof typeof currencies, number>;
        let remainingAmount = amount;
        
        // 가장 큰 단위부터 거스름돈 계산
        Object.entries(currencies).forEach(([unit, value]) => {
            change[unit as keyof typeof currencies] = Math.floor(remainingAmount / value);
            remainingAmount %= value;
        });
    
        // 자판기가 충분한 거스름돈을 가지고 있는지 확인
        const hasEnoughChange = Object.entries(change).every(([unit, requiredCount]) => {
            const availableCount = getVendingCashCount(unit as keyof typeof currencies);
            return availableCount >= requiredCount;
        });
    
        // 거스름돈이 부족한 경우
        if (!hasEnoughChange) {
            setPaymentFailed(true);
            
            // 사용자가 넣은 현금을 changeBackStore에 저장
            Object.entries(paymentInput.cash).forEach(([unit, count]) => {
                if (unit !== 'other' && count > 0) {
                    setChangeAmount(unit as keyof typeof currencies, count);
                }
            });
        
            setAdditionalMsg('거스름돈이 부족합니다. 현금을 반환합니다.');
            
            // 거스름돈 반환 상태로 전환
            setVendingTextStatus('CHANGEBACK');
            return false;
        }
    
        // 사용자가 넣은 현금을 자판기에 추가
        Object.entries(paymentInput.cash).forEach(([unit, count]) => {
            if (unit !== 'other' && count > 0) {
                const vendingCurrentCount = getVendingCashCount(unit as keyof typeof currencies);
                setVendingCashCount(unit as keyof typeof currencies, vendingCurrentCount + count);
                
                const userCurrentCount = getUserCashCount(unit as keyof typeof currencies);
                setUserCashCount(unit as keyof typeof currencies, userCurrentCount - count);
            }
        });
    
        // 거스름돈을 자판기에서 차감하고 사용자에게 지급
        Object.entries(change).forEach(([unit, count]) => {
            if (count > 0) {
                setChangeAmount(unit as keyof typeof change, count);
                
                const vendingCurrentCount = getVendingCashCount(unit as keyof typeof currencies);
                setVendingCashCount(unit as keyof typeof currencies, vendingCurrentCount - count);
                
                const userCurrentCount = getUserCashCount(unit as keyof typeof currencies);
                setUserCashCount(unit as keyof typeof currencies, userCurrentCount + count);
            }
        });
    
        return true;
    };

    return (
        <div className="p-4 bg-green-100 rounded">
            <h3 className="text-xl font-bold mb-4">결제</h3>
            
            {/* 현금 입력 */}
            <div className="space-y-2 mb-4">
                {Object.entries(paymentInput.cash).map(([unit, count]) => (
                    <div key={unit} className="flex items-center justify-between">
                        <span>{unit === 'other' ? '기타 금액' : `${unit}`}</span>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setPaymentInput(prev => ({
                                ...prev,
                                cash: {
                                    ...prev.cash,
                                    [unit]: parseInt(e.target.value) || 0
                                }
                            }))}
                            className="w-20 px-2 py-1 border rounded"
                            min="0"
                        />
                    </div>
                ))}
            </div>

            {/* 카드 결제 */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <span>카드 결제</span>
                    <input
                        type="number"
                        value={paymentInput.card}
                        onChange={(e) => setPaymentInput(prev => ({
                            ...prev,
                            card: parseInt(e.target.value) || 0
                        }))}
                        className="w-20 px-2 py-1 border rounded"
                        min="0"
                        max={cardBalance}
                    />
                </div>
            </div>
            <div>* 기타 금액을 적으시면 지정된 화폐 외의 화폐를 투입하는 시나리오입니다.</div>
            <div>* 카드 결제앤 카드로 결제하실 금액을 적어주세요</div>

            <div className="flex justify-end space-x-2">
                <button
                    onClick={handlePayment}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    결제
                </button>
            </div>

            <AlertDialog

                isOpen={dialogConfig.isOpen}
                message={dialogConfig.message}
                returnStatus={dialogConfig.returnStatus}
                isPayment={dialogConfig.isPayment}
                onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};