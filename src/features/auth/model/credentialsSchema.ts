import { z } from "zod";

export const credentialsSchema = z.object({
  idInstance: z
    .string()
    .trim()
    .min(1, "Введите idInstance")
    .regex(/^\d+$/, "idInstance состоит только из цифр"),
  apiTokenInstance: z.string().trim().min(1, "Введите apiTokenInstance"),
});

export type CredentialsFormValues = z.infer<typeof credentialsSchema>;
