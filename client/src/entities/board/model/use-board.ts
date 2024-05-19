import { useEffect, useRef, useState } from "react";
import { Tile } from "./Tile";
import { Board } from "./Board";
import { ChessColors } from "@/shared/types/chess-colors";
import { useOnWindowResize } from "@/shared/lib/hooks/use-on-window-resize";
import { Turn } from "@/shared/types/turn";

export const useBoard = (
  board: Board,
  setBoard: (board: Board) => void,
  currentPlayerColor: ChessColors | null,
  makeTurn: (turn: Turn) => void
) => {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    showAvaliableTiles();
  }, [selectedTile]);

  useOnWindowResize(() => {
    if (boardRef.current) {
      const boardWidth = boardRef.current.clientWidth;
      boardRef.current.style.height = `${boardWidth}px`;
    }
  });

  useEffect(() => {
    if (boardRef.current) {
      const boardWidth = boardRef.current.clientWidth;
      boardRef.current.style.height = `${boardWidth}px`;
    }
  }, [boardRef]);

  const updateBoard = () => {
    const newBoard = board.getClone();
    setBoard(newBoard);
  };

  const showAvaliableTiles = () => {
    board.showAvaliableTiles(selectedTile);
    updateBoard();
  };

  const handleTileClick = (tile: Tile) => {
    if (
      selectedTile &&
      selectedTile !== tile &&
      selectedTile.piece?.canMove(tile)
    ) {
      const piece = selectedTile.piece;
      const captured = !!tile.piece;
      selectedTile.movePiece(tile);
      makeTurn({
        fromPosition: {
          x: selectedTile.x,
          y: selectedTile.y,
          notation: selectedTile.notation,
        },
        toPosition: { x: tile.x, y: tile.y, notation: tile.notation },
        piece: piece.notation,
        captured,
      });
      setSelectedTile(null);
    } else {
      if (tile.piece?.color === currentPlayerColor) {
        setSelectedTile(tile);
      }
    }
  };

  return {
    handleTileClick,
    selectedTile,
    boardRef,
  };
};
