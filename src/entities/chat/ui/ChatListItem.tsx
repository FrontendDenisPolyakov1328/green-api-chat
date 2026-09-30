import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { Chat } from "../model/types";

type ChatListItemProps = {
  chat: Chat;
  selected: boolean;
  onClick: () => void;
};

export function ChatListItem({ chat, selected, onClick }: ChatListItemProps) {
  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`+${chat.phone}`} />
    </ListItemButton>
  );
}
