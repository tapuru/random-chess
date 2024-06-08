"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useCallback, useEffect, useState } from "react";
import { Chess, Move } from "chess.js";
import {
  gameActions,
  selectGame,
  selectGameHasRestarted,
  selectGameSettings,
} from "@/entities/game";
import { selectPlayerOne, selectPlayerTwo } from "@/entities/player";
import { GameStatus } from "@/shared/types/game-status";
import { ChessColors } from "@/shared/types/chess-colors";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const [chess, setChess] = useState<Chess>(new Chess());
  const playerOne = useAppSelector(selectPlayerOne);
  const playerTwo = useAppSelector(selectPlayerTwo);
  const gameHasRestarted = useAppSelector(selectGameHasRestarted);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (gameHasRestarted) {
      start();
      dispatch(gameActions.setGameHasRestarted(false));
    }
  }, [gameHasRestarted]);

  useEffect(() => {
    if (!game || game.status === GameStatus.FINISHED) return;
    if (playerOne?.timeLeft === 0) {
      dispatch(
        gameActions.setResult({
          winner: playerTwo,
          moves: game.moves,
          reason:
            playerOne.color === ChessColors.BLACK
              ? "blackOutOfTime"
              : "whiteOutOfTime",
        })
      );
      dispatch(gameActions.setGameStatus(GameStatus.FINISHED));
    }
    if (playerTwo?.timeLeft === 0) {
      dispatch(
        gameActions.setResult({
          winner: playerOne,
          moves: game.moves,
          reason:
            playerTwo.color === ChessColors.BLACK
              ? "blackOutOfTime"
              : "whiteOutOfTime",
        })
      );
      dispatch(gameActions.setGameStatus(GameStatus.FINISHED));
    }
  }, [playerOne, playerTwo]);

  function start() {
    const chess = new Chess(game?.initialFen || undefined);
    setChess(chess);
    dispatch(gameActions.setGameStatus(GameStatus.ACTIVE));
  }

  const handleBoardChange = useCallback(
    (move: Move, chess: Chess) => {
      if (!game) return;
      dispatch(gameActions.addMove(move));
      dispatch(gameActions.toggleCurrentTurn());

      if (chess.isGameOver()) {
        if (chess.isCheckmate()) {
          const color = chess.turn();
          const winner = [playerOne, playerTwo].find((p) => p?.color !== color);
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
    },
    [chess, game, dispatch]
  );

  return {
    handleBoardChange,
    chess,
    setChess,
    disableBoard: !(game?.status === GameStatus.ACTIVE),
  };
};
