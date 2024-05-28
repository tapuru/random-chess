export {
  gameReducer,
  gameActions,
  selectGame,
  selectGameSettings,
  selectGameResult,
} from "./model/game-slice";
export type { Game } from "./types/game";
export type { GameSettings } from "./types/game-settings";
export type { GameResult, GameEndReason } from "./types/game-result";
export { GameMoves } from "./ui/game-moves/game-moves";
export { GameInfoLayout } from "./ui/game-info-layout/game-info-layout";
