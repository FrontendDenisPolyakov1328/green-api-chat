import Box from "@mui/material/Box";
import { ChatSidebar } from "@/widgets/chatSidebar";

export function ChatPage() {
  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box
        sx={{
          width: { xs: "100%", md: 360 },
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <ChatSidebar />
      </Box>
    </Box>
  );
}
