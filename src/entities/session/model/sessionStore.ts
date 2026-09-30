import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Credentials } from "@/shared/api";

type SessionState = {
  credentials: Credentials | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
};

const persistedSessionSchema = z.object({
  credentials: z
    .object({
      idInstance: z.string(),
      apiTokenInstance: z.string(),
    })
    .nullable(),
});

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      credentials: null,
      login: (credentials) => set({ credentials }),
      logout: () => set({ credentials: null }),
    }),
    {
      name: "green-chat:session",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ credentials: state.credentials }),
      merge: (persisted, current) => {
        const result = persistedSessionSchema.safeParse(persisted);
        return result.success ? { ...current, ...result.data } : current;
      },
    },
  ),
);
