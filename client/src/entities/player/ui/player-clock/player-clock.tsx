"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./player-clock.module.scss";
import { Player } from "../../types/player";

export const PlayerClock = ({ player }: { player: Player }) => {
  return <div className={cl.root}>{player.timeLeft}</div>;
};
