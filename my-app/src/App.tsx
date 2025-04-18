import { MyStatusComponent } from "./components/MyStatusComponent";
import VendingDisplayComponent from "./components/VendingDisplayComponent";
import { VendingStatusComponent } from "./components/VendingStatusComponent";
import { SessionTimerComponent } from "./components/SessionTimerComponent";
import { useVendingTextStore } from "./store/vendingTextStore";

function App() {
  const { vendingStatus } = useVendingTextStore();

  return (
    <div className="bg-[#f4f4f4] min-h-screen flex flex-col">
      <span className="text-center font-sans py-4">음료수 자판기</span>
      <SessionTimerComponent isActive={vendingStatus !== 'WAITING'} />
      <div className="grid grid-cols-3 flex-1 gap-4 p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <MyStatusComponent />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <VendingDisplayComponent />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <VendingStatusComponent />
        </div>
      </div>
    </div>
  );
}

export default App;