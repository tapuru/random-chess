import { GameModesSidebar } from "@/widgets/game-modes-sidebar";
import { LobbyPageLayout } from "./lobby-page-layout/lobby-page-layout";
import { Container } from "@/shared/ui/container/container";
import { LobbyHeader } from "@/widgets/lobby-header";
import { PendingGamesList } from "@/features/search-game";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { GameSearchResult } from "@/widgets/game-search-result";

export const LobbyPage = () => {
  return (
    <Container>
      <LobbyPageLayout
        sidebar={<GameModesSidebar />}
        header={<LobbyHeader />}
        content={<GameSearchResult />}
      />
    </Container>
  );
};
