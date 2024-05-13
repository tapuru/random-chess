import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";

export interface GameSettings {
  type: GameTypes;
  initialFen: string | null;
  mode: GameModes;
}
