// PrizeRow.tsx

import Input from "../ui/Input";
import type { Prize } from "../../types";

interface PrizeRowProps {
  prize: Prize;
  onUpdate: (id: number, patch: Partial<Prize>) => void;
  onRemove: (id: number) => void;
}

export default function PrizeRow({ prize, onUpdate, onRemove }: PrizeRowProps) {
  return (
    <tr>
      <td>
        <Input
          value={prize.name}
          placeholder="e.g. Full House..."
          onChange={(e) => onUpdate(prize.id, { name: e.target.value })}
          className="w-full"
        />
      </td>

      <td>
        <Input
          type="number"
          min={0}
          max={100}
          value={prize.share}
          onChange={(e) =>
            onUpdate(prize.id, { share: Number(e.target.value) })
          }
          className="w-16"
        />
      </td>

      <td className="font-semibold text-gray-800">
        {(prize.amount ?? 0).toFixed(2)}
      </td>

      <td>
        <button
          onClick={() => onRemove(prize.id)}
          className="bg-red-500 text-gray-100 px-2 py-1 rounded-2xl"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}
