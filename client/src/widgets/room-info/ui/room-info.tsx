"use client";

import { GameInfo, PlayerInfo, selectRoomPlayers } from "@/features/room";
import cl from "./room-info.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";

export const RoomInfo = () => {
  const players = useAppSelector(selectRoomPlayers);
  const owner = players.find((p) => p.isRoomOwner);
  const guest = players.find((p) => !p.isRoomOwner);

  return (
    <div className={cl.root}>
      {!!guest && <PlayerInfo player={guest} />}
      <GameInfo />
      {!!owner && <PlayerInfo player={owner} />}
    </div>
  );
};
