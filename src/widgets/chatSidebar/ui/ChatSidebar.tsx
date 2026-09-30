import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { ChatListItem, useChats } from "@/entities/chat";
import { useCredentials, useSessionStore } from "@/entities/session";
import { CreateChatButton } from "@/features/createChat";

export function ChatSidebar() {
  const { idInstance } = useCredentials();
  const chats = useChats(idInstance);
  const logout = useSessionStore((state) => state.logout);
  const { chatId } = useParams();
  const navigate = useNavigate();

  const openChat = (id: string) => navigate(`/chat/${id}`);

  return (
    <Stack sx={{ height: "100%", bgcolor: "background.paper" }}>
      <Stack
        direction="row"
        sx={{ alignItems: "center", px: 2, py: 1.5, gap: 1 }}
      >
        <Typography component="h1" variant="h6" sx={{ flexGrow: 1 }}>
          Чаты
        </Typography>
        <CreateChatButton onCreated={openChat} />
        <Tooltip title="Выйти">
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />

      {chats.length === 0 ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Чатов пока нет. Нажмите на карандаш, чтобы начать новый
          </Typography>
        </Box>
      ) : (
        <List sx={{ flexGrow: 1, overflowY: "auto", py: 0 }}>
          {chats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}
              selected={chat.chatId === chatId}
              onClick={() => openChat(chat.chatId)}
            />
          ))}
        </List>
      )}
    </Stack>
  );
}
