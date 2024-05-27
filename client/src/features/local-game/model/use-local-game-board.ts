"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { Chess, Move } from "chess.js";
import { gameActions, selectGame, selectGameSettings } from "@/entities/game";
import { selectPlayerOne, selectPlayerTwo } from "@/entities/player";
import { GameStatus } from "@/shared/types/game-status";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const gameSettings = useAppSelector(selectGameSettings);
  const game = useAppSelector(selectGame);
  const [chess, setChess] = useState<Chess>(new Chess());
  const player = useAppSelector(selectPlayerOne);
  const enemy = useAppSelector(selectPlayerTwo);

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
        const winner = [player, enemy].find((p) => p?.color !== color);
        dispatch(
          gameActions.setResult({
            winner,
            moves: game.moves,
            reason: "checkmate",
          })
        );
        dispatch(gameActions.setGameStatus(GameStatus.FINISHED));
      }
      if (chess.isDraw()) {
        dispatch(
          gameActions.setResult({
            reason: "draw",
            moves: game.moves,
          })
        );
      }
      if (chess.isStalemate()) {
        gameActions.setResult({ reason: "draw", moves: game.moves });
      }
    }
  };

  return { handleBoardChange, chess, setChess };
};
