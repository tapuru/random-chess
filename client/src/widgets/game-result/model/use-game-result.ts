import {
  GameEndReason,
  selectGameResult,
  selectGameSettings,
} from "@/entities/game";
import { selectPlayerOne, selectPlayerTwo } from "@/entities/player";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { GameTypes } from "@/shared/types/game-type";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const useGameResult = () => {
  const gameResult = useAppSelector(selectGameResult);
  const { type: gameType } = useAppSelector(selectGameSettings);
  const playerOne = useAppSelector(selectPlayerOne);
  const playerTwo = useAppSelector(selectPlayerTwo);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (gameResult) {
      setOpen(true);
    }
  }, [gameResult]);

  const t = useTranslations("Game");

  let titleColor: "s" | "e" | "n" = "n";
  if (
    playerOne?.color === gameResult?.winner?.color ||
    (gameType === GameTypes.LOCAL && gameResult?.winner !== null)
  ) {
    titleColor = "s";
  }
  if (
    playerTwo?.color === gameResult?.winner?.color &&
    gameType !== GameTypes.LOCAL
  ) {
    titleColor = "e";
  }

  let title;
  let reason: GameEndReason | undefined = gameResult?.reason;

  if (reason === "draw") {
    title = t("draw");
    reason = undefined;
  }
  if (reason === "stalemate") {
    title = t("stalemate");
    reason = undefined;
  }

  if (gameResult?.winner) {
    if (gameType === GameTypes.LOCAL) {
      console.log(t(gameResult.winner.color));
      title = `${t(gameResult.winner.color)} ${t("win")}!`;
    } else if (gameResult.winner.color === playerOne?.color) {
      title = `${t("victory")}!`;
    } else if (gameResult.winner.color === playerTwo?.color) {
      title = `${t("defeat")}!`;
    }
  }

  return {
    title,
    reason,
    open,
    setOpen,
    gameResult,
    playerOne,
    playerTwo,
    titleColor,
    t,
  };
};
