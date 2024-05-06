"use client";

import { Board, BoardUI } from "@/entities/board";
import cl from "./home-board.module.scss";
import { useEffect, useState } from "react";

export const HomeBoard = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    const board = new Board();
    board.initFromFen();
    setBoard(board);
  }, []);

  return (
    <div className={cl.root}>
      <BoardUI board={board} setBoard={setBoard} />
    </div>
  );
};
