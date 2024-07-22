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
  const mobile = window.innerWidth < 992;

  return (
    <AppCard>
      <AppCard.Content>
        <div className={cl.content}>
          {mobile ? (
            <>
              <div className={cl.infoRight}>
                {gameTurn}
                <div className={cl.actions}>{gameActions}</div>
              </div>
              <div className={cl.moves}>{gameMoves}</div>
            </>
          ) : (
            <>
              <div className={cl.moves}>{gameMoves}</div>
              <div className={cl.infoRight}>
                <div className={cl.actions}>{gameActions}</div>
                {gameTurn}
              </div>
            </>
          )}
        </div>
      </AppCard.Content>
    </AppCard>
  );
};
