import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { formatTime } from "../lib/formatTime";
import type { Message, MessageStatus } from "../model/types";

const STATUS_ICONS: Record<MessageStatus, typeof DoneIcon> = {
  pending: ScheduleIcon,
  sent: DoneIcon,
  error: ErrorOutlineIcon,
};

type MessageBubbleProps = {
  message: Message;
  separated?: boolean;
};

export function MessageBubble({
  message,
  separated = false,
}: MessageBubbleProps) {
  const isOutgoing = message.direction === "outgoing";
  const StatusIcon = STATUS_ICONS[message.status];

  return (
    <Box
      sx={{
        alignSelf: isOutgoing ? "flex-end" : "flex-start",
        ...(separated && { mt: 1 }),
        display: "flow-root",
        maxWidth: { xs: 350, md: 480 },
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        bgcolor: isOutgoing ? "primary.main" : "background.paper",
        ...(isOutgoing && { color: "primary.contrastText" }),
      }}
    >
      <Typography
        component="span"
        variant="body2"
        sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
      >
        {message.text}
      </Typography>
      <Stack
        direction="row"
        sx={{
          float: "right",
          alignItems: "center",
          gap: 0.25,
          ml: 1,
          opacity: 0.7,
          transform: "translateY(8px)",
        }}
      >
        <Typography variant="caption">
          {formatTime(message.timestamp)}
        </Typography>
        {isOutgoing && (
          <StatusIcon
            sx={{
              fontSize: 14,
              ...(message.status === "error" && { color: "error.light" }),
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
