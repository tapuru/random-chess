"use client";

import cl from "./home-board.module.scss";
import { useEffect, useState } from "react";
import { ChessColors } from "@/shared/types/chess-colors";
import { Player } from "@/entities/player";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { PieceNotation } from "@/shared/types/piece-notation";
import { useMediaQuery } from "react-responsive";

export const HomeBoard = () => {
  // const [board, setBoard] = useState(new Board());
  // const [whitePlayer, setWhitePlayer] = useState({ color: ChessColors.WHITE });
  // const [blackPlayer, setBlackPlayer] = useState({ color: ChessColors.BLACK });
  // const [currentPlayer, setCurrentPlayer] = useState<{
  //   color: ChessColors;
  // } | null>(null);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   restart();
  // }, []);

  // function restart() {
  //   const board = new Board();
  //   board.initFromFen();
  //   setBoard(board);
  //   setCurrentPlayer(whitePlayer);
  // }

  // function swapPlayer() {
  //   setCurrentPlayer(
  //     currentPlayer?.color === ChessColors.WHITE ? blackPlayer : whitePlayer
  //   );
  // }

  // return (
  //   <BoardUI
  //     board={board}
  //     setBoard={setBoard}
  //     currentPlayerColor={currentPlayer?.color || null}
  //     makeTurn={swapPlayer}
  //   />
  // );
  return <div className={cl.root}>home board</div>;
};
