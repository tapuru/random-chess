import { Player } from "@/entities/player";
import { Move } from "chess.js";

export interface GameResult {
  winner?: Player | null;
  isDraw: boolean;
  moves: Move[];
}
