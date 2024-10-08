import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { Move } from "chess.js";

export interface Game {
  moves: Move[];
  currentTurn: ChessColors;
  status: GameStatus;
  initialFen: string | null;
  currentPosition?: string;
}
