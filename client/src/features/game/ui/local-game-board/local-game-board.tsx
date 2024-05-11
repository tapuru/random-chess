"use client";

import { BoardUI } from "@/entities/board";
import cl from "./local-game-board.module.scss";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { toggleCurrentTurn } from "../../model/game-slice";
import { useParams } from "next/navigation";
import { useRouter } from "@/shared/config/navigation";
import { useLocalGameBoard } from "../../model/use-local-game-board";

export const LocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const { board, currentGame, setBoard } = useLocalGameBoard();
  const params = useParams();
  const router = useRouter();

  if (params?.gameId !== currentGame.id) {
    router.push("/error");
  }

  return (
    <div>
      <BoardUI
        board={board}
        setBoard={setBoard}
        swapPlayer={() => dispatch(toggleCurrentTurn())}
        currentPlayerColor={currentGame.currentTurn}
      />
    </div>
  );
};
