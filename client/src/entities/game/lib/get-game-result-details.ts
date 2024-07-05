import { ChessColors } from "@/shared/types/chess-colors";
import { GameEndReason } from "../types/game-result";
import { GameTypes } from "@/shared/types/game-type";
import {
  Formats,
  MarkupTranslationValues,
  RichTranslationValues,
  TranslationValues,
  useTranslations,
} from "next-intl";
import { getOppositeColor } from "./get-opposite-color";
import { ReactElement, ReactNodeArray } from "react";

interface UseGameResultDetailsArg {
  frendlyPlayerColor: ChessColors;
  gameResult: { reason: GameEndReason; winner?: ChessColors };
  gameType: GameTypes;
  t: {
    <TargetKey extends any>(
      key: TargetKey,
      values?: TranslationValues,
      formats?: Partial<Formats>
    ): string;
    rich<TargetKey extends any>(
      key: TargetKey,
      values?: RichTranslationValues,
      formats?: Partial<Formats>
    ): string | ReactElement | ReactNodeArray;
    markup<TargetKey extends any>(
      key: TargetKey,
      values?: MarkupTranslationValues,
      formats?: Partial<Formats>
    ): string;
    raw<TargetKey extends any>(key: TargetKey): any;
  };
}

export const getGameResultDetails = ({
  frendlyPlayerColor,
  gameResult,
  gameType,
  t,
}: UseGameResultDetailsArg) => {
  let titleColor: "s" | "e" | "n" = "n";
  if (
    frendlyPlayerColor === gameResult.winner ||
    (gameType === GameTypes.LOCAL && !!gameResult.winner)
  ) {
    titleColor = "s";
  }
  if (
    getOppositeColor(frendlyPlayerColor) === gameResult?.winner &&
    gameType !== GameTypes.LOCAL
  ) {
    titleColor = "e";
  }

  let title;
  let reason: GameEndReason | undefined = gameResult.reason;

  if (reason === GameEndReason.DRAW) {
    title = t("draw");
    reason = undefined;
  }
  if (reason === GameEndReason.STALEMATE) {
    title = t("stalemate");
    reason = undefined;
  }

  if (gameResult.winner) {
    if (gameType === GameTypes.LOCAL) {
      title = `${t(gameResult.winner)} ${t("win")}!`;
    } else if (gameResult.winner === frendlyPlayerColor) {
      title = `${t("victory")}!`;
    } else if (gameResult.winner === getOppositeColor(frendlyPlayerColor)) {
      title = `${t("defeat")}!`;
    }
  }

  return {
    title,
    reason,
    titleColor,
  };
};
