import SessionSummary from "../components/session/SessionSummary";
import Button from "../components/ui/Button";
import { useSessionStore } from "../state/sessionStore";

interface Props {
  onNewGame: () => void;
}

export default function SettlementScreen({ onNewGame }: Props) {
  const { clearCurrentGame } = useSessionStore();

  function handleNew() {
    clearCurrentGame();
    onNewGame();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Settlement</h1>

      <SessionSummary />

      <Button className="mt-5 bg-accent text-black" onClick={handleNew}>
        🔄 Start Next Game
      </Button>
    </div>
  );
}
