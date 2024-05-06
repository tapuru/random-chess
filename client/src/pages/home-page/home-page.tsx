import { NextIntlClientProvider, useMessages } from "next-intl";
import cl from "./home-page.module.scss";
import { pick } from "lodash";
import { HomeContent } from "@/widgets/home-content";

export const HomePage = () => {
  const messages = useMessages();

  return (
    <main className={cl.root}>
      <NextIntlClientProvider messages={pick(messages, "HomePage")}>
        <HomeContent />
      </NextIntlClientProvider>
    </main>
  );
};
