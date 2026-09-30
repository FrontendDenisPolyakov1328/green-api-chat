import { z } from "zod";
import { apiClient, buildPath, type Credentials } from "@/shared/api";

const checkAccountSchema = z.union([
  z.object({ exist: z.literal(true), chatId: z.string() }),
  z.object({ exist: z.literal(false) }),
  z.object({
    status: z.literal(false),
    reason: z.string().optional(),
    data: z.object({ reason: z.string() }).optional(),
  }),
]);

export async function checkAccount(
  credentials: Credentials,
  phone: string,
): Promise<string> {
  const { data } = await apiClient.post(buildPath(credentials, "checkAccount"), {
    phoneNumber: Number(phone),
  });
  const result = checkAccountSchema.parse(data);

  if ("status" in result) {
    throw new Error(
      result.reason ?? result.data?.reason ?? "Запрос отклонён сервером",
    );
  }

  if (!result.exist) {
    throw new Error(
      "У этого номера нет Telegram или он скрыт настройками приватности",
    );
  }

  return result.chatId;
}
