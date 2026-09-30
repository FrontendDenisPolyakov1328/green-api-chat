import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Chat, Message } from "./types";

type InstanceChats = {
  chats: Chat[];
  messages: Record<string, Message[]>;
};

type ChatState = {
  byInstance: Record<string, InstanceChats>;
  addChat: (idInstance: string, chat: Chat) => void;
};

const EMPTY_INSTANCE: InstanceChats = { chats: [], messages: {} };

const messageSchema = z.object({
  id: z.string(),
  text: z.string(),
  timestamp: z.number(),
  direction: z.enum(["incoming", "outgoing"]),
  status: z.enum(["pending", "sent", "error"]),
});

const persistedChatsSchema = z.object({
  byInstance: z.record(
    z.string(),
    z.object({
      chats: z.array(z.object({ chatId: z.string(), phone: z.string() })),
      messages: z.record(z.string(), z.array(messageSchema)),
    }),
  ),
});

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      byInstance: {},
      addChat: (idInstance, chat) =>
        set((state) => {
          const instance = state.byInstance[idInstance] ?? EMPTY_INSTANCE;
          if (instance.chats.some((item) => item.chatId === chat.chatId)) {
            return state;
          }

          return {
            byInstance: {
              ...state.byInstance,
              [idInstance]: { ...instance, chats: [chat, ...instance.chats] },
            },
          };
        }),
    }),
    {
      name: "green-chat:chats",
      version: 1,
      partialize: (state) => ({ byInstance: state.byInstance }),
      merge: (persisted, current) => {
        const result = persistedChatsSchema.safeParse(persisted);
        return result.success ? { ...current, ...result.data } : current;
      },
    },
  ),
);

const EMPTY_CHATS: Chat[] = [];

export function useChats(idInstance: string): Chat[] {
  return useChatStore(
    (state) => state.byInstance[idInstance]?.chats ?? EMPTY_CHATS,
  );
}
