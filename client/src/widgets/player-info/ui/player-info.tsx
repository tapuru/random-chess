"use client";

import {
  Player,
  PlayerTimer,
  playersActions,
  selectPlayerOne,
  selectPlayerTwo,
} from "@/entities/player";
import cl from "./player-info.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectGame, selectGameSettings } from "@/entities/game";
import { useTranslations } from "use-intl";
import { GameStatus } from "@/shared/types/game-status";

const PlayerInfo = ({ player }: { player: Player | null }) => {
  const game = useAppSelector(selectGame);
  const gameSettings = useAppSelector(selectGameSettings);
  const dispatch = useAppDispatch();
  const t = useTranslations("Game");

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
      <div className={cl.basicPlayer}>{t(player.color)}</div>
      {gameSettings.time && (
        <div className={cl.clock}>
          <PlayerTimer
            player={player}
            isActive={
              game?.currentTurn === player.color &&
              !(game.status === GameStatus.FINISHED) &&
              game.moves.length !== 0
            }
            decrement={() =>
              dispatch(
                playersActions.changePlayerTime({
                  color: player.color,
                  time: -1,
                  maxTime: gameSettings.time,
                })
              )
            }
            startTime={300}
          />
        </div>
      )}
    </div>
  );
};

export const PlayerOneInfo = () => {
  const player = useAppSelector(selectPlayerOne);
  return <PlayerInfo player={player} />;
};

export const PlayerTwoInfo = () => {
  const player = useAppSelector(selectPlayerTwo);
  return <PlayerInfo player={player} />;
};
