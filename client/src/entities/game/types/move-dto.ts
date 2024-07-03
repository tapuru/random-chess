import { Move } from "chess.js";

export interface MoveDto extends Move {
  timeTaken?: number;
  gameId: string;
}
