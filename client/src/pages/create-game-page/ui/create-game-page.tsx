import cl from "./create-game-page.module.scss";
import { CreateGameHeader, CreateLocalGameForm } from "@/features/create-game";
import { Container } from "@/shared/ui/container/container";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

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
