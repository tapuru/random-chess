"use client";

import { selectGameSettings } from "@/entities/game";
import { LocalGameBoard } from "@/features/local-game";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { GameTypes } from "@/shared/types/game-type";

export const GameBoard = () => {
  const gameSettings = useAppSelector(selectGameSettings);

  if (!gameSettings) return null;

  if (gameSettings.type === GameTypes.LOCAL) {
    return <LocalGameBoard />;
  }

  if (gameSettings.type === GameTypes.ONLINE) {
    return <div>online board</div>;
  }

  if (gameSettings.type === GameTypes.ENGINE) {
    return <div>engine game</div>;
  }
};
