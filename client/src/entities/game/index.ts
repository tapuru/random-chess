export {
  gameReducer,
  gameActions,
  selectGame,
  selectGameSettings,
  selectGameResult,
} from "./model/game-slice";
export type { Game } from "./types/game";
export type { GameSettings } from "./types/game-settings";
export { GameMoves } from "./ui/game-moves/game-moves";
