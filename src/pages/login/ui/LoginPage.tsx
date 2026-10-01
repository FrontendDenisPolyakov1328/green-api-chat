import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LoginForm } from "@/features/auth";

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "center",
        p: { xs: 0, sm: 2 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: { sm: 400 },
          minHeight: { xs: "100%", sm: "auto" },
          p: { xs: 3, sm: 4 },
          pt: { xs: "12vh", sm: 4 },
          borderRadius: { xs: 0, sm: 1 },
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Вход
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Введите данные Telegram-инстанса из личного кабинета GREEN-API
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
}
