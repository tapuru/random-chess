import { PieceNotation } from "@/shared/types/piece-notation";
import { Piece } from "./Piece";
import { Tile } from "../Tile";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=Knight, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=Knight, Side=White.png";
import { ChessColors } from "@/shared/types/chess-colors";

export class Knight extends Piece {
  constructor(
    notation: PieceNotation.KNIGHT_BLACK | PieceNotation.KNIGHT_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }

  public canMove(targetTile: Tile): boolean {
    if (!super.canMove(targetTile)) return false;

    return true;
  }
}
