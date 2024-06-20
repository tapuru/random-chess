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
import { authActions, useRegisterMutation } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
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
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const t = useTranslations("Auth");

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await register(data).unwrap();
      dispatch(
        authActions.setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      router.push("/");
    } catch (error) {
      //TODO: handle error
      console.log(error);
    }
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
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <AppButton type="submit">{t("register")}</AppButton>
        )}
      </div>
    </AppForm>
  );
};
