import { AppButton } from "@/shared/ui/app-button/app-button";
import { useTranslations } from "next-intl";

export const HomePage = () => {
  const t = useTranslations("IndexPage");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
};
