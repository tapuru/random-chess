"use client";

import { AppButton } from "@/shared/ui/app-button/app-button";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { useLoginForm } from "../../model/use-login-form";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";

export const LoginForm = () => {
  const { control, errors, handleSubmit, isLoading, isSubmitting, t } =
    useLoginForm();

  return (
    <AppForm onSubmit={handleSubmit}>
      <AppForm.RHFField
        name="email"
        label={t("email")}
        required
        isError={!!errors.email}
        control={control}
        render={({ field }) => (
          <AppInput {...field} type="email" required disabled={isLoading} />
        )}
        errorMessages={!!errors.email ? [t(errors.email?.message)] : []}
      />
      <AppForm.RHFField
        name="password"
        label={t("password")}
        required
        isError={!!errors.password}
        errorMessages={!!errors.password ? [t(errors.password?.message)] : []}
        control={control}
        render={({ field }) => (
          <AppInput {...field} type="password" required disabled={isLoading} />
        )}
      />
      <AppForm.Submit>
        {isLoading ? (
          <AppLoader />
        ) : (
          <AppButton type="submit" disabled={isLoading}>
            {t("loginSubmit")}
          </AppButton>
        )}
      </AppForm.Submit>
    </AppForm>
  );
};
