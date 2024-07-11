"use client";

import { GameTurnUI, LeaveGameButton } from "@/entities/game";
import { OnlineGameOfferRematchButton } from "../online-game-offer-rematch-button/online-game-offer-rematch-button";
import { useOnlineGameTurn } from "../../model/use-online-game-turn";

export const OnlineGameTurn = () => {
  const result = useOnlineGameTurn();
  if (!result) return null;
  const { frendlyPlayerColor, isLoading, t, game } = result;

  if (isLoading) {
    //TODO: make loader
    return <div>Loading</div>;
  }

  return (
    <GameTurnUI
      currentTurn={game?.currentTurn}
      frendlyPlayerColor={frendlyPlayerColor}
      gameType={game.settings.type}
      resultContent={
        <>
          {/*TODO: make loader */}
          <OnlineGameOfferRematchButton />
          <LeaveGameButton title={t("leave")} />
        </>
      }
      result={game.result}
    />
  );
};
