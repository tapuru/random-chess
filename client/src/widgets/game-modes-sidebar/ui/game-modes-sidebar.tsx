"use client";

import { GameModesSidebarList } from "@/features/search-game";
import { GameModes } from "@/shared/types/game-modes";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { useSearchParams } from "next/navigation";

export const GameModesSidebar = () => {
  const searchParams = useSearchParams();
  const gameModes = Object.values(GameModes);
  const active = searchParams?.get("mode");

  return (
    <AppCard>
      <AppCard.Content>
        <GameModesSidebarList modes={gameModes} activeMode={active} />
      </AppCard.Content>
    </AppCard>
  );
};
