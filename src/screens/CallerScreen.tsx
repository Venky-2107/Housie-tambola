import CallerPanel from "../components/caller/CallerPanel";
import Button from "../components/ui/Button";
import { useCallerStore } from "../state/callerStore";
import { useSessionStore } from "../state/sessionStore";

interface Props {
  onEndGame: () => void;
  onBackToSetup: () => void;
}

export default function CallerScreen({ onEndGame, onBackToSetup }: Props) {
  const { finalizeCurrentGame, resetCaller } = useCallerStore();
  const { pushGameResult } = useSessionStore();

  function handleEnd() {
    const result = finalizeCurrentGame();
    if (result) pushGameResult(result);
    resetCaller();
    onEndGame();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Calling Numbers</h1>

      <CallerPanel />

      <div className="mt-4 flex gap-3">
        <Button onClick={handleEnd} className="bg-accent text-black">
          🏁 End Game & View Settlement
        </Button>

        <Button onClick={onBackToSetup} className="bg-slate-700">
          ← Back to Setup
        </Button>
      </div>
    </div>
  );
}
