// GameSetup.tsx — CLEAN VERSION (no winner selection during setup)

import { useState, useMemo } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PlayersTable from "./PlayersTable";
import PrizesTable from "./PrizesTable";
// import WinnerBoard from "./WinnerBoard";

import type { Player, Prize } from "../../types";
import { useSessionStore } from "../../state/sessionStore";
import { useCallerStore } from "../../state/callerStore";
import { useNavigation } from "../../hooks/useNavigation";

export default function GameSetup() {
  const { addGame } = useSessionStore();
  const { reset: resetCaller } = useCallerStore();
  const { goTo } = useNavigation();

  // -------------------------
  // Default players
  // -------------------------
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      name: "",
      tickets: 1,
    }))
  );

  // -------------------------
  // Default prizes
  // -------------------------
  const [prizes, setPrizes] = useState<Prize[]>([
    { id: 1, name: "Quick Five", share: 10, amount: 0 },
    { id: 2, name: "First Line", share: 15, amount: 0 },
    { id: 3, name: "Second Line", share: 15, amount: 0 },
    { id: 4, name: "Third Line", share: 15, amount: 0 },
    { id: 5, name: "Full House", share: 45, amount: 0 },
  ]);

  const [ticketPrice, setTicketPrice] = useState<number>(50);

  // -------------------------
  // Computed totals
  // -------------------------
  const totalTickets = useMemo(
    () => players.reduce((sum, p) => sum + Number(p.tickets || 0), 0),
    [players]
  );

  const totalPot = totalTickets * ticketPrice;

  // prize amounts computed live
  const prizeAmounts = prizes.map((pr) => ({
    ...pr,
    amount: totalPot * (pr.share / 100),
  }));

  // -------------------------
  // Save game & go to caller
  // -------------------------
  function saveGame() {
    const validPlayers = players.filter(
      (p) => p.name.trim().length > 0 && p.tickets > 0
    );

    if (validPlayers.length === 0) {
      alert("Please add at least one player.");
      return;
    }

    // reset caller for this new game
    resetCaller();

    // build perPlayer placeholder
    const perPlayer: Record<string, any> = {};
    validPlayers.forEach((p) => {
      perPlayer[p.name] = {
        name: p.name,
        tickets: p.tickets,
        spent: p.tickets * ticketPrice,
        won: 0,
        net: -(p.tickets * ticketPrice),
      };
    });

    addGame({
      ticketPrice,
      totalPot,
      players: validPlayers,
      prizes: prizeAmounts,
      perPlayer,
      drawnNumbers: [],
      winners: {}, // <-- empty winners
      startedAt: new Date().toISOString(),
      endedAt: "",
    });

    goTo("caller");
  }

  // -------------------------
  // CRUD Player
  // -------------------------
  function updatePlayer(id: number, patch: Partial<Player>) {
    setPlayers((list) =>
      list.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }

  function addPlayer() {
    setPlayers((list) => [...list, { id: Date.now(), name: "", tickets: 1 }]);
  }

  function removePlayer(id: number) {
    setPlayers((list) => list.filter((p) => p.id !== id));
  }

  // -------------------------
  // CRUD Prize
  // -------------------------
  function updatePrize(id: number, patch: Partial<Prize>) {
    setPrizes((list) => {
      const updated = list.map((pr) =>
        pr.id === id ? { ...pr, ...patch } : pr
      );

      const totalShare = updated.reduce((s, p) => s + p.share, 0);

      if (totalShare > 100) {
        alert("Total share percentage cannot exceed 100%");
        return list; // revert to previous list
      }

      return updated;
    });
  }

  function addPrize() {
    setPrizes((list) => [
      ...list,
      { id: Date.now(), name: "", share: 0, amount: 0 },
    ]);
  }

  function removePrize(id: number) {
    setPrizes((list) => list.filter((pr) => pr.id !== id));
  }

  return (
    <Card>
      <h2 className="text-2xl font-semibold p-1 flex justify-center text-gray-800 mb-1">
        Game Setup
      </h2>

      {/* Ticket price  grid grid-cols-2 gap-2 mt-4*/}
      <div className=" flex flex-col md:flex-row justify-between">
        <div>
          <label className="text-xl pr-5 md:px-5 text-green-600">💲Ticket Price</label>
          <Input
            type="number"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            className="text-cyan-700 font-medium w-24 md:w-auto"
            // className={`${
            //   ticketPrice < 10 ? "text-red-500" : "text-green-500"
            // }`}
          />
        </div>

        <div className="text-lg flex justify-evenly mt-2 mr-5">
          <div className="text-lime-600 md:mx-2">🎟️{totalTickets} tickets</div>
          <div className="text-cyan-600 md:mx-2">
            🫂{players.filter((p) => p.name.trim()).length} players
          </div>
          <div className="text-yellow-600 md:mx-2">
            💰In the pot: {totalTickets * ticketPrice}
          </div>
        </div>
      </div>

      {/* Players */}
      <h3 className="my-3 pl-2 font-semibold text-gray-800 text-xl">Players</h3>
      <div className="max-h-70 overflow-auto rounded-2xl p-2 bg-orange-100 shadow-2xl custom-scroll">
        <table className="w-full text-sm border-separate border-spacing-2">
          <thead className="text-left text-sm text-gray-900">
            <tr>
              <th>Name</th>
              <th>Tickets</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <PlayersTable
              players={players}
              onUpdate={updatePlayer}
              onRemove={removePlayer}
            />
          </tbody>
        </table>

        <Button className="mt-2 text-cyan-900" onClick={addPlayer}>
          ＋ Add player
        </Button>
      </div>

      {/* Prizes */}
      <h3 className="mt-4 mb-2 pl-2 font-semibold text-gray-800 text-xl">
        Prizes
      </h3>
      <div className="max-h-70 overflow-auto rounded-2xl p-2 bg-orange-100 shadow-2xl">
        <table className="w-full text-sm border-separate border-spacing-2">
          <thead className="text-left text-sm text-gray-900">
            <tr>
              <th>Prize</th>
              <th>Share %</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <PrizesTable
              prizes={prizeAmounts}
              onUpdate={updatePrize}
              onRemove={removePrize}
            />
          </tbody>
        </table>
        <Button className="mt-2 bg-slate-700 text-gray-200" onClick={addPrize}>
          ＋ Add prize
        </Button>
      </div>

      {/* Prize preview */}
      {/* <h3 className="mt-4 mb-2 font-semibold">Prize Amounts Preview</h3>
      <div className="max-h-40 overflow-auto border border-slate-400 rounded-md p-2">
        <WinnerBoard prizes={prizeAmounts} />
      </div> */}

      <div className="flex justify-center">
        <Button
          className="mt-4 btn-shimmer text-black font-semibold rounded-2xl"
          onClick={saveGame}
        >
          Lets Go!!!! ➡️
        </Button>
      </div>
    </Card>
  );
}
