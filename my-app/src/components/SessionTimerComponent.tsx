import React, { useEffect, useState } from 'react';
import { useVendingTextStore } from '../store/vendingTextStore';

export const SessionTimerComponent: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const [timeLeft, setTimeLeft] = useState(120); // 2분
    const { setVendingTextStatus } = useVendingTextStore();

    useEffect(() => {
        if (!isActive) {
            setTimeLeft(120);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.reload();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="text-center text-gray-600 mb-4">
            세션 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
    );
};