import { useCallerStore } from "../../state/callerStore";
import { useEffect, useRef } from "react";

export default function History() {
  const { drawnNumbers } = useCallerStore();

  // For auto-scrolling to the start (left)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Always scroll back to the left when new number is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [drawnNumbers]);

  // Reverse order: latest first
  const reversed = [...drawnNumbers].reverse();

  return (
    <div className="mt-6 max-md:mt-2">
      <h3 className="font-semibold mb-1 text-gray-800">History</h3>
      <div className="text-xs text-gray-700 mb-2">Latest → Oldest</div>

      <div
        ref={containerRef}
        className="
          flex gap-2 p-3 
          overflow-x-auto whitespace-nowrap scroll-smooth
          rounded-2xl 
          bg-card
        "
      >
        {drawnNumbers.length === 0 && (
          <div className="text-gray-500 text-sm">
            No numbers drawn yet.
          </div>
        )}

        {reversed.map((num, idx) => (
          <div
            key={idx}
            className={`
              px-3 py-2 rounded-4xl text-sm font-semibold border
              ${
                idx === 0
                  ? "bg-green-400 text-black border-blue-400 shadow-md"
                  : "bg-yellow-400 text-gray-800 border-red-800"
              }
            `}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
