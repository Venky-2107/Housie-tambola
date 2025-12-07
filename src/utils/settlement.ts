export interface SettlementEntry {
  from: string;
  to: string;
  amount: number;
}

/**
 * Computes a minimal transaction list so that:
 * - Debtors (negative net) pay creditors (positive net)
 * - Total amounts remain balanced
 * - Transactions are minimized & matched greedily
 */
export function computeSettlement(
  net: Record<string, number>
): SettlementEntry[] {
  const creditors: { name: string; amount: number }[] = [];
  const debtors: { name: string; amount: number }[] = [];

  // Split into creditors and debtors
  Object.entries(net).forEach(([name, value]) => {
    const rounded = round(value);
    if (rounded > 0.01) creditors.push({ name, amount: rounded });
    else if (rounded < -0.01) debtors.push({ name, amount: -rounded });
  });

  // Sort descending (largest first) for optimal greedy matching
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const result: SettlementEntry[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    // Choose the minimal transfer to zero-out one party
    const payment = Math.min(debtor.amount, creditor.amount);

    if (payment > 0.01) {
      result.push({
        from: debtor.name,
        to: creditor.name,
        amount: round(payment),
      });
    }

    // Update remaining amounts
    debtor.amount = round(debtor.amount - payment);
    creditor.amount = round(creditor.amount - payment);

    // Move pointer if a side is settled
    if (debtor.amount <= 0.01) i++;
    if (creditor.amount <= 0.01) j++;
  }

  return result;
}

/** Utility: Round to 2 decimals safely */
function round(n: number): number {
  return Math.round(n * 100) / 100;
}
