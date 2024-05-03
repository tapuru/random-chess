"use client";

import { AppButton } from "@/shared/ui/app-button/app-button";
import cl from "./home-buttos.module.scss";
import { useRouter } from "@/shared/config/navigation";
import { useTranslations } from "next-intl";

export const HomeButtons = () => {
  const router = useRouter();
  const t = useTranslations("HomePage");

  return (
    <div className={cl.root}>
      <AppButton
        size="lg"
        variant="filled"
        color="primary"
        onClick={() => router.push("/create")}
      >
        {t("createGame")}
      </AppButton>
      <AppButton
        size="lg"
        variant="filled"
        color="primary"
        onClick={() => router.push("/lobby")}
      >
        {t("findGame")}
      </AppButton>
      <AppButton
        size="lg"
        variant="filled"
        color="primary"
        onClick={() => router.push("/create")}
      >
        {t("playWithEngine")}
      </AppButton>
    </div>
  );
};
