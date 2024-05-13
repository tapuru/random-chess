"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { Board } from "@/entities/board";
import { ChessColors } from "@/shared/types/chess-colors";
import { selectRoomId, selectRoomPlayers } from "./room-slice";
import { gameActions, selectGame, selectGameSettings } from "@/entities/game";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector(selectGame);
  const gameSettings = useAppSelector(selectGameSettings);
  const players = useAppSelector(selectRoomPlayers);
  const roomId = useAppSelector(selectRoomId);
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    start();
  }, []);

  function start() {
    const board = new Board(gameSettings.initialFen || undefined);
    board.initFromFen();
    setBoard(board);
    dispatch(gameActions.setCurrnetTurnColor(ChessColors.WHITE));
  }

  return {
    board,
    setBoard,
    currentGame,
    roomId,
  };
};
