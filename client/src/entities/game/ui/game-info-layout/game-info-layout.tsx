import { AppCard } from "@/shared/ui/app-card/app-card";
import cl from "./game-info-layout.module.scss";
import React from "react";

export const GameInfoLayout = ({
  gameActions,
  gameMoves,
  gameTurn,
}: {
  gameMoves: React.ReactNode;
  gameTurn: React.ReactNode;
  gameActions: React.ReactNode;
}) => {
  return (
    <AppCard>
      <AppCard.Content>
        <div className={cl.content}>
          <div className={cl.moves}>{gameMoves}</div>
          <div className={cl.infoRight}>
            <div className={cl.actions}>{gameActions}</div>
            {gameTurn}
          </div>
        </div>
      </AppCard.Content>
    </AppCard>
  );
};
