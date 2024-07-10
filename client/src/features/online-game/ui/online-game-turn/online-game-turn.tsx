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
import { OnlineGameOfferRematchButton } from "../online-game-offer-rematch-button/online-game-offer-rematch-button";
import { useRouter } from "@/shared/config/navigation";
import { useEffect } from "react";

export const OnlineGameTurn = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  const { data: profile } = profileApi.useGetMeQuery();
  const { data: rematchData, isLoading: isRematchDataLoading } =
    gameApi.useGetRematchDataQuery();
  const t = useTranslations("Game");
  const router = useRouter();

  useEffect(() => {
    if (rematchData?.rematchGameId) {
      router.push(`/game/${rematchData.rematchGameId}`);
    }
  }, [rematchData]);

  console.log(rematchData);

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
          {/*TODO: make loader */}
          <OnlineGameOfferRematchButton />
          <LeaveGameButton title={t("leave")} />
        </>
      }
      result={game.result}
    />
  );
};
