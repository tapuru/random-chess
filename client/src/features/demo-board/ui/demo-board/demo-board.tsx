"use client";

import { AppChessboard } from "@/entities/chess-board";
import { safeGameMutate } from "@/entities/chess-board/lib/safe-game-mutate";
import { getRandomArrayIndex } from "@/shared/lib/get-random-array-index";
import { sleep } from "@/shared/lib/sleep";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export const DemoBoard = () => {
  const [chess, setChess] = useState(new Chess());

  const makeRandomMove = () => {
    const moves = chess.moves();
    safeGameMutate(chess, setChess, (copy) => {
      const randomMove = getRandomArrayIndex(moves);
      copy.move(moves[randomMove]);
    });
  };

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
