import { AppButton } from "@/shared/ui/app-button/app-button";
import cl from "./local-resign-button.module.scss";
import { FaRegFlag } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { gameActions, selectGame } from "@/entities/game";
import { GameStatus } from "@/shared/types/game-status";
import { selectPlayerOne, selectPlayerTwo } from "@/entities/player";
import { ChessColors } from "@/shared/types/chess-colors";

export const LocalResignButton = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const playerOne = useAppSelector(selectPlayerOne);
  const playerTwo = useAppSelector(selectPlayerTwo);

  const currentPlayer = [playerOne, playerTwo].find(
    (p) => p?.color === game?.currentTurn
  );
  const winner = [playerOne, playerTwo].find(
    (p) => p?.color !== currentPlayer?.color
  );

  if (!game) return null;

  const handleClick = () => {
    dispatch(gameActions.setGameStatus(GameStatus.FINISHED));
    dispatch(
      gameActions.setResult({
        moves: game.moves,
        reason:
          currentPlayer?.color === ChessColors.BLACK
            ? "blackResigned"
            : "whiteResigned",
        winner,
      })
    );
  };

  return (
    <AppButton
      className={cl.root}
      icon={<FaRegFlag />}
      size="sm"
      variant="filled"
      color="secondary"
      onClick={handleClick}
    />
  );
};
