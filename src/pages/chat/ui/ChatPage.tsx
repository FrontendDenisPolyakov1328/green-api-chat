import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChat, useChatStoreHydrated } from "@/entities/chat";
import { useCredentials } from "@/entities/session";
import { useNotificationsPolling } from "@/features/receiveMessages";
import { ChatSidebar } from "@/widgets/chatSidebar";
import { ChatWindow } from "@/widgets/chatWindow";

export function ChatPage() {
  useNotificationsPolling();
  const { chatId } = useParams();
  const { idInstance } = useCredentials();
  const hydrated = useChatStoreHydrated();
  const chat = useChat(idInstance, chatId ?? "");
  const navigate = useNavigate();
  const isChatOpen = Boolean(chatId);

  useEffect(() => {
    if (hydrated && chatId && !chat) navigate("/chat", { replace: true });
  }, [hydrated, chatId, chat, navigate]);

  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box
        sx={{
          width: { xs: "100%", md: 360 },
          flexShrink: 0,
          display: { xs: isChatOpen ? "none" : "block", md: "block" },
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <ChatSidebar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: { xs: isChatOpen ? "flex" : "none", md: "flex" },
        }}
      >
        {chat ? (
          <ChatWindow key={chat.chatId} chatId={chat.chatId} />
        ) : (
          !chatId && (
            <Typography color="text.secondary" sx={{ m: "auto" }}>
              Выберите чат или создайте новый
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}
