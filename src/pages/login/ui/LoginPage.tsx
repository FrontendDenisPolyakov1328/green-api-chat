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
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 400, p: { xs: 3, sm: 4 } }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Вход
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Введите данные инстанса из личного кабинета GREEN-API
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
}
