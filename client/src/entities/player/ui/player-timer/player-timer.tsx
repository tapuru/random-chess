"use client";

import cl from "./player-timer.module.scss";
import cn from "classnames";
import { Player } from "../../types/player";
import { useEffect, useRef, useState } from "react";
import { secondsToHHMMSS } from "@/shared/lib/seconds-to-hhmmss";
import { AppCard } from "@/shared/ui/app-card/app-card";

interface PlayerTimerProps {
  isActive: boolean;
  startTime?: number;
  timeLeft?: number;
  onDecrement: () => void;
}

export const PlayerTimer = ({
  isActive,
  startTime,
  onDecrement,
  timeLeft,
}: PlayerTimerProps) => {
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
      onDecrement();
    }, 1000);
  }

  function stopTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }
  if (!timeLeft || !startTime) return null;

  const timeToShow = secondsToHHMMSS(timeLeft);
  const isDanger = (timeLeft / startTime) * 100 < 10;

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
