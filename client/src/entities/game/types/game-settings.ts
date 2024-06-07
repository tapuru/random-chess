import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";
import { TimeControls } from "@/shared/types/time-controls";

export interface GameSettings {
  type: GameTypes;
  mode: GameModes;
  time: number | null;
  additionTime: number | null;
  timeControl: TimeControls | null;
}
