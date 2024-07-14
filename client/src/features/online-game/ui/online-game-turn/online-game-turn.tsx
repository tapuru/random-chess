"use client";

import { GameTurnUI, LeaveGameButton } from "@/entities/game";
import { OnlineGameOfferRematchButton } from "../online-game-offer-rematch-button/online-game-offer-rematch-button";
import { useOnlineGameTurn } from "../../model/use-online-game-turn";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";

export const OnlineGameTurn = () => {
  const result = useOnlineGameTurn();
  if (!result) return null;
  const { frendlyPlayerColor, isLoading, t, game } = result;

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <GameTurnUI
      currentTurn={game?.currentTurn}
      frendlyPlayerColor={frendlyPlayerColor}
      gameType={game.settings.type}
      resultContent={
        <>
          <OnlineGameOfferRematchButton />
          <LeaveGameButton title={t("leave")} />
        </>
      }
      result={game.result}
    />
  );
};
