import { Player } from "@/entities/player";
import { Turn } from "./turn";

export interface GameResult {
  winner: Player | null;
  isDraw: boolean;
  turns: Turn[];
}
