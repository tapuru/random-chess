import { LocalGameBoard } from "@/features/local-game";
import { GameTypes } from "@/shared/types/game-type";

export const GameBoard = ({ gameType }: { gameType: GameTypes }) => {
  switch (gameType) {
    case GameTypes.ONLINE:
      return <div>online game board</div>;
    case GameTypes.ENGINE:
      return <div>engine game board</div>;
    case GameTypes.LOCAL:
      return <LocalGameBoard />;
    default:
      return null;
  }
};
