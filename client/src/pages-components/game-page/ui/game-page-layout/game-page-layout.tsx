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
  const width = window.innerWidth;
  const mobile = width < 992;

  return (
    <main className={cl.root}>
      <div className={cl.content}>
        {mobile && <div className={cl.playerInfo}>{enemyPlayerInfo}</div>}
        <div className={cl.board}>{board}</div>
        <div className={cl.info}>
          {mobile ? frendlyPlayerInfo : enemyPlayerInfo}
          {gameInfo}
          {!mobile && frendlyPlayerInfo}
        </div>
      </div>
      {mobile && <div className={cl.mobileMarginBottom}></div>}
    </main>
  );
};
