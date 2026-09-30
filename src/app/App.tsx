import { Navigate, Route, Routes } from "react-router-dom";
import { useSessionStore } from "@/entities/session";
import { ChatPage } from "@/pages/chat";
import { LoginPage } from "@/pages/login";

export function App() {
  const isAuthorized = useSessionStore((state) => state.credentials !== null);

  if (!isAuthorized) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat/:chatId" element={<ChatPage />} />
      <Route path="*" element={<Navigate replace to="/chat" />} />
    </Routes>
  );
}
