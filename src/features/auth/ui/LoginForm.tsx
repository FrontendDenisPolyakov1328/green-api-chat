import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSessionStore } from "@/entities/session";
import { getApiErrorMessage } from "@/shared/api";
import {
  credentialsSchema,
  type CredentialsFormValues,
} from "../model/credentialsSchema";
import { verifyCredentials } from "../model/verifyCredentials";

function PasswordToggle({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
        onClick={onToggle}
        edge="end"
      >
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}

export function LoginForm() {
  const login = useSessionStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: { idInstance: "", apiTokenInstance: "" },
  });

  const onSubmit = async (values: CredentialsFormValues) => {
    try {
      await verifyCredentials(values);
      login(values);
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="idInstance"
        autoComplete="username"
        error={Boolean(errors.idInstance)}
        helperText={errors.idInstance?.message ?? " "}
        slotProps={{ htmlInput: { inputMode: "numeric" } }}
        {...register("idInstance")}
      />

      <TextField
        label="apiTokenInstance"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        error={Boolean(errors.apiTokenInstance)}
        helperText={errors.apiTokenInstance?.message ?? " "}
        {...register("apiTokenInstance")}
        slotProps={{
          input: {
            endAdornment: (
              <PasswordToggle
                visible={showPassword}
                onToggle={() => setShowPassword((visible) => !visible)}
              />
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
      >
        Войти
      </Button>
    </Stack>
  );
}
