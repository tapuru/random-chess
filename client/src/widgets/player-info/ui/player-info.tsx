"use client";

import { GameTypes } from "@/shared/types/game-type";
import { OnlineGamePlayerInfo } from "@/features/online-game/ui/online-game-player-info/online-game-player-info";

export const PlayerInfo = ({
  side,
  gameType,
}: {
  gameType: GameTypes;
  side: "frendly" | "enemy";
}) => {
  switch (gameType) {
    case GameTypes.ONLINE:
      return <OnlineGamePlayerInfo side={side} />;
    case GameTypes.ENGINE:
      return <div>engine player info</div>;
    case GameTypes.LOCAL:
      return <div>local player info</div>;
  }
};
