"use client";

import { authActions, useLogoutMutation } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";
import {
  ApiErrors,
  apiErrorSchema,
  isApiError,
} from "@/shared/lib/api-helpers";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { AppText } from "@/shared/ui/app-text/app-text";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import cl from "./logout-button.module.scss";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const t = useTranslations("Auth");
  const { handleApiError } = useHandleApiError();

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();
      dispatch(authActions.logout());
      router.push("/");
    } catch (error) {
      handleApiError(error, (message) => {
        toast(message, getErrorToastConfig());
      });
    }
  };
  return (
    <button onClick={handleLogout} disabled={isLoading} className={cl.root}>
      <AppText tag="span" color="text-500" className={cl.text}>
        {t("logout")}
      </AppText>
    </button>
  );
};
