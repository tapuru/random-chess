import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("emailValidationError").min(1, "emailEmptyError"),
    username: z
      .string()
      .min(1, "usernameEmptyError")
      .min(3, "usernameTooShortError")
      .max(50, "usernameTooLongError"),
    password: z
      .string()
      .min(1, "passwordEmptyError")
      .min(6, "passwordTooShortError")
      .max(50, "passwordTooLongError"),
    passwordConfirm: z.string().min(1, "passwordConfirmationEmptyError"),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "passwordsNotMatchError",
    path: ["passwordConfirm"],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
