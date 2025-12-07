import { create } from "zustand";
import type { GameResult } from "../types";

interface SessionState {
  games: GameResult[];

  addGame: (g: Omit<GameResult, "id">) => void;
  updateGame: (id: number, patch: Partial<GameResult>) => void;

  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  games: [],

  // Called from GameSetup → creates a new game with no winners yet
  addGame: (gameWithoutId) =>
    set((state) => ({
      games: [
        ...state.games,
        {
          id: state.games.length + 1,
          ...gameWithoutId,
        },
      ],
    })),

  // Used everywhere to update a single field — winners, perPlayer, drawnNumbers, endedAt etc.
  updateGame: (id, patch) =>
    set((state) => ({
      games: state.games.map((g) =>
        g.id === id ? { ...g, ...patch } : g
      ),
    })),

  clearSession: () => set({ games: [] }),
}));
