"use client";

import { gameApi, getFrendlyPlayerColor } from "@/entities/game";
import { PlayerInfoLayout, PlayerTimer } from "@/entities/player";
import { profileApi } from "@/entities/profile";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";

export const OnlineGamePlayerInfo = ({
  side,
}: {
  side: "frendly" | "enemy";
}) => {
  const params = useParams<{ gameId: string }>();
  const { data: game } = gameApi.useGetGameQuery(params?.gameId || skipToken);
  const { data: frendlyPlayer } = profileApi.useGetMeQuery();

  if (!game || !frendlyPlayer || game.status === GameStatus.PENDING)
    return null;
  const frendlyPlayerColor = getFrendlyPlayerColor(game, frendlyPlayer.id);
  const enemyPlayer =
    frendlyPlayerColor === ChessColors.BLACK
      ? game.playerWhite
      : game.playerBlack;

  switch (side) {
    case "frendly":
      return (
        <PlayerInfoLayout
          profile={<div>{frendlyPlayer.username}</div>}
          timer={<div>timer</div>}
        />
      );
    case "enemy":
      return (
        <PlayerInfoLayout
          profile={<div>{enemyPlayer?.username}</div>}
          timer={<div>timer</div>}
        />
      );
  }
};
