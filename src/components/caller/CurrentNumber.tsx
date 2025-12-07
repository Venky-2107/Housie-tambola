import { useCallerStore } from "../../state/callerStore";

export default function CurrentNumber() {
  const { drawnNumbers } = useCallerStore();

  // Latest number or placeholder
  const current =
    drawnNumbers.length > 0 ? drawnNumbers[drawnNumbers.length - 1] : "--";

  return (
    <div className="text-center p-2 rounded-xl bg-linear-to-b from-gray-500 to-slate-600 border border-green-800 shadow-md">
      {/* Label */}
      <div className="text-md text-white font-medium tracking-widest uppercase">
        Current Number
      </div>

      {/* Main Number */}
      <div className="text-7xl font-bold text-yellow-400 select-none">
        {current}
      </div>

      {/* Subtext */}
      <div className="text-sm text-gray-100 mt-1">
        {drawnNumbers.length} drawn
      </div>
    </div>
  );
}
