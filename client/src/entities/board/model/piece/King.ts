import { PieceNotation } from "@/shared/types/piece-notation";
import { Piece } from "./Piece";
import { Tile } from "../Tile";
import { StaticImageData } from "next/image";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=King, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=King, Side=White.png";
import { ChessColors } from "@/shared/types/chess-colors";

export class King extends Piece {
  constructor(
    notation: PieceNotation.KING_BLACK | PieceNotation.KING_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }

  public canMove(targetTile: Tile, countFrendlyOccupied?: boolean): boolean {
    if (!super.canMove(targetTile, countFrendlyOccupied)) return false;
    const dx = Math.abs(this.tile.x - targetTile.x);
    const dy = Math.abs(this.tile.y - targetTile.y);

    if (
      (dx === 1 && dy === 1) ||
      (dx === 1 && dy === 0) ||
      (dy === 1 && dx === 0)
    ) {
      return true;
    }

    return false;
  }
}
