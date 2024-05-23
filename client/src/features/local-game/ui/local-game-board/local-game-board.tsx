"use client";

import cl from "./local-game-board.module.scss";
import { useParams } from "next/navigation";
import { useRouter } from "@/shared/config/navigation";
import { useLocalGameBoard } from "../../../local-game/model/use-local-game-board";
import { AppChessboard } from "@/entities/chess-board";

export const LocalGameBoard = () => {
  const { chess, handleBoardChange, setChess } = useLocalGameBoard();
  const params = useParams();
  const router = useRouter();

  // if (params?.gameId !== roomId) {
  //   router.push("/error");
  // }

  // if (!currentGame) {
  //   return null;
  // }

  return (
    <div className={cl.root}>
      <AppChessboard
        chess={chess}
        onChange={handleBoardChange}
        setChess={setChess}
      />
    </div>
  );
};
