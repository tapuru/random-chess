"use client";

import cl from "./BoardUI.module.scss";
import { Board } from "../../model/Board";
import { TileUI } from "../tile-ui/tile-ui";
import { useEffect, useState } from "react";
import { Tile } from "../../model/Tile";

interface BoardUIProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardUI = ({ board, setBoard }: BoardUIProps) => {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  useEffect(() => {
    showAvaliableTiles();
  }, [selectedTile]);

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
      setSelectedTile(null);
      return;
    }
    if (tile.piece !== null) {
      setSelectedTile(tile);
    }
  };

  return (
    <div className={cl.root}>
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
