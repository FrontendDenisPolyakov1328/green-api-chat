import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useSessionStore } from "@/entities/session";
import { getApiErrorMessage } from "@/shared/api";
import {
  credentialsSchema,
  type CredentialsFormValues,
} from "../model/credentialsSchema";
import { verifyCredentials } from "../model/verifyCredentials";

export function LoginForm() {
  const login = useSessionStore((state) => state.login);

  const {
    register,
    handleSubmit,
    setError,
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
      setError("root", { message: getApiErrorMessage(error) });
    }
  };

  return (
    <Stack
      component="form"
      spacing={2}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

      <TextField
        label="idInstance"
        autoComplete="username"
        inputMode="numeric"
        error={Boolean(errors.idInstance)}
        helperText={errors.idInstance?.message}
        {...register("idInstance")}
      />

      <TextField
        label="apiTokenInstance"
        type="password"
        autoComplete="current-password"
        error={Boolean(errors.apiTokenInstance)}
        helperText={errors.apiTokenInstance?.message}
        {...register("apiTokenInstance")}
      />

      <Button type="submit" variant="contained" size="large" loading={isSubmitting}>
        Войти
      </Button>
    </Stack>
  );
}
