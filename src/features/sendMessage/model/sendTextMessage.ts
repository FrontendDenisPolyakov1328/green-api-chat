import { enqueueSnackbar } from "notistack";
import { useChatStore } from "@/entities/chat";
import { getApiErrorMessage, type Credentials } from "@/shared/api";
import { sendMessage } from "../api/sendMessage";

export async function sendTextMessage(
  credentials: Credentials,
  chatId: string,
  text: string,
): Promise<void> {
  const { addMessage, updateMessage } = useChatStore.getState();
  const { idInstance } = credentials;
  const localId = `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  addMessage(idInstance, chatId, {
    id: localId,
    text,
    timestamp: Date.now(),
    direction: "outgoing",
    status: "pending",
  });

  try {
    const idMessage = await sendMessage(credentials, chatId, text);
    updateMessage(idInstance, chatId, localId, {
      id: idMessage,
      status: "sent",
    });
  } catch (error) {
    updateMessage(idInstance, chatId, localId, { status: "error" });
    enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
  }
}
