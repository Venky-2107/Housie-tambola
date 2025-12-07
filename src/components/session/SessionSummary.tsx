import { useSessionStore } from "../../state/sessionStore";
import PlayersSummary from "./PlayersSummary";
import SettlementTable from "./SettlementTable";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useNavigation } from "../../hooks/useNavigation";
import { useCallerStore } from "../../state/callerStore";
import { useState } from "react";
import type { GameResult } from "../../types";

export default function SessionSummary() {
  const { games, updateGame } = useSessionStore();
  const { goTo } = useNavigation();
  const { reset: resetCaller } = useCallerStore();

  const lastGame: GameResult | undefined = games[games.length - 1];

  // Track winner selections locally
  const [winners, setWinners] = useState<Record<number, string>>(
    lastGame?.winners ?? {}
  );

  const handleWinnerSelect = (prizeId: number, name: string) => {
    setWinners((w) => ({ ...w, [prizeId]: name }));
  };

  const computeResults = () => {
    if (!lastGame) return;

    const perPlayer = structuredClone(lastGame.perPlayer ?? {});

    // Reset winnings
    Object.values(perPlayer).forEach((p) => {
      p.won = 0;
      p.net = -p.spent;
    });

    // Apply winners
    lastGame.prizes.forEach((prize) => {
      const winnerName = winners[prize.id];
      if (winnerName && perPlayer[winnerName]) {
        perPlayer[winnerName].won += prize.amount ?? 0;
      }
    });

    // Recompute net
    Object.values(perPlayer).forEach((p) => {
      p.net = p.won - p.spent;
    });

    // Save changes into game
    updateGame(lastGame.id, {
      winners,
      perPlayer,
    });

    alert("Results updated!");
  };

  const startNewGame = () => {
    resetCaller();
    goTo("setup");
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="text-lg text-gray-800 font-medium">
          Games Played: <span className="text-cyan-600">{games.length}</span>
        </div>
        {/* Winner selection UI */}
        {lastGame && (
          <div>
            <h3 className="font-semibold mb-2">Select Winners (Last Game)</h3>

            <div className="max-h-60 overflow-auto border border-slate-800 rounded-md p-2">
              <table className="w-full text-sm border-separate border-spacing-1">
                <thead>
                  <tr className="text-left text-md text-gray-800">
                    <th>Prize</th>
                    <th>Amount</th>
                    <th>Winner</th>
                  </tr>
                </thead>

                <tbody>
                  {lastGame.prizes.map((pr) => (
                    <tr key={pr.id}>
                      <td>{pr.name}</td>
                      <td>{(pr.amount ?? 0).toFixed(2)}</td>
                      <td>
                        <select
                          className="bg-card border border-slate-700 rounded-md px-2 py-1"
                          value={winners[pr.id] ?? ""}
                          onChange={(e) =>
                            handleWinnerSelect(pr.id, e.target.value)
                          }
                        >
                          <option value="">-- Select --</option>
                          {lastGame.players.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button
              className="mt-3 bg-blue-300 text-black"
              onClick={computeResults}
            >
              💰 Compute Results
            </Button>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-2">Players Across All Games</h3>
          <PlayersSummary games={games} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Simplified Settlements</h3>
          <SettlementTable games={games} />
        </div>
      </div>

      <div className="mt-4 pt-2 pb-4 border-b border-slate-800 flex justify-end max-md:justify-center">
        <Button className="bg-teal-300 text-gray-800" onClick={startNewGame}>
          ➕ Start New Game
        </Button>
      </div>
    </Card>
  );
}
