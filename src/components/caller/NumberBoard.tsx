import { useCallerStore } from "../../state/callerStore";

const MIN = 1;
const MAX = 90;

export default function NumberBoard() {
  const { drawnNumbers } = useCallerStore();
  const drawnSet = new Set<number>(drawnNumbers);

  return (
    <div className="mt-6 select-none">
      <h3 className="font-semibold mb-2 text-gray-800">Number Board</h3>

      <div className="text-xs mb-3 flex">
        <section className="flex justify-baseline">
          <div className="border border-green-800 w-5 h-5 bg-green-400 rounded-2xl inline-block mr-2"></div>
          <div>Drawn</div>
        </section>
        <section className="flex justify-baseline ml-4">
          <div className="border border-gray-300 w-5 h-5 bg-white rounded-2xl inline-block mr-2"></div>
          <div>Pending</div>
        </section>
      </div>

      <div
        className="
          grid grid-cols-10             /* 10 columns everywhere */
          gap-2                         /* mobile gap */
          sm:gap-3 md:gap-2 lg:gap-3    /* refined spacing */

          px-0 sm:px-2 md:px-0          /* padding for mobile */
          max-w-5xl mx-auto
        "
      >
        {Array.from({ length: MAX }, (_, i) => {
          const num = i + MIN;
          const isDrawn = drawnSet.has(num);

          return (
            <div
              key={num}
              className={`
                flex items-center justify-center
                rounded-3xl md:rounded-4xl
                border font-semibold
                transition-all

                w-9 h-9 text-xs            /* mobile size */
                sm:w-11 sm:h-11 sm:text-sm  /* small screens */
                md:w-12 md:h-12 md:text-base

                ${
                  isDrawn
                    ? "bg-green-500 text-white border-green-700 shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
