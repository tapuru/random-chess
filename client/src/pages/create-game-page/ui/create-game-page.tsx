import cl from "./create-game-page.module.scss";
import { CreateLocalGameForm } from "@/features/create-game";
import { AppText } from "@/shared/ui/app-text/app-text";
import { Container } from "@/shared/ui/container/container";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { CreateGameHeader } from "./create-game-header";

export const CreateGamePage = () => {
  const messages = useMessages();

  return (
    <Container>
      <main className={cl.main}>
        <NextIntlClientProvider messages={pick(messages, "CreateGame")}>
          <CreateGameHeader />
          <CreateLocalGameForm />
        </NextIntlClientProvider>
      </main>
    </Container>
  );
};
