import { GameModesSidebar } from "@/widgets/game-modes-sidebar";
import { LobbyPageLayout } from "./lobby-page-layout/lobby-page-layout";
import { Container } from "@/shared/ui/container/container";
import { LobbyHeader } from "@/widgets/lobby-header";

export const LobbyPage = () => {
  return (
    <Container>
      <LobbyPageLayout
        sidebar={<GameModesSidebar />}
        header={<LobbyHeader />}
        content={null}
      />
    </Container>
  );
};
