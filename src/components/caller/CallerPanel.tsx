import CurrentNumber from "./CurrentNumber";
import CallerControls from "./CallerControls";
import NumberBoard from "./NumberBoard";
import History from "./History";

import Button from "../ui/Button";
import Card from "../ui/Card";
import { useCallerStore } from "../../state/callerStore";
import { useSessionStore } from "../../state/sessionStore";
import { useNavigation } from "../../hooks/useNavigation";
import { useEffect } from "react";

export default function CallerPanel() {
  const { drawnNumbers, reset: resetCaller } = useCallerStore();
  const { games, updateGame } = useSessionStore();
  const { goTo } = useNavigation();

  // Last active game
  const currentGame = games[games.length - 1];

  // If no game, redirect to setup
  useEffect(() => {
    if (!currentGame) {
      alert("No active game found. Please set up a new game.");
      goTo("setup");
    }
  }, [currentGame, goTo]);

  if (!currentGame) return null;

  const finishGame = () => {
    if (drawnNumbers.length === 0) {
      if (!confirm("No numbers were drawn. Finish the game anyway?")) return;
    }

    // Save drawn numbers + mark end time
    updateGame(currentGame.id!, {
      drawnNumbers,
      endedAt: new Date().toISOString(),
    });

    // Reset caller for next game
    resetCaller();

    // Go to Session Summary for selecting winners
    goTo("session");
  };

  return (
    <Card>
      <div className="space-y-6">
        <CurrentNumber />
        <CallerControls />
        <History />
        <NumberBoard />

        <div className="pt-4 border-t border-slate-800 flex justify-center">
          <Button
            className="mt-4 animate-pulse bg-yellow-600 text-black hover:animate-none hover:brightness-110"
            onClick={finishGame}
          >
            ✅ Finish Game
          </Button>
        </div>
      </div>
    </Card>
  );
}
