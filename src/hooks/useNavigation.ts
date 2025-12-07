import { create } from "zustand";

export type Screen = "setup" | "caller" | "session";

interface NavState {
  screen: Screen;
  goTo: (s: Screen) => void;
}

export const useNavigation = create<NavState>((set) => ({
  screen: "setup",
  goTo: (s) => set({ screen: s }),
}));
