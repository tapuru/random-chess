import { Player } from "@/entities/player";
import { Move } from "chess.js";

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
  winner?: Player | null;
  moves: Move[];
  reason: GameEndReason;
}
