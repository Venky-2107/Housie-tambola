import Input from "../ui/Input";
import type { Player } from "../../types";

interface PlayerRowProps {
  player: Player;
  onUpdate: (id: number, patch: Partial<Player>) => void;
  onRemove: (id: number) => void;
}

export default function PlayerRow({
  player,
  onUpdate,
  onRemove,
}: PlayerRowProps) {
  return (
    <tr className="my-2">
      <td>
        <Input
          value={player.name}
          placeholder="Player name..."
          onChange={(e) => onUpdate(player.id, { name: e.target.value })}
          className="w-full"
        />
      </td>

      <td>
        <Input
          type="number"
          min={1}
          value={player.tickets}
          onChange={(e) =>
            onUpdate(player.id, { tickets: Number(e.target.value) })
          }
          className="w-20"
        />
      </td>

      <td>
        <button
          onClick={() => onRemove(player.id)}
          className="bg-red-500 text-gray-100 px-2 py-1 rounded-2xl"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}
