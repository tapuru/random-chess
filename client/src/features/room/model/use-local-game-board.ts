"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectCurrentGame, setCurrnetTurn } from "./room-slice";
import { useEffect, useState } from "react";
import { Board } from "@/entities/board";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ChessColors } from "@/shared/types/chess-colors";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector(selectCurrentGame);
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    start();
  }, []);

  function start() {
    const board = new Board(currentGame.initialFen || undefined);
    board.initFromFen();
    setBoard(board);
    dispatch(setCurrnetTurn(ChessColors.WHITE));
  }

  return {
    board,
    setBoard,
    currentGame,
  };
};
