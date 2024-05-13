"use client";

import { BoardUI } from "@/entities/board";
import cl from "./local-game-board.module.scss";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { useParams } from "next/navigation";
import { useRouter } from "@/shared/config/navigation";
import { useLocalGameBoard } from "../../model/use-local-game-board";
import { gameActions } from "@/entities/game";

export const LocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const { board, currentGame, setBoard, roomId } = useLocalGameBoard();
  const params = useParams();
  const router = useRouter();

  if (params?.gameId !== roomId) {
    router.push("/error");
  }

  if (!currentGame) {
    return null;
  }

  return (
    <div>
      <BoardUI
        board={board}
        setBoard={setBoard}
        swapPlayer={() => dispatch(gameActions.toggleCurrentTurnColor())}
        currentPlayerColor={currentGame.currentTurnColor}
      />
    </div>
  );
};
