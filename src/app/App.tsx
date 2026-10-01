import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSessionStore } from "@/entities/session";

const LoginPage = lazy(() =>
  import("@/pages/login").then((module) => ({ default: module.LoginPage })),
);
const ChatPage = lazy(() =>
  import("@/pages/chat").then((module) => ({ default: module.ChatPage })),
);

function PageFallback() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export function App() {
  const isAuthorized = useSessionStore((state) => state.credentials !== null);

  return (
    <Suspense fallback={<PageFallback />}>
      {isAuthorized ? (
        <Routes>
          <Route path="/chat/:chatId?" element={<ChatPage />} />
          <Route path="*" element={<Navigate replace to="/chat" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </Suspense>
  );
}
