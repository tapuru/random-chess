"use client";

import { PlayerInfoLayout } from "@/entities/player";
import { IngameProfileLayout } from "@/entities/profile";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useOnlineGameEnemyPlayerInfo } from "../../model/use-online-game-enemy-player-info";

export const OnlineGameEnemyPlayerInfo = () => {
  const { enemyPlayer, isLoading, isSuccess } = useOnlineGameEnemyPlayerInfo();

  if (!enemyPlayer) return null;

  if (isLoading) return <AppLoader />;

  if (isSuccess)
    return (
      <PlayerInfoLayout
        profile={<IngameProfileLayout profile={enemyPlayer} />}
        timer={<div>timer</div>}
      />
    );
};
