import { AppForm } from "@/shared/ui/app-form/app-form";
import { Controller, useForm } from "react-hook-form";
import {
  RegistrationFormData,
  registrationSchema,
} from "../../lib/schemas/registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { AppButton } from "@/shared/ui/app-button/app-button";

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
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
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
          control={control}
          name="password"
          render={({ field }) => <AppInput {...field} type="password" />}
        />
      </AppForm.Field>
      <AppForm.Field
        name="passwordConfirm"
        label="Confirm password"
        required
        isError={!!errors.passwordConfirm}
        errorMessage={errors.passwordConfirm?.message}
      >
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field }) => <AppInput {...field} type="password" />}
        />
      </AppForm.Field>
      <AppButton>Submit</AppButton>
    </AppForm>
  );
};
