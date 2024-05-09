import { PieceNotation } from "@/shared/types/piece-notation";
import { Piece } from "./Piece";
import { Tile } from "../Tile";
import { ChessColors } from "@/shared/types/chess-colors";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=Rook, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=Rook, Side=White.png";

export class Rook extends Piece {
  constructor(
    notation: PieceNotation.ROOK_BLACK | PieceNotation.ROOK_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }

  public canMove(targetTile: Tile): boolean {
    if (!super.canMove(targetTile)) return false;
    if (
      this.tile.isEmptyVertical(targetTile) ||
      this.tile.isEmptyHorizontal(targetTile)
    ) {
      return true;
    }
    return false;
  }
}
