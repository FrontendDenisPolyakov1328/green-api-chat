import { useEffect } from "react";
import { useCredentials } from "@/entities/session";
import { pollNotifications } from "./pollNotifications";

export function useNotificationsPolling() {
  const credentials = useCredentials();

  useEffect(() => {
    const controller = new AbortController();
    void pollNotifications(credentials, controller.signal);
    return () => controller.abort();
  }, [credentials]);
}
