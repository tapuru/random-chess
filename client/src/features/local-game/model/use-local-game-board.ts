"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { Chess, Move } from "chess.js";
import { gameActions, selectGameSettings } from "@/entities/game";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const gameSettings = useAppSelector(selectGameSettings);
  const [chess, setChess] = useState<Chess>(new Chess());

  useEffect(() => {
    start();
  }, []);

  function start() {
    const chess = new Chess(gameSettings.initialFen || undefined);
    setChess(chess);
  }

  const handleBoardChange = (move: Move) => {
    dispatch(gameActions.addMove(move));
    dispatch(gameActions.toggleCurrentTurn());
  };

  return { handleBoardChange, chess, setChess };
};
