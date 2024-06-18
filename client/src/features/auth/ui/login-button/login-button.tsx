"use client";

import { useRouter } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useTranslations } from "next-intl";

export const LoginButton = () => {
  const router = useRouter();

  const t = useTranslations("Auth");

  return (
    <AppButton
      variant="outlined"
      size="sm"
      color="primary"
      onClick={() => router.push("/login")}
    >
      {t("loginButtonLabel")}
    </AppButton>
  );
};
