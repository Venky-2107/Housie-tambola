// PrizesTable.tsx

import PrizeRow from "./PrizeRow";
import type { Prize } from "../../types";

interface PrizesTableProps {
  prizes: Prize[];
  onUpdate: (id: number, patch: Partial<Prize>) => void;
  onRemove: (id: number) => void;
}

export default function PrizesTable({
  prizes,
  onUpdate,
  onRemove,
}: PrizesTableProps) {
  return (
    <>
      {prizes.map((pr) => (
        <PrizeRow
          key={pr.id}
          prize={pr}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </>
  );
}
