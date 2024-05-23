import { ChessColors } from "@/shared/types/chess-colors";

export interface Player {
  color: ChessColors;
  isWinner: boolean;
  wins: number;
  loses: number;
  timeLeft: number | null;
  type: "online" | "engine" | "basic";
}
