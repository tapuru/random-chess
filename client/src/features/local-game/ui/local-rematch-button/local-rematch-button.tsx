"use client";
import {
  gameActions,
  selectGameResult,
  selectGameSettings,
} from "@/entities/game";
import { playersActions } from "@/entities/player";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { GameStatus } from "@/shared/types/game-status";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const LocalRematchButton = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const GameResult = useAppSelector(selectGameResult);
  const gameSettings = useAppSelector(selectGameSettings);
  if (!GameResult) return null;

  const handleClick = () => {
    dispatch(gameActions.resetGame());
    dispatch(gameActions.setGameStatus(GameStatus.ACTIVE));
    dispatch(gameActions.setResult(null));
    if (gameSettings.time)
      dispatch(playersActions.setPlayersTime(gameSettings.time));
  };

  return (
    <AppButton variant="filled" color="secondary" onClick={handleClick}>
      {title}
    </AppButton>
  );
};
