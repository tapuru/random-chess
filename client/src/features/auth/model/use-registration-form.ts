import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import {
  RegistrationFormData,
  registrationSchema,
} from "../lib/schemas/registration-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/shared/config/navigation";
import { authActions, useRegisterMutation } from "@/entities/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  ApiErrors,
  apiErrorSchema,
  isApiError,
} from "@/shared/lib/api-helpers";

export const useRegistrationForm = () => {
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
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("Auth");
  const errorT = useTranslations("ApiErrors");

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
      if (isApiError(error)) {
        let message: string;
        const result = apiErrorSchema.safeParse(error.data.message);
        result.success
          ? (message = errorT(result.data))
          : (message = errorT(ApiErrors.UNEXPECTED));
        setServerError(message);
      } else {
        setServerError(errorT(ApiErrors.UNEXPECTED));
        console.log(error);
      }
    }
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isLoading,
    isSubmitting,
    t,
    serverError,
  };
};
