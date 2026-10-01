import { zodResolver } from "@hookform/resolvers/zod";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useChatStore } from "@/entities/chat";
import { useCredentials } from "@/entities/session";
import { getApiErrorMessage } from "@/shared/api";
import { checkAccount } from "../api/checkAccount";
import {
  phoneSchema,
  type PhoneFormResult,
  type PhoneFormValues,
} from "../model/phoneSchema";

type CreateChatButtonProps = {
  onCreated: (chatId: string) => void;
};

export function CreateChatButton({ onCreated }: CreateChatButtonProps) {
  const [open, setOpen] = useState(false);
  const credentials = useCredentials();
  const addChat = useChatStore((state) => state.addChat);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PhoneFormValues, unknown, PhoneFormResult>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async ({ phone }: PhoneFormResult) => {
    const { byInstance } = useChatStore.getState();
    const existing = byInstance[credentials.idInstance]?.chats.find(
      (chat) => chat.phone === phone,
    );

    try {
      const chatId =
        existing?.chatId ?? (await checkAccount(credentials, phone));
      addChat(credentials.idInstance, { chatId, phone });
      handleClose();
      onCreated(chatId);
    } catch (error) {
      setError("root", { message: getApiErrorMessage(error) });
    }
  };

  return (
    <>
      <Tooltip title="Новый чат">
        <IconButton
          color="primary"
          onClick={(event) => {
            event.currentTarget.blur();
            setOpen(true);
          }}
        >
          <EditSquareIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Новый чат</DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {errors.root && (
                <Alert severity="error">{errors.root.message}</Alert>
              )}
              <TextField
                label="Номер телефона"
                placeholder="79991234567"
                type="tel"
                autoFocus
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message ?? " "}
                {...register("phone")}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              Создать
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
