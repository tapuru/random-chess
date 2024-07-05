"use client";

import { gameApi, GameTurnUI, getFrendlyPlayerColor } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";

export const OnlineGameTurn = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  const { data: profile } = profileApi.useGetMeQuery();

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
          <button>result</button>
        </>
      }
      result={game.result}
    />
  );
};
