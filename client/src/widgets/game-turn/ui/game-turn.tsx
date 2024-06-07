"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./game-turn.module.scss";
import { useTranslations } from "next-intl";
import {
  selectGame,
  selectGameResult,
  selectGameSettings,
} from "@/entities/game";
import { selectPlayerOne } from "@/entities/player";
import { GameTypes } from "@/shared/types/game-type";
import { ChessColors } from "@/shared/types/chess-colors";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const GameTurn = () => {
  const game = useAppSelector(selectGame);
  const gameSettings = useAppSelector(selectGameSettings);
  const gameResult = useAppSelector(selectGameResult);
  const playerOne = useAppSelector(selectPlayerOne);
  const t = useTranslations("Game");

  if (gameResult) {
    return (
      <div className={cl.root}>
        <div className={cl.buttons}>
          <AppButton size={"sm"} color="secondary">
            {t("rematch")}
          </AppButton>
          <AppButton size={"sm"} color="primary">
            {t("leave")}
          </AppButton>
        </div>
      </div>
    );
  }

  if (gameSettings.type === GameTypes.LOCAL) {
    return (
      <div className={cl.root}>
        <p>
          {game?.currentTurn === ChessColors.WHITE
            ? t("whiteTurn")
            : t("blackTurn")}
        </p>
      </div>
    );
  }

  return (
    <div className={cl.root}>
      <p>
        {playerOne?.color === game?.currentTurn
          ? t("yourTurn")
          : t("waitingOpponent")}
      </p>
    </div>
  );
};
