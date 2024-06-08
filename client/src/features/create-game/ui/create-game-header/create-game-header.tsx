"use client";
import { AppText } from "@/shared/ui/app-text/app-text";
import { useTranslations } from "use-intl";
import { AppButton } from "@/shared/ui/app-button/app-button";
import cl from "./create-game-header.module.scss";
import { useRouter } from "@/shared/config/navigation";

export const CreateGameHeader = () => {
  const t = useTranslations("CreateGame");
  const router = useRouter();

  return (
    <div className={cl.header}>
      <AppText tag="h1">{t("createGame")}</AppText>
      <AppButton onClick={() => router.back()}>{t("back")}</AppButton>
    </div>
  );
};
