import { GameTypes } from "@/shared/types/game-type";
import { LocalGameResult } from "./local-game-result/local-game-result";
import { OnlineGameResult } from "./online-game-result/online-game-result";

export const GameResult = ({ gameType }: { gameType: GameTypes }) => {
  switch (gameType) {
    case GameTypes.LOCAL:
      return <LocalGameResult />;
    case GameTypes.ENGINE:
      return <LocalGameResult />;
    case GameTypes.ONLINE:
      return <OnlineGameResult />;
    default:
      return null;
  }
};
