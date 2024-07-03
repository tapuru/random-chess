"use client";

import { selectUser } from "@/entities/auth";
import { AppChessboard } from "@/entities/chess-board";
import { gameApi } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { ChessColors } from "@/shared/types/chess-colors";
import { skipToken } from "@reduxjs/toolkit/query";
import { Chess, Move } from "chess.js";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useOnlineGameBoard } from "../../model/use-online-game-board";

export const OnlineGameBoard = () => {
  const { chess, disableBoard, handleBoardChange, isLoading, setChess } =
    useOnlineGameBoard();

  //TODO: make loader
  if (isLoading) return <div>Loading...</div>;

  return (
    <AppChessboard
      chess={chess}
      setChess={setChess}
      onChange={handleBoardChange}
      disabled={disableBoard}
    />
  );
};
