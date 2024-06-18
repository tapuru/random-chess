"use client";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../lib/schemas/login-schema";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    reset;
  };

  const t = useTranslations("Auth");
  return (
    <AppForm onSubmit={handleSubmit(onSubmit)}>
      <AppForm.RHFField
        name="email"
        label={t("email")}
        required
        isError={!!errors.email}
        control={control}
        render={({ field }) => <AppInput {...field} type="email" required />}
        errorMessages={!!errors.email ? [t(errors.email?.message)] : []}
      />
      <AppForm.RHFField
        name="password"
        label={t("password")}
        required
        isError={!!errors.password}
        errorMessages={!!errors.password ? [t(errors.password?.message)] : []}
        control={control}
        render={({ field }) => <AppInput {...field} type="password" required />}
      />

      <div>
        <AppButton type="submit">{t("loginSubmit")}</AppButton>
      </div>
    </AppForm>
  );
};
