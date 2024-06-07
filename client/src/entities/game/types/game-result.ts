import { Player } from "@/entities/player";
import { Move } from "chess.js";

export type GameEndReason =
  | "checkmate"
  | "whiteSurrendered"
  | "blackSurrendered"
  | "whiteOutOfTime"
  | "blackOutOfTime"
  | "draw"
  | "stalemate";

export interface GameResult {
  winner?: Player | null;
  moves: Move[];
  reason: GameEndReason;
}
