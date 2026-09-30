import axios from "axios";
import { env } from "@/shared/config";
import type { Credentials } from "./types";

const DEFAULT_TIMEOUT_MS = 15_000;

export const apiClient = axios.create({
  baseURL: env.greenApiUrl,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

export function buildPath(
  { idInstance, apiTokenInstance }: Credentials,
  method: string,
): string {
  return `/waInstance${encodeURIComponent(idInstance)}/${method}/${encodeURIComponent(apiTokenInstance)}`;
}
