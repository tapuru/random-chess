import { GameTypes } from "@/shared/types/game-type";
import { GameSettings } from "./game-settings";
import { GetProfileDto } from "@/entities/profile/lib/schemas/get-profile-schema";
import { ChessColors } from "@/shared/types/chess-colors";

export interface GameDto {
  id: string;
  settings: GameSettings;
  ownerId: string;
  initialFen: string;
  type: GameTypes;
  currentTurn: ChessColors;
  //TODO move that away
  playerWhite: GetProfileDto | null;
  playerBlack: GetProfileDto | null;
}
