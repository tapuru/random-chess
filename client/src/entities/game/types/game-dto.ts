import { GameSettings } from "./game-settings";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { Move } from "chess.js";
import { GameResult } from "./game-result";
import { PlayerDto } from "./player-dto";

export interface GameDto {
  id: string;
  settings: GameSettings;
  ownerId: string;
  initialFen: string;
  currentFen: string;
  currentTurn: ChessColors;
  status: GameStatus;
  //TODO move that away
  playerWhite: PlayerDto | null;
  playerBlack: PlayerDto | null;
  moves: Move[];
  result: GameResult;
}
