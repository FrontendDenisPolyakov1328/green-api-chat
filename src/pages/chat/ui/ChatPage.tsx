import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useNotificationsPolling } from "@/features/receiveMessages";
import { ChatSidebar } from "@/widgets/chatSidebar";
import { ChatWindow } from "@/widgets/chatWindow";

export function ChatPage() {
  useNotificationsPolling();
  const { chatId } = useParams();
  const isChatOpen = Boolean(chatId);

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
        {chatId ? (
          <ChatWindow key={chatId} chatId={chatId} />
        ) : (
          <Typography color="text.secondary" sx={{ m: "auto" }}>
            Выберите чат или создайте новый
          </Typography>
        )}
      </Box>
    </Box>
  );
}
