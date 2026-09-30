import axios from "axios";
import { z } from "zod";

const errorBodySchema = z.object({
  message: z.string().optional(),
  reason: z.string().optional(),
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Нет соединения с сервером";

    const { status, data, headers } = error.response;
    const isHtml = String(headers["content-type"] ?? "").includes("text/html");
    if (typeof data === "string" && data.trim() && !isHtml) return data;

    const body = errorBodySchema.safeParse(data);
    return (
      body.data?.message || body.data?.reason || `Ошибка сервера (${status})`
    );
  }

  return error instanceof Error ? error.message : "Неизвестная ошибка";
}
