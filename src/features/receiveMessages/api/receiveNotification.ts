import { z } from "zod";
import { apiClient, buildPath, type Credentials } from "@/shared/api";

const notificationSchema = z.object({
  receiptId: z.number(),
  body: z.unknown(),
});

export type Notification = z.infer<typeof notificationSchema>;

export async function receiveNotification(
  credentials: Credentials,
  signal: AbortSignal,
): Promise<Notification | null> {
  const { data } = await apiClient.get(
    buildPath(credentials, "receiveNotification"),
    { signal },
  );

  if (data == null || data === "") return null;
  return notificationSchema.parse(data);
}
