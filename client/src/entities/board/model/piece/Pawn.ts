import { PieceNotation } from "@/shared/types/piece-notation";
import { Piece } from "./Piece";
import { Tile } from "../Tile";
import { ChessColors } from "@/shared/types/chess-colors";
import { StaticImageData } from "next/image";
import imageBlack from "@/shared/assets/images/pieces-1/Piece=Pawn, Side=Black.png";
import imageWhite from "@/shared/assets/images/pieces-1/Piece=Pawn, Side=White.png";

export class Pawn extends Piece {
  hasMoved: boolean = false;

  constructor(
    notation: PieceNotation.PAWN_BLACK | PieceNotation.PAWN_WHITE,
    tile: Tile
  ) {
    super(notation, tile);
    this.image = this.color === ChessColors.BLACK ? imageBlack : imageWhite;
  }

  public canMove(targetTile: Tile, countFrendlyOccupied?: boolean): boolean {
    if (!super.canMove(targetTile, countFrendlyOccupied)) return false;

    const direction = this.color === ChessColors.BLACK ? 1 : -1;
    const firstStepDirection = this.color === ChessColors.BLACK ? 2 : -2;

    if (
      (targetTile.y === this.tile.y + direction ||
        (!this.hasMoved &&
          targetTile.y === this.tile.y + firstStepDirection)) &&
      targetTile.x === this.tile.x &&
      this.tile.board.getTileByCords(targetTile.x, targetTile.y).isEmpty() &&
      this.tile.board
        .getTileByCords(this.tile.x, this.tile.y + direction)
        .isEmpty()
    ) {
      return true;
    }

    if (this.canAttack(targetTile) && this.tile.isEnemy(targetTile)) {
      return true;
    }
    return false;
  }

  public canAttack(targetTile: Tile) {
    const direction = this.color === ChessColors.BLACK ? 1 : -1;
    return (
      targetTile.y === this.tile.y + direction &&
      (targetTile.x === this.tile.x + 1 || targetTile.x === this.tile.x - 1)
    );
  }

  public move(targetTile: Tile): void {
    super.move(targetTile);
    this.hasMoved = true;
  }
}
