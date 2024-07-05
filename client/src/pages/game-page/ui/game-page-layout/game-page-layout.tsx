import React from "react";
import cl from "./game-page-layout.module.scss";

interface GamePageLayoutProps {
  board: React.ReactNode;
  enemyPlayerInfo: React.ReactNode;
  frendlyPlayerInfo: React.ReactNode;
  gameInfo: React.ReactNode;
}

export const GamePageLayout = ({
  board,
  gameInfo,
  frendlyPlayerInfo,
  enemyPlayerInfo,
}: GamePageLayoutProps) => {
  return (
    <main className={cl.root}>
      <div className={cl.content}>
        <div className={cl.board}>{board}</div>
        <div className={cl.info}>
          {enemyPlayerInfo}
          {gameInfo}
          {frendlyPlayerInfo}
        </div>
      </div>
    </main>
  );
};
