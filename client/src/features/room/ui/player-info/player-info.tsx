import { Player } from "@/entities/player";
import cl from "./player-info.module.scss";
import { PlayerClock } from "@/entities/player/ui/player-clock/player-clock";

export const PlayerInfo = ({ player }: { player: Player }) => {
  return (
    <div className={cl.root}>
      <div className={cl.profilePlaceholder}>{player.ownerId}</div>
      <div className={cl.clock}>
        <PlayerClock player={player} />
      </div>
    </div>
  );
};
