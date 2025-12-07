import { computeSettlement } from "../../utils/settlement";
import type { GameResult } from "../../types";

interface Props {
  games: GameResult[];
}

export default function SettlementTable({ games }: Props) {
  const netTotals: Record<string, number> = {};

  games.forEach((g) => {
    if (!g.perPlayer) return;

    Object.values(g.perPlayer).forEach((p) => {
      netTotals[p.name] = (netTotals[p.name] || 0) + p.net;
    });
  });

  const settlements = computeSettlement(netTotals);

  return (
    <div className="max-h-60 overflow-auto border border-slate-800 rounded-md p-2 mt-3 bg-card shadow-inner">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400">
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {settlements.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 py-3">
                All settled. No payments needed.
              </td>
            </tr>
          )}

          {settlements.map((s, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-800/30"}
            >
              <td className="py-1 text-red-300 font-medium">{s.from}</td>
              <td className="text-green-300 font-medium">{s.to}</td>
              <td className="font-semibold text-amber-400">
                {s.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
