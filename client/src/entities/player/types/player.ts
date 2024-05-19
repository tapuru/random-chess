import { ChessColors } from "@/shared/types/chess-colors";

export interface Player {
  ownerId: number;
  color: ChessColors;
  isWinner: boolean;
  wins: number;
  loses: number;
  isRoomOwner: boolean;
  timeLeft: number | null;
}
