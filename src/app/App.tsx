import { Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "@/pages/chat";
import { LoginPage } from "@/pages/login";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}
