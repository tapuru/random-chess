import React from "react";
import cl from "./game-page-layout.module.scss";

interface GamePageLayoutProps {
  board: React.ReactNode;
  playerTwoInfo: React.ReactNode;
  playerOneInfo: React.ReactNode;
  gameInfo: React.ReactNode;
}

export const GamePageLayout = ({
  board,
  gameInfo,
  playerOneInfo,
  playerTwoInfo,
}: GamePageLayoutProps) => {
  return (
    <main className={cl.root}>
      <div className={cl.content}>
        <div className={cl.board}>{board}</div>
        <div className={cl.info}>
          {playerTwoInfo}
          {gameInfo}
          {playerOneInfo}
        </div>
      </div>
    </main>
  );
};
