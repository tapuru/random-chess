import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .min(1, "Email is required")
      .max(50, "Email is too long"),
    username: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username is too long"),
    password: z
      .string()
      .min(1, "Password is required")
      .max(50, "Password is too long"),
    passwordConfirm: z.string().min(1, "Confirm your password"),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
