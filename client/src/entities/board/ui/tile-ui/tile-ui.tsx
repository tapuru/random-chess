"use client";

import cn from "classnames";
import { Tile } from "../../model/Tile";
import cl from "./tile-ui.module.scss";
import { ChessColors } from "@/shared/types/chess-colors";
import Image from "next/image";

interface TileUIProps {
  tile: Tile;
  selected: boolean;
  onClick: (tile: Tile) => void;
}

export const TileUI = ({ tile, selected, onClick }: TileUIProps) => {
  return (
    <div
      className={cn([cl.root], {
        [cl.black]: tile.color === ChessColors.BLACK,
        [cl.white]: tile.color === ChessColors.WHITE,
        [cl.selected]: selected,
        [cl.avaliable]: tile.isAvaliable && tile.piece !== null,
      })}
      onClick={() => onClick(tile)}
    >
      {tile.piece && tile.piece.image && (
        <Image
          src={tile.piece.image}
          alt={tile.piece.notation}
          width={50}
          height={50}
        />
      )}
      {!tile.piece && tile.isAvaliable && (
        <div className={cl.avaliableDot}></div>
      )}
    </div>
  );
};
