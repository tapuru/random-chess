import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { Chess, Move } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  Piece,
  PromotionPieceOption,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { selectBoard } from "../model/board-slice";
import { useBoard } from "../model/use-board";

// interface AppChessboardProps {
//   position: string;
//   onSquareClick: (square: Square) => void;
//   onPromotionPieceSelect: (
//     piece?: PromotionPieceOption | undefined,
//     promoteFromSquare?: Square | undefined,
//     promoteToSquare?: Square | undefined
//   ) => boolean;

// }

interface AppChessboardProps {
  chess: Chess;
  setChess: (chess: Chess) => void;
  onChange?: (move: Move) => void;
}

export const AppChessboard = ({
  onChange,
  chess,
  setChess,
}: AppChessboardProps) => {
  const { optionSquares, showPromotionDialog, toSquare } =
    useAppSelector(selectBoard);
  const { handlePromotionPieceSelect, handleSquareClick } = useBoard(
    chess,
    setChess,
    onChange
  );

  return (
    <Chessboard
      animationDuration={200}
      arePiecesDraggable={false}
      position={chess.fen()}
      onSquareClick={handleSquareClick}
      customBoardStyle={{
        borderRadius: "var(--border-radius)",
        boxShadow: "0 2px 32px rgba(0, 0, 0, 0.4)",
      }}
      customSquareStyles={{
        ...optionSquares,
      }}
      customDarkSquareStyle={{ backgroundColor: "var(--primary-600)" }}
      customLightSquareStyle={{ backgroundColor: "var(--primary-200)" }}
      promotionToSquare={toSquare}
      showPromotionDialog={showPromotionDialog}
      onPromotionPieceSelect={handlePromotionPieceSelect}
    />
  );
};
