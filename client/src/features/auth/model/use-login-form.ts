import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { LoginFormData, loginSchema } from "../lib/schemas/login-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authActions, useLoginMutation } from "@/entities/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "@/shared/config/navigation";

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
  const t = useTranslations("Auth");

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      dispatch(
        authActions.setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      router.push("/lobby");
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isLoading,
    isSubmitting,
    t,
  };
};
