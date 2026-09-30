import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Message, MessageStatus } from "../model/types";

const STATUS_ICONS: Record<MessageStatus, typeof DoneIcon> = {
  pending: ScheduleIcon,
  sent: DoneIcon,
  error: ErrorOutlineIcon,
};

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.direction === "outgoing";
  const StatusIcon = STATUS_ICONS[message.status];

  return (
    <Box
      sx={{
        alignSelf: isOutgoing ? "flex-end" : "flex-start",
        maxWidth: { xs: "85%", sm: "70%" },
        px: 1.5,
        py: 1,
        borderRadius: 2,
        bgcolor: isOutgoing ? "primary.main" : "background.paper",
        color: isOutgoing ? "primary.contrastText" : "text.primary",
        boxShadow: isOutgoing ? "none" : 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
      >
        {message.text}
      </Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 0.5,
          mt: 0.25,
          opacity: 0.7,
        }}
      >
        <Typography variant="caption">{formatTime(message.timestamp)}</Typography>
        {isOutgoing && (
          <StatusIcon
            sx={{
              fontSize: 14,
              color: message.status === "error" ? "error.light" : "inherit",
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
