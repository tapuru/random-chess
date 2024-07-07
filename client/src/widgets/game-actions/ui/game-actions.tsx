import { GameTypes } from "@/shared/types/game-type";
import { GameActionsLayout } from "./game-actions-layout/game-actions-layout";
import { OnlineGameResignButton } from "@/features/online-game";

export const GameActions = ({ gameType }: { gameType: GameTypes }) => {
  switch (gameType) {
    case GameTypes.ONLINE:
      return (
        <GameActionsLayout
          actions={
            <>
              <OnlineGameResignButton />
            </>
          }
        />
      );
  }
};
