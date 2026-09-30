import axios from "axios";
import { getStateInstance } from "@/entities/session";
import { getApiErrorMessage, type Credentials } from "@/shared/api";

const INVALID_CREDENTIALS_STATUSES = [401, 403, 404];

function getRequestErrorMessage(error: unknown): string {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;

  return status && INVALID_CREDENTIALS_STATUSES.includes(status)
    ? `Неверный idInstance или apiTokenInstance (${status})`
    : getApiErrorMessage(error);
}

export async function verifyCredentials(credentials: Credentials): Promise<void> {
  const state = await getStateInstance(credentials).catch((error: unknown) => {
    throw new Error(getRequestErrorMessage(error));
  });

  if (state !== "authorized") {
    throw new Error(
      `Инстанс не авторизован (состояние: ${state}). Авторизуйте его в личном кабинете GREEN-API`,
    );
  }
}
