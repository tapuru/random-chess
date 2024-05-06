import cn from "classnames";
import { Tile } from "../../model/Tile";
import cl from "./tile-ui.module.scss";
import { ChessColors } from "@/shared/types/chess-colors";
import Image from "next/image";

interface TileUIProps {
  tile: Tile;
}

export const TileUI = ({ tile }: TileUIProps) => {
  return (
    <div
      className={cn([cl.root], {
        [cl.black]: tile.color === ChessColors.BLACK,
        [cl.white]: tile.color === ChessColors.WHITE,
      })}
    >
      {tile.piece && tile.piece.image && (
        <Image
          src={tile.piece.image}
          alt={tile.piece.notation}
          width={50}
          height={50}
        />
      )}
    </div>
  );
};
