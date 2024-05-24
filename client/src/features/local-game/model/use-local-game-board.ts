"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { Chess, Move } from "chess.js";
import { gameActions, selectGame, selectGameSettings } from "@/entities/game";
import { selectEnemy, selectPlayer } from "@/entities/player";
import { GameStatus } from "@/shared/types/game-status";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const gameSettings = useAppSelector(selectGameSettings);
  const game = useAppSelector(selectGame);
  const [chess, setChess] = useState<Chess>(new Chess());
  const player = useAppSelector(selectPlayer);
  const enemy = useAppSelector(selectEnemy);

  useEffect(() => {
    start();
  }, []);

  function start() {
    const chess = new Chess(gameSettings.initialFen || undefined);
    setChess(chess);
  }

  const handleBoardChange = (move: Move, chess: Chess) => {
    if (!game) return;
    dispatch(gameActions.addMove(move));
    dispatch(gameActions.toggleCurrentTurn());

    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        const color = chess.turn();
        const winner = [player, enemy].find((p) => p?.color === color);
        dispatch(
          gameActions.setResult({ isDraw: false, winner, moves: game.moves })
        );
        dispatch(gameActions.setGameStatus(GameStatus.FINISHED));
      }
    }
  };

  return { handleBoardChange, chess, setChess };
};
