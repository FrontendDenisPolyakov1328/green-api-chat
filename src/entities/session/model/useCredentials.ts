import type { Credentials } from "@/shared/api";
import { useSessionStore } from "./sessionStore";

export function useCredentials(): Credentials {
  const credentials = useSessionStore((state) => state.credentials);

  if (!credentials) {
    throw new Error("useCredentials is available only after login");
  }

  return credentials;
}
