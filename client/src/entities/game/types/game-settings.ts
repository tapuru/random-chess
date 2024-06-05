import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";

export interface GameSettings {
  type: GameTypes;
  mode: GameModes;
  time: number | null;
  additionTime: number | null;
}
