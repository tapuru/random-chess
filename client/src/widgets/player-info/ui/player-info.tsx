"use client";

import {
  OnlineGameEnemyPlayerInfo,
  OnlineGameFrendlyPlayerInfo,
} from "@/features/online-game";
import { GameTypes } from "@/shared/types/game-type";

export const PlayerInfo = ({
  side,
  gameType,
}: {
  gameType: GameTypes;
  side: "frendly" | "enemy";
}) => {
  switch (side) {
    case "frendly": {
      switch (gameType) {
        case GameTypes.ONLINE:
          return <OnlineGameFrendlyPlayerInfo />;
        case GameTypes.ENGINE:
          return <div>engine player info</div>;
        case GameTypes.LOCAL:
          return <div>local player info</div>;
      }
    }
    case "enemy": {
      switch (gameType) {
        case GameTypes.ONLINE:
          return <OnlineGameEnemyPlayerInfo />;
        case GameTypes.ENGINE:
          return <div>engine player info</div>;
        case GameTypes.LOCAL:
          return <div>local player info</div>;
      }
    }
  }
};
