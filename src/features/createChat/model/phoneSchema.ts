import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\d{10,15}$/, "Номер в международном формате: от 10 до 15 цифр"),
    ),
});

export type PhoneFormValues = z.input<typeof phoneSchema>;
export type PhoneFormResult = z.output<typeof phoneSchema>;
