import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("emailValidationError").min(1, "emailEmptyError"),
  password: z.string().min(1, "passwordEmptyError"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
