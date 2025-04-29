"use client";

import { GameModesSidebar } from "@/widgets/game-modes-sidebar";
import { LobbyPageLayout } from "./lobby-page-layout/lobby-page-layout";
import { Container } from "@/shared/ui/container/container";
import { LobbyHeader } from "@/widgets/lobby-header";
import { GameSearchResult } from "@/widgets/game-search-result";
import { useActiveMode } from "@/features/search-game";

export const LobbyPage = () => {
  const res = useActiveMode();
  if (!res) return null;
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
