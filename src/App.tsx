import GameSetup from "./components/game-setup/GameSetup";
import CallerPanel from "./components/caller/CallerPanel";
import SessionSummary from "./components/session/SessionSummary";
import { useNavigation } from "./hooks/useNavigation";

export default function App() {
  const { screen, goTo } = useNavigation();

  const tabClass = (tab: string) =>
    `px-3 py-1 rounded transition ${
      screen === tab
        ? "bg-lime-500 text-black font-semibold rounded-2xl px-3"
        : "bg-emerald-800 text-gray-200 hover:bg-slate-600 rounded-2xl px-4"
    }`;

  return (
    <div className="p-4 w-full mx-auto text-gray-20">
      {/* Top Navigation Tabs */}
      <nav className="flex gap-3 mb-6 justify-center">
        <button onClick={() => goTo("setup")} className={tabClass("setup")}>
          ⬅️ Setup
        </button>

        <button onClick={() => goTo("caller")} className={tabClass("caller")}>
          Caller
        </button>

        <button onClick={() => goTo("session")} className={tabClass("session")}>
          Session ➡️
        </button>
      </nav>

      {/* Screen Router */}
      {screen === "setup" && <GameSetup />}
      {screen === "caller" && <CallerPanel />}
      {screen === "session" && <SessionSummary />}
    </div>
  );
}
