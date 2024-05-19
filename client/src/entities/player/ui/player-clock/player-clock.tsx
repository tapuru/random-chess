"use client";

import cl from "./player-clock.module.scss";
import cn from "classnames";
import { Player } from "../../types/player";
import { useEffect, useRef } from "react";
import { secondsToHHMMSS } from "@/shared/lib/seconds-to-hhmmss";
import { AppCard } from "@/shared/ui/app-card/app-card";

interface PlayerClockProps {
  player: Player;
  isActive: boolean;
  decrement: () => {};
  startTime: number;
}

export const PlayerClock = ({
  player,
  isActive,
  decrement,
  startTime,
}: PlayerClockProps) => {
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (isActive) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isActive]);

  function startTimer() {
    timer.current = setInterval(() => {
      decrement();
    }, 1000);
  }

  function stopTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }

  if (player.timeLeft === null) return null;

  const timeToShow = secondsToHHMMSS(player.timeLeft);
  const isDanger = (player.timeLeft / startTime) * 100 < 10;

  return (
    <div className={cn(cl.root, { [cl.danger]: isDanger })}>
      <AppCard>
        <AppCard.Content>
          <div className={cl.content}>{timeToShow}</div>
        </AppCard.Content>
      </AppCard>
    </div>
  );
};
