import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { useCredentials } from "@/entities/session";
import { sendTextMessage } from "../model/sendTextMessage";

const MAX_MESSAGE_LENGTH = 4096;

type MessageInputProps = {
  chatId: string;
};

export function MessageInput({ chatId }: MessageInputProps) {
  const credentials = useCredentials();
  const [text, setText] = useState("");
  const trimmed = text.trim();

  const submit = () => {
    if (!trimmed) return;
    setText("");
    void sendTextMessage(credentials, chatId, trimmed);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ px: 2, pb: 2 }}>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Сообщение"
        multiline
        maxRows={5}
        fullWidth
        size="small"
        slotProps={{
          htmlInput: { maxLength: MAX_MESSAGE_LENGTH },
          input: {
            endAdornment: (
              <IconButton
                type="submit"
                size="small"
                disabled={!trimmed}
                aria-label="Отправить"
                sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            ),
            sx: {
              alignItems: "center",
              py: 1,
              pr: 1,
              borderRadius: 1.5,
              bgcolor: "background.paper",
            },
          },
        }}
      />
    </Box>
  );
}
