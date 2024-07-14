"use client";

import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useRegistrationForm } from "../../model/use-registration-form";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";

export const RegistrationForm = () => {
  const { control, errors, handleSubmit, isLoading, isSubmitting, t } =
    useRegistrationForm();

  return (
    <AppForm onSubmit={handleSubmit}>
      <AppForm.RHFField
        name="email"
        label={t("email")}
        required
        isError={!!errors.email}
        errorMessages={!!errors.email ? [t(errors.email.message)] : []}
        control={control}
        render={({ field }) => (
          <AppInput {...field} type="email" required disabled={isLoading} />
        )}
      />
      <AppForm.RHFField
        name="username"
        label={t("username")}
        required
        control={control}
        render={({ field }) => (
          <AppInput {...field} required disabled={isLoading} />
        )}
        isError={!!errors.username}
        errorMessages={!!errors.username ? [t(errors.username?.message)] : []}
      />
      <AppForm.RHFField
        name="password"
        label={t("password")}
        control={control}
        required
        render={({ field }) => (
          <AppInput {...field} required type="password" disabled={isLoading} />
        )}
        isError={!!errors.password}
        errorMessages={!!errors.password ? [t(errors.password?.message)] : []}
      />
      <AppForm.RHFField
        required
        name="passwordConfirm"
        label={t("confirmPassword")}
        control={control}
        render={({ field }) => (
          <AppInput {...field} required type="password" disabled={isLoading} />
        )}
        isError={!!errors.passwordConfirm}
        errorMessages={
          !!errors.passwordConfirm ? [t(errors.passwordConfirm?.message)] : []
        }
      />
      <AppForm.Submit>
        {isLoading ? (
          <AppLoader />
        ) : (
          <AppButton type="submit">{t("register")}</AppButton>
        )}
      </AppForm.Submit>
    </AppForm>
  );
};
