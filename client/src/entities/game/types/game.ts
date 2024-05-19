import { ChessColors } from "@/shared/types/chess-colors";
import { Turn } from "@/shared/types/turn";

export interface Game {
  turns: Turn[];
  currentTurnColor: ChessColors;
}
