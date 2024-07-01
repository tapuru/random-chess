import cl from "./create-game-page.module.scss";
import { CreateGameHeader, CreateGameTabs } from "@/features/create-game";
import { Container } from "@/shared/ui/container/container";

export const CreateGamePage = () => {
  return (
    <Container>
      <main className={cl.main}>
        <CreateGameHeader />
        <CreateGameTabs />
      </main>
    </Container>
  );
};
