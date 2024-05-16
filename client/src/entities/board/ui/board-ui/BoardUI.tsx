"use client";

import cl from "./BoardUI.module.scss";
import { Board } from "../../model/Board";
import { TileUI } from "../tile-ui/tile-ui";
import { ChessColors } from "@/shared/types/chess-colors";
import { useBoard } from "../../model/use-board";

interface BoardUIProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayerColor: ChessColors | null;
  swapPlayer: () => void;
}

export const BoardUI = ({
  board,
  setBoard,
  currentPlayerColor,
  swapPlayer,
}: BoardUIProps) => {
  const { handleTileClick, boardRef, selectedTile } = useBoard(
    board,
    setBoard,
    currentPlayerColor,
    swapPlayer
  );

  return (
    <div className={cl.root} ref={boardRef}>
      {board.tiles.map((row, index) => (
        <div className={cl.row} key={index}>
          {row.map((tile) => (
            <TileUI
              tile={tile}
              key={tile.notation}
              selected={selectedTile?.notation === tile.notation}
              onClick={handleTileClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
