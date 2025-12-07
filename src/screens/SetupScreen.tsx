import GameSetup from "../components/game-setup/GameSetup";
import Button from "../components/ui/Button";
import { useCallerStore } from "../state/callerStore";

interface Props {
  onStartGame: () => void;
}

export default function SetupScreen({ onStartGame }: Props) {
  const { startGameWithSetup } = useCallerStore();

  function handleStart() {
    startGameWithSetup(); // Loads setup into caller store
    onStartGame();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Setup Game</h1>

      <GameSetup />

      <Button className="mt-4 bg-accent text-black" onClick={handleStart}>
        ▶ Start Calling Numbers
      </Button>
    </div>
  );
}
