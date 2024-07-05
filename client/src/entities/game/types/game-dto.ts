import { GameTypes } from "@/shared/types/game-type";
import { GameSettings } from "./game-settings";
import { GetProfileDto } from "@/entities/profile/lib/schemas/get-profile-schema";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { Move } from "chess.js";
import { GameEndReason, GameResult } from "./game-result";

export interface GameDto {
  id: string;
  settings: GameSettings;
  ownerId: string;
  initialFen: string;
  type: GameTypes;
  currentTurn: ChessColors;
  currentFen: string;
  status: GameStatus;
  //TODO move that away
  playerWhite: GetProfileDto | null;
  playerBlack: GetProfileDto | null;
  moves: Move[];
  result: {
    reason: GameEndReason;
    winner?: ChessColors;
  };
}
