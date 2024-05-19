import { GameTurns } from "@/entities/game/ui/game-turns/game-turns";
import { AppCard } from "@/shared/ui/app-card/app-card";
import cl from "./game-info.module.scss";

export const GameInfo = () => {
  return (
    <AppCard>
      <AppCard.Content>
        <div className={cl.content}>
          <div className={cl.turns}>
            <GameTurns />
          </div>
          <div className={cl.actions}>
            {/*<GameActions />*/}
            {/*<CurrentTurn />*/}
          </div>
        </div>
      </AppCard.Content>
    </AppCard>
  );
};
