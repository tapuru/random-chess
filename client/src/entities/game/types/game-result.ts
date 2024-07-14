import { ChessColors } from "@/shared/types/chess-colors";

export enum GameEndReason {
  CHECKMATE = "checkmate",
  WHITE_RESIGNED = "whiteResigned",
  BLACK_RESIGNED = "blackResigned",
  WHITE_OUT_OF_TIME = "whiteOutOfTime",
  BLACK_OUT_OF_TIME = "blackOutOfTime",
  DRAW = "draw",
  STALEMATE = "stalemate",
}

export interface GameResult {
  winner?: ChessColors;
  reason: GameEndReason;
}
