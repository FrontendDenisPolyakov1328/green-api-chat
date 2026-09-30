import { z } from "zod";
import { useChatStore } from "@/entities/chat";

const textSchema = z.union([
  z
    .object({
      typeMessage: z.literal("textMessage"),
      textMessageData: z.object({ textMessage: z.string() }),
    })
    .transform((data) => data.textMessageData.textMessage),
  z
    .object({
      typeMessage: z.literal("extendedTextMessage"),
      extendedTextMessageData: z.object({ text: z.string() }),
    })
    .transform((data) => data.extendedTextMessageData.text),
]);

const incomingMessageSchema = z.object({
  typeWebhook: z.literal("incomingMessageReceived"),
  idMessage: z.string(),
  senderData: z.object({ chatId: z.string() }),
  messageData: textSchema,
});

export function saveIncomingMessage(idInstance: string, body: unknown) {
  const parsed = incomingMessageSchema.safeParse(body);
  if (!parsed.success) return;

  const { senderData, idMessage, messageData } = parsed.data;
  const chats = useChatStore.getState().byInstance[idInstance]?.chats ?? [];
  if (!chats.some((chat) => chat.chatId === senderData.chatId)) return;

  useChatStore.getState().addMessage(idInstance, senderData.chatId, {
    id: idMessage,
    text: messageData,
    timestamp: Date.now(),
    direction: "incoming",
    status: "sent",
  });
}
