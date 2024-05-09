import { isUpperCase } from "@/shared/lib/is-upper-case";
import { ChessColors } from "@/shared/types/chess-colors";
import { PieceNotation } from "@/shared/types/piece-notation";
import { Tile } from "../Tile";
import { StaticImageData } from "next/image";

export class Piece {
  color: ChessColors;
  isCaptured: boolean;
  isActive: boolean;
  notation: PieceNotation;
  id: number;
  tile: Tile;
  image: StaticImageData | null;

  constructor(notation: PieceNotation, tile: Tile) {
    this.isCaptured = false;
    this.isActive = false;
    this.notation = notation;
    this.color = this.getColorFromNotation(notation);
    this.id = Math.random();
    this.tile = tile;
    this.image = null;
  }

  private getColorFromNotation(notation: PieceNotation): ChessColors {
    return isUpperCase(notation) ? ChessColors.WHITE : ChessColors.BLACK;
  }

  public canMove(targetTile: Tile): boolean {
    if (targetTile.piece?.color === this.color) return false;
    if (
      targetTile.piece?.notation === PieceNotation.KING_BLACK ||
      targetTile.piece?.notation === PieceNotation.KING_WHITE
    )
      return false;
    return true;
  }

  public move(targetTile: Tile) {}
}
