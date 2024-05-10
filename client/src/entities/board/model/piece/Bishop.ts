import { PieceNotation } from "@/shared/types/piece-notation";
import { Piece } from "./Piece";
import { Tile } from "../Tile";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=Bishop, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=Bishop, Side=White.png";
import { ChessColors } from "@/shared/types/chess-colors";

export class Bishop extends Piece {
  constructor(
    notation: PieceNotation.BISHOP_BLACK | PieceNotation.BISHOP_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }

  public canMove(targetTile: Tile, countFrendlyOccupied?: boolean): boolean {
    if (!super.canMove(targetTile, countFrendlyOccupied)) return false;
    if (this.tile.isEmptyDiagonal(targetTile)) return true;
    return false;
  }
}
