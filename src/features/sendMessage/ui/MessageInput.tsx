import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
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
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <Stack
      component="form"
      direction="row"
      onSubmit={handleSubmit}
      sx={{ alignItems: "flex-end", gap: 1, p: 1.5, bgcolor: "background.paper" }}
    >
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Сообщение"
        multiline
        maxRows={5}
        fullWidth
        size="small"
        slotProps={{ htmlInput: { maxLength: MAX_MESSAGE_LENGTH } }}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!trimmed}
        aria-label="Отправить"
      >
        <SendIcon />
      </IconButton>
    </Stack>
  );
}
