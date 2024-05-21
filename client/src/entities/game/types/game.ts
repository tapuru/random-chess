import { ChessColors } from "@/shared/types/chess-colors";
import { Turn } from "@/shared/types/turn";
import { Move } from "chess.js";

export interface Game {
  moves: Move[];
  currentTurnColor: ChessColors;
}
