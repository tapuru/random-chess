"use client";

import { PlayerInfoLayout, PlayerTimer } from "@/entities/player";
import { IngameProfileLayout } from "@/entities/profile";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useOnlineGameEnemyPlayerInfo } from "../../model/use-online-game-enemy-player-info";
import { GameStatus } from "@/shared/types/game-status";

export const OnlineGameEnemyPlayerInfo = () => {
  const result = useOnlineGameEnemyPlayerInfo();
  if (!result) return null;
  const {
    enemyPlayer,
    isLoading,
    isSuccess,
    game,
    enemyPlayerColor,
    setTimeLeft,
    timeLeft,
  } = result;

  if (isLoading) return <AppLoader />;

  if (isSuccess)
    return (
      <PlayerInfoLayout
        profile={<IngameProfileLayout profile={enemyPlayer} />}
        timer={
          <PlayerTimer
            isActive={
              game.currentTurn === enemyPlayerColor &&
              game.moves &&
              game.moves.length !== 0 &&
              game.status === GameStatus.ACTIVE
            }
            startTime={game.settings.time}
            onDecrement={() => {
              setTimeLeft((prev) => (prev ? prev - 1 : undefined));
            }}
            timeLeft={timeLeft}
          />
        }
      />
    );
};
