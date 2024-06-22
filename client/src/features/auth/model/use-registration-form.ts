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
  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isLoading,
    isSubmitting,
    t,
  };
};
