// ----------------------
// Basic Player & Prize
// ----------------------
export interface Player {
  id: number;
  name: string;
  tickets: number;
}

export interface Prize {
  id: number;
  name: string;
  share: number;    // percentage of total pot
  amount?: number;  // computed dynamically in GameSetup
}

// ----------------------
// Setup Data (before calling)
// ----------------------
export interface SetupConfig {
  players: Player[];
  prizes: Prize[];
  ticketPrice: number;
  totalTickets: number;
  totalPot: number;
}

// ----------------------
// Per-player financial summary
// ----------------------
export interface PlayerResult {
  name: string;
  tickets: number;
  spent: number;
  won: number;
  net: number;
}

// ----------------------
// Game Result AFTER caller ends
// ----------------------
export interface GameResult {
  id: number;

  ticketPrice: number;
  totalPot: number;

  players: Player[];
  prizes: Prize[];

  // Prize winners selected later in Session screen
  winners?: Record<number, string>;

  // Computed only after selecting winners
  perPlayer?: Record<string, PlayerResult>;

  drawnNumbers: number[];

  startedAt: string;
  endedAt: string;
}
