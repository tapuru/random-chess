"use client";

import { AppChessboard } from "@/entities/chess-board";
import { useOnlineGameBoard } from "../../model/use-online-game-board";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";

export const OnlineGameBoard = () => {
  const { chess, disableBoard, handleBoardChange, isLoading, setChess } =
    useOnlineGameBoard();

  if (isLoading) return <AppLoader />;

  return (
    <AppChessboard
      chess={chess}
      setChess={setChess}
      onChange={handleBoardChange}
      disabled={disableBoard}
    />
  );
};
