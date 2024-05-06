"use client";

import cl from "./BoardUI.module.scss";
import { Board } from "../../model/Board";
import { Tile } from "../../model/Tile";
import { TileUI } from "../tile-ui/tile-ui";

interface BoardUIProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardUI = ({ board, setBoard }: BoardUIProps) => {
  return (
    <div className={cl.root}>
      {board.tiles.map((row, index) => (
        <div className={cl.row} key={index}>
          {row.map((tile) => (
            <TileUI tile={tile} key={tile.notation} />
          ))}
        </div>
      ))}
    </div>
  );
};
