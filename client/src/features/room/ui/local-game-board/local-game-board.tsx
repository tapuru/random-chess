"use client";

import cl from "./local-game-board.module.scss";
import { useParams } from "next/navigation";
import { useRouter } from "@/shared/config/navigation";
import { useLocalGameBoard } from "../../model/use-local-game-board";
import { Chessboard } from "react-chessboard";

export const LocalGameBoard = () => {
  const { currentGame, roomId, chess, handlePieceDrop } = useLocalGameBoard();
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
      <Chessboard
        id={"basicboard"}
        position={chess?.fen()}
        onPieceDrop={handlePieceDrop}
      />
    </div>
  );
};
