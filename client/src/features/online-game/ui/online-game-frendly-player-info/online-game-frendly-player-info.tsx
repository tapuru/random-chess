"use client";

import { PlayerInfoLayout, PlayerTimer } from "@/entities/player";
import { IngameProfileLayout, profileApi } from "@/entities/profile";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useOnlineGameFrendlyPlayerInfo } from "../../model/use-online-game-frendly-player-info";
import { GameStatus } from "@/shared/types/game-status";

export const OnlineGameFrendlyPlayerInfo = () => {
  const result = useOnlineGameFrendlyPlayerInfo();
  if (!result) return null;
  const {
    frendlyPlayerColor,
    game,
    isLoading,
    isSuccess,
    me,
    timeLeft,
    setTimeLeft,
  } = result;

  if (isLoading) return <AppLoader />;

  if (isSuccess)
    return (
      <PlayerInfoLayout
        profile={<IngameProfileLayout profile={me} />}
        timer={
          <PlayerTimer
            isActive={
              game &&
              game.currentTurn === frendlyPlayerColor &&
              game.moves &&
              game.moves.length !== 0 &&
              game.status === GameStatus.ACTIVE
            }
            startTime={game.settings.time}
            onDecrement={() =>
              setTimeLeft((prev) => (prev ? prev - 1 : undefined))
            }
            timeLeft={timeLeft}
          />
        }
      />
    );
};
