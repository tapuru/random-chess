"use client";

import cl from "./player-info.module.scss";
import { selectGame } from "@/entities/game";
import { Player } from "@/entities/player";
import { PlayerClock } from "@/entities/player/ui/player-clock/player-clock";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { roomActions } from "../../model/room-slice";

export const PlayerInfo = ({ player }: { player: Player }) => {
  const game = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  return (
    <div className={cl.root}>
      <div className={cl.profilePlaceholder}>{player.ownerId}. username</div>
      <div className={cl.clock}>
        <PlayerClock
          player={player}
          isActive={game?.currentTurnColor === player.color}
          decrement={() =>
            dispatch(roomActions.decrementPlayerTime(player.ownerId))
          }
          startTime={300}
        />
      </div>
    </div>
  );
};
