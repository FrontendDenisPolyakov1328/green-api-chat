import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageBubble, useChat, useMessages } from "@/entities/chat";
import { useCredentials } from "@/entities/session";
import { MessageInput } from "@/features/sendMessage";

type ChatWindowProps = {
  chatId: string;
};

export function ChatWindow({ chatId }: ChatWindowProps) {
  const { idInstance } = useCredentials();
  const chat = useChat(idInstance, chatId);
  const messages = useMessages(idInstance, chatId);
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  if (!chat) {
    return (
      <Box sx={{ m: "auto", p: 3 }}>
        <Typography color="text.secondary">Чат не найден</Typography>
      </Box>
    );
  }

  return (
    <Stack sx={{ height: "100%", width: "100%" }}>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1,
          bgcolor: "background.paper",
        }}
      >
        <IconButton
          edge="start"
          aria-label="Назад к чатам"
          onClick={() => navigate("/chat")}
          sx={{ display: { md: "none" } }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          +{chat.phone}
        </Typography>
      </Stack>
      <Divider />

      <Stack
        sx={{ flexGrow: 1, overflowY: "auto", gap: 1, p: 2 }}
      >
        {messages.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ m: "auto" }}
          >
            Сообщений пока нет. Напишите первым
          </Typography>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </Stack>

      <Divider />
      <MessageInput chatId={chatId} />
    </Stack>
  );
}
