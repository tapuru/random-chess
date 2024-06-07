import cl from "./create-game-page.module.scss";
import { CreateGameForm } from "@/features/create-game";
import { AppText } from "@/shared/ui/app-text/app-text";
import { Container } from "@/shared/ui/container/container";

export const CreateGamePage = () => {
  return (
    <Container>
      <main className={cl.main}>
        <AppText tag="h1">Create Game</AppText>
        <CreateGameForm />
      </main>
    </Container>
  );
};
