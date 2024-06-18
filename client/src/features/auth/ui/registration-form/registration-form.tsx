import { AppForm } from "@/shared/ui/app-form/app-form";
import { Controller, useForm, Control } from "react-hook-form";
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
      username: "",
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
  };

  return (
    <AppForm onSubmit={handleSubmit(onSubmit)}>
      <AppForm.RHFField
        name="email"
        label="Email"
        required
        isError={!!errors.email}
        errorMessages={[errors.email?.message ?? ""]}
        control={control}
        render={({ field }) => <AppInput {...field} type="email" required />}
      />
      <Controller control={control} name="username" render={() => <></>} />
      <AppForm.RHFField
        name="username"
        label="Username"
        required
        control={control}
        render={({ field }) => <AppInput {...field} required />}
        isError={!!errors.username}
        errorMessages={[errors.username?.message ?? ""]}
      />
      <AppForm.RHFField
        name="password"
        label="Password"
        control={control}
        required
        render={({ field }) => <AppInput {...field} required />}
        isError={!!errors.password}
        errorMessages={[errors.password?.message ?? ""]}
      />
      <AppForm.RHFField
        required
        name="passwordConfirm"
        label="Confirm password"
        control={control}
        render={({ field }) => <AppInput {...field} required />}
        isError={!!errors.passwordConfirm}
        errorMessages={[errors.passwordConfirm?.message ?? ""]}
      />
      <AppButton>Submit</AppButton>
    </AppForm>
  );
};
