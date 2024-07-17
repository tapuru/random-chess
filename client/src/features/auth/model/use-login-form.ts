import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { LoginFormData, loginSchema } from "../lib/schemas/login-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authActions, useLoginMutation } from "@/entities/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "@/shared/config/navigation";
import { useState } from "react";
import {
  ApiErrors,
  apiErrorSchema,
  isApiError,
} from "@/shared/lib/api-helpers";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState<null | string>(null);
  const t = useTranslations("Auth");

  const { handleApiError } = useHandleApiError();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      dispatch(
        authActions.setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      reset();
      router.push("/lobby");
    } catch (error) {
      handleApiError(error, (message) => {
        setServerError(message);
      });
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
