import { apiClient, buildPath, type Credentials } from "@/shared/api";

export async function deleteNotification(
  credentials: Credentials,
  receiptId: number,
  signal: AbortSignal,
): Promise<void> {
  await apiClient.delete(
    `${buildPath(credentials, "deleteNotification")}/${receiptId}`,
    { signal },
  );
}
