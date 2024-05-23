import { AppCard } from "@/shared/ui/app-card/app-card";
import cl from "./game-info.module.scss";
import { GameMoves } from "@/entities/game";

export const GameInfo = () => {
  return (
    <AppCard>
      <AppCard.Content>
        <div className={cl.content}>
          <div className={cl.turns}>
            <GameMoves />
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
