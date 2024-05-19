"use client";

import { Board, BoardUI } from "@/entities/board";
import cl from "./home-board.module.scss";
import { useEffect, useState } from "react";
import { ChessColors } from "@/shared/types/chess-colors";
import { Player } from "@/entities/player";
import { LostPieces } from "@/entities/board/ui/lost-pieces/lost-pieces";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { Pawn } from "@/entities/board/model/piece/Pawn";
import { getPieceFromNotation } from "@/entities/board/lib/getPieceFromNotation";
import { PieceNotation } from "@/shared/types/piece-notation";

export const HomeBoard = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState({ color: ChessColors.WHITE });
  const [blackPlayer, setBlackPlayer] = useState({ color: ChessColors.BLACK });
  const [currentPlayer, setCurrentPlayer] = useState<{
    color: ChessColors;
  } | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const board = new Board();
    board.initFromFen();
    setBoard(board);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === ChessColors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className={cl.root}>
      <LostPieces pieces={board.lostBlackPieces} title="lost black pieces" />
      <BoardUI
        board={board}
        setBoard={setBoard}
        currentPlayerColor={currentPlayer?.color || null}
        swapPlayer={swapPlayer}
      />
      <LostPieces pieces={board.lostWhitePieces} title="lost white pieces" />
    </div>
  );
};
