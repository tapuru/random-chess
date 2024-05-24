"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./game-result.module.scss";
import { selectGameResult } from "@/entities/game";

export const GameResult = () => {
  const gameResult = useAppSelector(selectGameResult);

  if (!gameResult) return null;
};
