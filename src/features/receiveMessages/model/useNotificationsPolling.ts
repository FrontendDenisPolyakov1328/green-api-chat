import { useEffect } from "react";
import { useCredentials } from "@/entities/session";
import { pollNotifications } from "./pollNotifications";

export function useNotificationsPolling() {
  const credentials = useCredentials();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void pollNotifications(credentials, controller.signal);
    }, 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [credentials]);
}
