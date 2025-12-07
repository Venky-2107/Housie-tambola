import { create } from "zustand";

const MIN = 1;
const MAX = 90;

interface CallerState {
  remainingNumbers: number[];
  drawnNumbers: number[];
  isAuto: boolean;
  autoId: number | null;

  drawNextNumber: () => void;
  startAuto: (seconds: number) => void;
  stopAuto: () => void;
  reset: () => void;
}

export const useCallerStore = create<CallerState>((set, get) => ({
  remainingNumbers: Array.from({ length: MAX }, (_, i) => i + MIN),
  drawnNumbers: [],
  isAuto: false,
  autoId: null,

  drawNextNumber: () => {
    const { remainingNumbers, drawnNumbers } = get();

    if (remainingNumbers.length === 0) return;

    const idx = Math.floor(Math.random() * remainingNumbers.length);
    const num = remainingNumbers[idx];

    const newRemaining = [...remainingNumbers];
    newRemaining.splice(idx, 1);

    set({
      remainingNumbers: newRemaining,
      drawnNumbers: [...drawnNumbers, num],
    });
  },

  startAuto: (seconds) => {
    const { isAuto, drawNextNumber, stopAuto } = get();
    if (isAuto) return;

    const id = window.setInterval(() => {
      const { remainingNumbers } = get();
      if (remainingNumbers.length === 0) {
        stopAuto();
        return;
      }
      drawNextNumber();
    }, seconds * 1000);

    set({ isAuto: true, autoId: id });
  },

  stopAuto: () => {
    const { autoId } = get();
    if (autoId !== null) {
      clearInterval(autoId);
    }
    set({ isAuto: false, autoId: null });
  },

  reset: () => {
    const { autoId } = get();

    // Clear previous auto interval — FIXED
    if (autoId !== null) {
      clearInterval(autoId);
    }

    set({
      remainingNumbers: Array.from({ length: MAX }, (_, i) => i + MIN),
      drawnNumbers: [],
      isAuto: false,
      autoId: null,
    });
  },
}));
