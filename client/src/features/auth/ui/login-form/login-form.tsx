"use client";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../lib/schemas/login-schema";

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
  return (
    <AppForm onSubmit={handleSubmit(onSubmit)}>
      <AppForm.Field
        name="email"
        label="Email"
        required
        isError={!!errors.email}
        errorMessage={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => <AppInput {...field} type="email" />}
        />
      </AppForm.Field>
      <AppForm.Field
        name="password"
        label="Password"
        required
        isError={!!errors.password}
        errorMessage={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => <AppInput {...field} type="password" />}
        />
      </AppForm.Field>
      <AppButton type="submit">Submit</AppButton>
    </AppForm>
  );
};
