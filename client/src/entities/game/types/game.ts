import { ChessColors } from "@/shared/types/chess-colors";
import type { Turn } from "./turn";

export interface Game {
  turns: Turn[];
  currentTurnColor: ChessColors;
}
