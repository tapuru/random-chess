import { GameTypes } from "@/shared/types/game-type";
import { OnlineGameTurn } from "@/features/online-game";

export const GameTurn = ({ gameType }: { gameType: GameTypes }) => {
  switch (gameType) {
    case GameTypes.ONLINE:
      return <OnlineGameTurn />;
    case GameTypes.ENGINE:
      return <div>engine turn</div>;
    case GameTypes.LOCAL:
      return <div>local turn</div>;
  }
};
