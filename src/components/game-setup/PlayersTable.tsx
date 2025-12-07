import PlayerRow from "./PlayerRow";
import type { Player } from "../../types";

interface PlayersTableProps {
  players: Player[];
  onUpdate: (id: number, patch: Partial<Player>) => void;
  onRemove: (id: number) => void;
}

export default function PlayersTable({
  players,
  onUpdate,
  onRemove,
}: PlayersTableProps) {
  return (
    <>
      {players.map((p) => (
        <PlayerRow
          key={p.id}
          player={p}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </>
  );
}
