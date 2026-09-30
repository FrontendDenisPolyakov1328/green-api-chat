import { z } from "zod";
import { apiClient, buildPath, type Credentials } from "@/shared/api";

const sendMessageSchema = z.object({
  idMessage: z.string(),
});

export async function sendMessage(
  credentials: Credentials,
  chatId: string,
  message: string,
): Promise<string> {
  const { data } = await apiClient.post(buildPath(credentials, "sendMessage"), {
    chatId,
    message,
  });
  return sendMessageSchema.parse(data).idMessage;
}
