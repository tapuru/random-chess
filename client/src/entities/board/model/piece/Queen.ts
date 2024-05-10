import { PieceNotation } from "@/shared/types/piece-notation";
import { Tile } from "../Tile";
import { Piece } from "./Piece";
import { ChessColors } from "@/shared/types/chess-colors";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=Queen, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=Queen, Side=White.png";

export class Queen extends Piece {
  constructor(
    notation: PieceNotation.QUEEN_BLACK | PieceNotation.QUEEN_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }

  public canMove(targetTile: Tile, countFrendlyOccupied?: boolean): boolean {
    if (!super.canMove(targetTile, countFrendlyOccupied)) return false;
    if (
      this.tile.isEmptyVertical(targetTile) ||
      this.tile.isEmptyHorizontal(targetTile) ||
      this.tile.isEmptyDiagonal(targetTile)
    ) {
      return true;
    }
    return false;
  }
}
