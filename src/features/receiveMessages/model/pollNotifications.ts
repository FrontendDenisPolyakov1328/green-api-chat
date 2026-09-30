import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getApiErrorMessage, type Credentials } from "@/shared/api";
import { deleteNotification } from "../api/deleteNotification";
import { receiveNotification } from "../api/receiveNotification";
import { saveIncomingMessage } from "./saveIncomingMessage";

const RETRY_DELAY_MS = 5_000;

function isEmptyPoll(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 408;
}

function wait(signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, RETRY_DELAY_MS);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
}

export async function pollNotifications(
  credentials: Credentials,
  signal: AbortSignal,
): Promise<void> {
  let lastError = "";

  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(credentials, signal);
      if (signal.aborted) return;

      lastError = "";
      if (!notification) continue;

      saveIncomingMessage(credentials.idInstance, notification.body);
      await deleteNotification(credentials, notification.receiptId, signal);
    } catch (error) {
      if (signal.aborted || axios.isCancel(error)) return;
      if (isEmptyPoll(error)) continue;

      const message = getApiErrorMessage(error);
      if (message !== lastError) {
        enqueueSnackbar(message, { variant: "error" });
        lastError = message;
      }
      await wait(signal);
    }
  }
}
