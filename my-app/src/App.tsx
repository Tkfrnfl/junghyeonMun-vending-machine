import VendingDisplayComponent from "./components/VendingDisplayComponent";

function App() {
  return (
    <div className="bg-[#f4f4f4] min-h-screen flex flex-col">
      <span className="text-center font-sans py-4">음료수 자판기</span>
      
      <div className="grid grid-cols-3 flex-1 gap-4 p-4">
        {/* Left Section - My Status */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* <MyStatus /> */}
        </div>

        {/* Middle Section - Vending Machine Display */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <VendingDisplayComponent />
        </div>

        {/* Right Section - Machine Status */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* <MachineStatus /> */}
        </div>
      </div>
    </div>
  );
}

export default App;