// 자판기의 상태를 관리하는 맵입니다.
// 각 상태에 대한 메시지를 포함하고 있습니다.

export const VENDING_STATUS = {
    WAITING: 'WAITING',
    SELECTING: 'SELECTING',
    PAYMENT: 'PAYMENT',
    COMPLETE: 'COMPLETE',
    ERROR: 'ERROR'
} as const;

export const VENDING_MESSAGES = {
    [VENDING_STATUS.WAITING]: '음료를 선택하시려면 다음을 눌러주세요',
    [VENDING_STATUS.SELECTING]: '원하시는 음료를 선택해주세요',
    [VENDING_STATUS.PAYMENT]: '결제를 진행해주세요',
    [VENDING_STATUS.COMPLETE]: '음료가 나왔습니다. 감사합니다',
    [VENDING_STATUS.ERROR]: '오류가 발생했습니다. 다시 시도해주세요'
} as const;

export type VendingStatusType = keyof typeof VENDING_STATUS;