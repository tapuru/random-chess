import { ChessColors } from "@/shared/types/chess-colors";
import { GameDto } from "../types/game-dto";

export const getFrendlyPlayerColor = (
  game: GameDto,
  profileId: string
): ChessColors => {
  return game?.playerBlack?.id === profileId
    ? ChessColors.BLACK
    : ChessColors.WHITE;
};
