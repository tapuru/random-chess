"use client";

import { AppChessboard } from "@/entities/chess-board";
import { safeGameMutate } from "@/entities/chess-board/lib/safe-game-mutate";
import { GameModesService, pickRandomMode } from "@/entities/game-modes";
import { getRandomArrayIndex } from "@/shared/lib/get-random-array-index";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export const DemoBoard = () => {
  const [chess, setChess] = useState<Chess>(new Chess());

  const makeRandomMove = () => {
    const moves = chess.moves();
    safeGameMutate(chess, setChess, (copy) => {
      const randomMove = getRandomArrayIndex(moves);
      copy.move(moves[randomMove]);
    });
  };

  useEffect(() => {
    const gameModesService = new GameModesService();
    const mode = pickRandomMode({
      classical: false,
    });
    console.log(mode);
    const fen = gameModesService.generateInitialFen(mode);
    setChess(new Chess(fen));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      makeRandomMove();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [chess]);

  return <AppChessboard chess={chess} setChess={setChess} disabled />;
};
