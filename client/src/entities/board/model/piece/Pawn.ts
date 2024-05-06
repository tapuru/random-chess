import { PieceNotation } from "@/shared/types/piece-notation";
import { Piece } from "./Piece";
import { Tile } from "../Tile";
import { ChessColors } from "@/shared/types/chess-colors";
import { StaticImageData } from "next/image";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=Pawn, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=Pawn, Side=White.png";

export class Pawn extends Piece {
  constructor(
    notation: PieceNotation.PAWN_BLACK | PieceNotation.PAWN_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }
}
