"use client";

import cl from "./local-game-board.module.scss";
import { BoardUI } from "@/entities/board";
import { useParams } from "next/navigation";
import { useRouter } from "@/shared/config/navigation";
import { useLocalGameBoard } from "../../model/use-local-game-board";

export const LocalGameBoard = () => {
  const { board, currentGame, setBoard, roomId, makeTurn } =
    useLocalGameBoard();
  const params = useParams();
  const router = useRouter();

  if (params?.gameId !== roomId) {
    router.push("/error");
  }

  if (!currentGame) {
    return null;
  }

  return (
    <div className={cl.root}>
      <BoardUI
        board={board}
        setBoard={setBoard}
        makeTurn={makeTurn}
        currentPlayerColor={currentGame.currentTurnColor}
      />
    </div>
  );
};
