"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./player-clock.module.scss";

export const PlayerClock = () => {
  return <div className={cl.root}></div>;
};
