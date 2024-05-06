import { PieceNotation } from "@/shared/types/piece-notation";
import { Tile } from "../Tile";
import { Piece } from "./Piece";
import { ChessColors } from "@/shared/types/chess-colors";
import { StaticImageData } from "next/image";
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
}
