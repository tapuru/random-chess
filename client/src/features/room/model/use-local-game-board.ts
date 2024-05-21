"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { Board } from "@/entities/board";
import { ChessColors } from "@/shared/types/chess-colors";
import { selectRoomId, selectRoomPlayers } from "./room-slice";
import { gameActions, selectGame, selectGameSettings } from "@/entities/game";
import { Turn } from "@/shared/types/turn";

import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { Chess, Move } from "chess.js";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector(selectGame);
  const gameSettings = useAppSelector(selectGameSettings);
  const players = useAppSelector(selectRoomPlayers);
  const roomId = useAppSelector(selectRoomId);
  const [chess, setChess] = useState<Chess>(new Chess());

  useEffect(() => {
    start();
  }, []);

  function start() {
    const chess = new Chess(gameSettings.initialFen || undefined);
    setChess(chess);
  }

  const makeAMove = (move: { from: Square; to: Square; promotion: string }) => {
    const clone = new Chess(chess.fen());
    clone.history = chess.history;
    const res = clone.move(move);
    setChess(clone);
    return res;
  };

  const handlePieceDrop = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) => {
    const move: Move | null = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "",
    });

    if (move === null) return false;

    dispatch(gameActions.makeTurn(move));
    dispatch(gameActions.toggleCurrentTurnColor());
    console.log(move);

    return true;
  };

  // const makeTurn = (turn: Turn) => {
  //   dispatch(gameActions.makeTurn(turn));
  //   dispatch(gameActions.toggleCurrentTurnColor());
  // };

  return {
    chess,
    currentGame,
    roomId,
    handlePieceDrop,
  };
};
