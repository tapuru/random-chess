"use client";

import { AppForm } from "@/shared/ui/app-form/app-form";
import { Controller, useForm, Control } from "react-hook-form";
import {
  RegistrationFormData,
  registrationSchema,
} from "../../lib/schemas/registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useTranslations } from "next-intl";

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
  });

  const t = useTranslations("Auth");

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
  };

  return (
    <AppForm onSubmit={handleSubmit(onSubmit)}>
      <AppForm.RHFField
        name="email"
        label={t("email")}
        required
        isError={!!errors.email}
        errorMessages={!!errors.email ? [t(errors.email.message)] : []}
        control={control}
        render={({ field }) => <AppInput {...field} type="email" required />}
      />
      <AppForm.RHFField
        name="username"
        label={t("username")}
        required
        control={control}
        render={({ field }) => <AppInput {...field} required />}
        isError={!!errors.username}
        errorMessages={!!errors.username ? [t(errors.username?.message)] : []}
      />
      <AppForm.RHFField
        name="password"
        label={t("password")}
        control={control}
        required
        render={({ field }) => <AppInput {...field} required />}
        isError={!!errors.password}
        errorMessages={!!errors.password ? [t(errors.password?.message)] : []}
      />
      <AppForm.RHFField
        required
        name="passwordConfirm"
        label={t("confirmPassword")}
        control={control}
        render={({ field }) => <AppInput {...field} required />}
        isError={!!errors.passwordConfirm}
        errorMessages={
          !!errors.passwordConfirm ? [t(errors.passwordConfirm?.message)] : []
        }
      />
      <div>
        <AppButton>{t("registerSubmit")}</AppButton>
      </div>
    </AppForm>
  );
};
