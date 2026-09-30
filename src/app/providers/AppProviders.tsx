import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "@/shared/theme/theme";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
