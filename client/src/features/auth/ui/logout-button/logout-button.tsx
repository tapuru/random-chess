"use client";

import { authActions, useLogoutMutation } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";
import {
  ApiErrors,
  apiErrorSchema,
  isApiError,
} from "@/shared/lib/api-helpers";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { AppText } from "@/shared/ui/app-text/app-text";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const t = useTranslations("Auth");
  const errorT = useTranslations("ApiErrors");

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();
      dispatch(authActions.logout());
      router.push("/");
    } catch (error) {
      if (isApiError(error)) {
        let message: string;
        const result = apiErrorSchema.safeParse(error.data.message);
        result.success
          ? (message = errorT(result.data))
          : (message = errorT(ApiErrors.UNEXPECTED));
        toast.error(message, getErrorToastConfig());
      } else {
        toast.error(ApiErrors.UNEXPECTED, getErrorToastConfig());
        console.log(error);
      }
    }
  };
  return (
    //TODO move this into profile menu
    <button onClick={handleLogout} disabled={isLoading}>
      <AppText tag="span" color="text-500">
        {t("logout")}
      </AppText>
    </button>
  );
};
