import type { Prize } from "../../types";

interface WinnerBoardProps {
  prizes: Prize[];
}

export default function WinnerBoard({ prizes }: WinnerBoardProps) {
  return (
    <table className="w-full text-sm border-separate border-spacing-2">
      <thead>
        <tr className="text-left text-lg text-gray-300">
          <th>Prize</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {prizes.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{(p.amount ?? 0).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
