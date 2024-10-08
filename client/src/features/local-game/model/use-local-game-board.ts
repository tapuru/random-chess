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
import {
  playersActions,
  selectPlayerOne,
  selectPlayerTwo,
} from "@/entities/player";
import { GameStatus } from "@/shared/types/game-status";
import { ChessColors } from "@/shared/types/chess-colors";

export const useLocalGameBoard = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const [chess, setChess] = useState<Chess>(new Chess());
  const playerOne = useAppSelector(selectPlayerOne);
  const playerTwo = useAppSelector(selectPlayerTwo);
  const gameHasRestarted = useAppSelector(selectGameHasRestarted);
  const gameSettions = useAppSelector(selectGameSettings);
  const currentPlayer = [playerOne, playerTwo].find(
    (p) => p?.color === game?.currentTurn
  );

  useEffect(() => {
    // bord will show current position if a page is reloaded
    let persistedPosition: string | undefined;
    if (game?.currentPosition) {
      persistedPosition = game.currentPosition;
    }
    start(persistedPosition);
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

  function start(persistedPosition?: string) {
    const chess = new Chess(persistedPosition || game?.initialFen || undefined);
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

      if (gameSettions.additionTime && gameSettions.time) {
        dispatch(
          playersActions.changePlayerTime({
            color: game.currentTurn,
            time: gameSettions.additionTime,
            maxTime: gameSettions.time,
          })
        );
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
