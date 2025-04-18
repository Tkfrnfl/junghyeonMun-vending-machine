
import { useVendingTextStore } from '../../store/vendingTextStore';
import { VendingStatusType } from '../../util/vendingStatusMap'; 

export const DisplayWaitingComponent = () => {
    const { setVendingTextStatus } = useVendingTextStore();

    const handleNextClick = () => {
        let nextStatus: VendingStatusType = 'SELECTING';
        setVendingTextStatus(nextStatus);
    };

    return (
        <div className="p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-bold mb-4">대기 화면</h3>
            <button 
                onClick={handleNextClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                다음으로
            </button>
        </div>
    );
};