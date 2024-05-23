export type { Player } from "./types/player";
export type { OnlinePlayer } from "./types/online-player";
export type { EnginePlayer } from "./types/engine-player";
export { PlayerClock } from "./ui/player-clock/player-clock";
export {
  playersReducer,
  playersActions,
  selectEnemy,
  selectPlayer,
} from "./model/players-slice";
