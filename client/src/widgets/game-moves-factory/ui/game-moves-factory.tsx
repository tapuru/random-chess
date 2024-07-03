import { OnlineGameMoves } from "@/features/online-game";
import { GameTypes } from "@/shared/types/game-type";

export const GameMovesFactory = ({ gameType }: { gameType: GameTypes }) => {
  switch (gameType) {
    case GameTypes.ENGINE:
      return <div>engine moves</div>;
    case GameTypes.LOCAL:
      return <div>local moves</div>;
    case GameTypes.ONLINE:
      return <OnlineGameMoves />;
    default:
      return null;
  }
};
