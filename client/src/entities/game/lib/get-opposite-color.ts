import { ChessColors } from "@/shared/types/chess-colors";

export const getOppositeColor = (color: ChessColors): ChessColors => {
  return color === ChessColors.BLACK ? ChessColors.WHITE : ChessColors.BLACK;
};
