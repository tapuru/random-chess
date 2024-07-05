export type { Player } from "./types/player";
export type { OnlinePlayer } from "./types/online-player";
export type { EnginePlayer } from "./types/engine-player";
export { PlayerTimer } from "./ui/player-timer/player-timer";
export { PlayerInfoLayout } from "./ui/player-info-layout/player-info-layout";
export {
  playersReducer,
  playersActions,
  selectPlayerOne,
  selectPlayerTwo,
} from "./model/players-slice";
