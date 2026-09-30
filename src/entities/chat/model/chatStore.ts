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
  addMessage: (idInstance: string, chatId: string, message: Message) => void;
  updateMessage: (
    idInstance: string,
    chatId: string,
    messageId: string,
    patch: Partial<Message>,
  ) => void;
};

const MAX_MESSAGES_PER_CHAT = 200;

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

function updateChatMessages(
  state: ChatState,
  idInstance: string,
  chatId: string,
  update: (messages: Message[]) => Message[],
): Partial<ChatState> {
  const instance = state.byInstance[idInstance] ?? EMPTY_INSTANCE;
  const messages = update(instance.messages[chatId] ?? []);

  return {
    byInstance: {
      ...state.byInstance,
      [idInstance]: {
        ...instance,
        messages: { ...instance.messages, [chatId]: messages },
      },
    },
  };
}

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
      addMessage: (idInstance, chatId, message) =>
        set((state) =>
          updateChatMessages(state, idInstance, chatId, (messages) =>
            messages.some((item) => item.id === message.id)
              ? messages
              : [...messages, message].slice(-MAX_MESSAGES_PER_CHAT),
          ),
        ),
      updateMessage: (idInstance, chatId, messageId, patch) =>
        set((state) =>
          updateChatMessages(state, idInstance, chatId, (messages) =>
            messages.map((item) =>
              item.id === messageId ? { ...item, ...patch } : item,
            ),
          ),
        ),
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
const EMPTY_MESSAGES: Message[] = [];

export function useChats(idInstance: string): Chat[] {
  return useChatStore(
    (state) => state.byInstance[idInstance]?.chats ?? EMPTY_CHATS,
  );
}

export function useChat(idInstance: string, chatId: string): Chat | undefined {
  return useChatStore((state) =>
    state.byInstance[idInstance]?.chats.find((chat) => chat.chatId === chatId),
  );
}

export function useMessages(idInstance: string, chatId: string): Message[] {
  return useChatStore(
    (state) => state.byInstance[idInstance]?.messages[chatId] ?? EMPTY_MESSAGES,
  );
}
