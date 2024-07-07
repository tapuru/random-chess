"use client";

import {
  gameApi,
  GameTurnUI,
  getFrendlyPlayerColor,
  LeaveGameButton,
} from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const OnlineGameTurn = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  const { data: profile } = profileApi.useGetMeQuery();
  const t = useTranslations("Game");

  if (!game || !profile) return null;
  const frendlyPlayerColor = getFrendlyPlayerColor(game, profile.id);

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
          <LeaveGameButton title={t("leave")} />
        </>
      }
      result={game.result}
    />
  );
};
