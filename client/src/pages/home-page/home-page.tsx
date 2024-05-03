import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import cl from "./home-page.module.scss";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useRouter } from "@/shared/config/navigation";
import { pick } from "lodash";
import { HomeButtons } from "@/widgets/home-buttons";

export const HomePage = () => {
  const messages = useMessages();

  return (
    <main className={cl.root}>
      <div className={cl.content}>
        <div className={cl.boardPlaceholder}></div>
        <NextIntlClientProvider messages={pick(messages, "HomePage")}>
          <HomeButtons />
        </NextIntlClientProvider>
      </div>
    </main>
  );
};
