import { ChessColors } from "@/shared/types/chess-colors";
import { GameEndReason } from "../../types/game-result";
import cl from "./game-turn-ui.module.scss";
import React from "react";
import { GameTypes } from "@/shared/types/game-type";
import { useTranslations } from "next-intl";
import { AppText } from "@/shared/ui/app-text/app-text";

interface GameTurnUIProps {
  currentTurn: ChessColors;
  //TODO: make game result type
  result?: { winner?: ChessColors; reason: GameEndReason };
  resultContent: React.ReactNode;
  gameType: GameTypes;
  frendlyPlayerColor: ChessColors;
}

export const GameTurnUI = ({
  currentTurn,
  result,
  resultContent,
  gameType,
  frendlyPlayerColor,
}: GameTurnUIProps) => {
  const t = useTranslations("Game");

  if (result) {
    return (
      <div className={cl.root}>
        <div className={cl.buttons}>{resultContent}</div>
      </div>
    );
  }

  if (gameType === GameTypes.LOCAL) {
    return (
      <div className={cl.root}>
        <AppText tag="p" align="center">
          {currentTurn === ChessColors.WHITE ? t("whiteTurn") : t("blackTurn")}
        </AppText>
      </div>
    );
  }

  return (
    <div className={cl.root}>
      <AppText tag="p" align="center">
        {frendlyPlayerColor === currentTurn ? t("yourTurn") : t("waitOpponent")}
      </AppText>
    </div>
  );
};
