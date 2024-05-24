import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { Chess, Move } from "chess.js";
import { useRef, useState } from "react";
import { Chessboard, ClearPremoves } from "react-chessboard";
import { selectBoard } from "../model/board-slice";
import { useBoard } from "../model/use-board";

interface AppChessboardProps {
  chess: Chess;
  setChess: (chess: Chess) => void;
  onChange?: (move: Move, chess: Chess) => void;
}

export const AppChessboard = ({
  onChange,
  chess,
  setChess,
}: AppChessboardProps) => {
  const { optionSquares, showPromotionDialog, toSquare } =
    useAppSelector(selectBoard);
  const { handlePromotionPieceSelect, handleSquareClick, onDrop } = useBoard(
    chess,
    setChess,
    onChange
  );
  const chessboardRef = useRef<ClearPremoves>(null);

  return (
    <Chessboard
      animationDuration={200}
      arePiecesDraggable={true}
      position={chess.fen()}
      onSquareClick={handleSquareClick}
      customBoardStyle={{
        borderRadius: "var(--border-radius)",
        boxShadow: "0 2px 32px rgba(0, 0, 0, 0.4)",
      }}
      customSquareStyles={{
        ...optionSquares,
      }}
      customDarkSquareStyle={{ backgroundColor: "var(--primary-500)" }}
      customLightSquareStyle={{ backgroundColor: "var(--primary-200)" }}
      promotionToSquare={toSquare}
      showPromotionDialog={showPromotionDialog}
      onPromotionPieceSelect={handlePromotionPieceSelect}
      arePremovesAllowed={true}
      ref={chessboardRef}
      onPieceDrop={onDrop}
    />
  );
};
