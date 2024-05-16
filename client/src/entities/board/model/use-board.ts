import { useEffect, useRef, useState } from "react";
import { Tile } from "./Tile";
import { Board } from "./Board";
import { ChessColors } from "@/shared/types/chess-colors";
import { useOnWindowResize } from "@/shared/lib/hooks/use-on-window-resize";

export const useBoard = (
  board: Board,
  setBoard: (board: Board) => void,
  currentPlayerColor: ChessColors | null,
  swapPlayer: () => void
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
      selectedTile.movePiece(tile);
      swapPlayer();
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
