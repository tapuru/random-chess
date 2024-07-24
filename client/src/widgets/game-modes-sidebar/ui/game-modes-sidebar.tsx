"use client";

import { GameModes } from "@/shared/types/game-modes";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { useSearchParams } from "next/navigation";
import { GameModesSidebarList } from "./game-modes-sidebar-list/game-modes-sidebar-list";

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
