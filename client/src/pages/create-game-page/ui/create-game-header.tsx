"use client";
import { AppText } from "@/shared/ui/app-text/app-text";
import cl from "./create-game-page.module.scss";
import { useTranslations } from "use-intl";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const CreateGameHeader = () => {
  const t = useTranslations("CreateGame");

  return (
    <div className={cl.header}>
      <AppText tag="h1">{t("createGame")}</AppText>
      <AppButton>{t("back")}</AppButton>
    </div>
  );
};
