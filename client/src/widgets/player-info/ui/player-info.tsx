"use client";

import { Player, PlayerTimer, playersActions } from "@/entities/player";
import cl from "./player-info.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectGame } from "@/entities/game";

export const PlayerInfo = ({ player }: { player: Player | null }) => {
  const game = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  if (!player) return null;

  if (player.type === "online") {
    return (
      <div className={cl.root}>
        <div className={cl.profile}>{/* <Profile /> */}</div>
        <div className={cl.clock}>{/* <PlayerClock /> */}</div>
      </div>
    );
  }

  if (player.type === "engine") {
    return (
      <div className={cl.root}>
        <div className={cl.engine}>{/* <EngineProfile /> */}</div>
        <div className={cl.clock}>{/* <PlayerClock /> */}</div>
      </div>
    );
  }

  return (
    <div className={cl.root}>
      <div className={cl.basicPlayer}>{player.color}</div>
      <div className={cl.clock}>
        <PlayerTimer
          player={player}
          isActive={game?.currentTurn === player.color}
          decrement={() =>
            dispatch(
              playersActions.changePlayerTime({
                color: player.color,
                time: -1,
              })
            )
          }
          startTime={300}
        />
      </div>
    </div>
  );
};
