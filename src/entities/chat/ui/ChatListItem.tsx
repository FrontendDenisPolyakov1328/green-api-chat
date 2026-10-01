import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Chat } from "../model/types";

type ChatListItemProps = {
  chat: Chat;
  selected: boolean;
  preview?: string;
  time?: string;
  onClick: () => void;
};

export function ChatListItem({
  chat,
  selected,
  preview,
  time,
  onClick,
}: ChatListItemProps) {
  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
            <Typography component="span" noWrap sx={{ fontWeight: 600 }}>
              +{chat.phone}
            </Typography>
            {time && (
              <Typography component="span" variant="caption" color="text.secondary">
                {time}
              </Typography>
            )}
          </Stack>
        }
        secondary={preview}
        slotProps={{
          primary: { component: "div" },
          secondary: { noWrap: true },
        }}
      />
    </ListItemButton>
  );
}
