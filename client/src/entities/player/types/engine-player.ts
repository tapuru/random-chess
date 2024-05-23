import { Player } from "./player";

export interface EnginePlayer extends Player {
  level: number;
  type: "engine";
}
