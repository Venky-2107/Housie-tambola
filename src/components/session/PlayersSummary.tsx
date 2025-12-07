import type { GameResult } from "../../types";

interface AggregatedPlayer {
  name: string;
  games: number;
  tickets: number;
  spent: number;
  won: number;
  net: number;
}

interface Props {
  games: GameResult[];
}

export default function PlayersSummary({ games }: Props) {
  const summary: Record<string, AggregatedPlayer> = {};

  games.forEach((g) => {
    if (!g.perPlayer) return;

    Object.values(g.perPlayer).forEach((p) => {
      if (!summary[p.name]) {
        summary[p.name] = {
          name: p.name,
          games: 0,
          tickets: 0,
          spent: 0,
          won: 0,
          net: 0,
        };
      }

      const agg = summary[p.name];
      agg.games += 1;
      agg.tickets += p.tickets;
      agg.spent += p.spent;
      agg.won += p.won;
    });
  });

  // compute final net
  Object.values(summary).forEach((p) => {
    p.net = p.won - p.spent;
  });

  const sorted = Object.values(summary).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="max-h-80 overflow-auto border border-slate-800 rounded-md p-2 bg-card shadow-inner">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-800">
            <th>Player</th>
            <th>Games</th>
            <th>Tickets</th>
            <th>Spent</th>
            <th>Won</th>
            <th>Net</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                No games played yet.
              </td>
            </tr>
          )}

          {sorted.map((p, idx) => {
            const status =
              p.net > 0 ? "To Receive" : p.net < 0 ? "To Pay" : "Settled";

            return (
              <tr
                key={p.name}
                className={
                  idx % 2 === 0 ? "bg-yellow-200" : "bg-slate-800/30"
                }
              >
                <td className="py-1">{p.name}</td>
                <td>{p.games}</td>
                <td>{p.tickets}</td>
                <td>{p.spent.toFixed(2)}</td>
                <td>{p.won.toFixed(2)}</td>

                <td
                  className={
                    p.net > 0
                      ? "text-green-400 font-semibold"
                      : p.net < 0
                      ? "text-red-400 font-semibold"
                      : ""
                  }
                >
                  {p.net.toFixed(2)}
                </td>

                <td className="text-xs text-gray-800">{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
