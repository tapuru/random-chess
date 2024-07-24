"use client";

import { Link } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useTranslations } from "next-intl";

export const CreateGameButton = ({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) => {
  const t = useTranslations("CreateGame");

  return (
    <Link href={"/create/online"}>
      <AppButton color="primary" size={size}>
        {t("createGame")}
      </AppButton>
    </Link>
  );
};
