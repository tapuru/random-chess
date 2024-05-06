import cn from "classnames";
import { Tile } from "../../model/Tile";
import cl from "./tile-ui.module.scss";
import { ChessColors } from "@/shared/types/chess-colors";

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
      {tile.piece?.notation}
    </div>
  );
};
