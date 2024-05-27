import {
  GameEndReason,
  selectGameResult,
  selectGameSettings,
} from "@/entities/game";
import { selectEnemy, selectPlayer } from "@/entities/player";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { GameTypes } from "@/shared/types/game-type";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const useGameResult = () => {
  const gameResult = useAppSelector(selectGameResult);
  const { type: gameType } = useAppSelector(selectGameSettings);
  const player = useAppSelector(selectPlayer);
  const enemy = useAppSelector(selectEnemy);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (gameResult) {
      setOpen(true);
    }
  }, [gameResult]);

  const t = useTranslations("Game");

  let titleColor: "s" | "e" | "n" = "n";
  if (player?.color === gameResult?.winner?.color) {
    titleColor = "s";
  }
  if (
    enemy?.color === gameResult?.winner?.color &&
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
      title = `${t(gameResult.winner.color)} ${t("win")}!`;
    }
    if (gameResult.winner.color === player?.color) {
      title = `${t("victory")}!`;
    }
    if (gameResult.winner.color === enemy?.color) {
      title = `${t("victory")}!`;
    }
  }

  return {
    title,
    reason,
    open,
    setOpen,
    gameResult,
    player,
    enemy,
    titleColor,
    t,
  };
};
