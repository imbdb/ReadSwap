/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface user {
  token: string;
  email: string;
  id: string;
  name: string;
  emailVerified: boolean;
}

interface authState {
  authenticated: boolean;
  user: user | null;
  login: () => void;
  logout: () => void;
  setUser: (user: any) => void;
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      authenticated: false,
      user: null,
      login: () => set({ authenticated: true }),
      logout: () => set({ authenticated: false }),
      setUser: (user: any) => set({ user }),
    }),
    {
      name: "auth-store", // name of the item in the storage (must be unique)
    }
  )
);
