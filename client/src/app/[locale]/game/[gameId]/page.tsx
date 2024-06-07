import { GamePage } from "@/pages/game-page";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Page() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, "Game")}>
      <GamePage />
    </NextIntlClientProvider>
  );
}
