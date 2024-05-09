import { ChessColors } from "@/shared/types/chess-colors";
import { Piece } from "./piece/Piece";
import { letterRowAlias } from "../lib/const";
import { Board } from "./Board";
import { isEven } from "@/shared/lib/is-even";

export class Tile {
  readonly color: ChessColors;
  readonly x: number;
  readonly y: number;
  readonly notation: string;
  board: Board;
  isAvaliable: boolean;
  piece: Piece | null;

  constructor(
    board: Board,
    color: ChessColors,
    x: number,
    y: number,
    piece: Piece | null = null
  ) {
    this.board = board;
    this.color = color;
    this.x = x;
    this.y = y;
    this.notation = this.getNotation();
    this.isAvaliable = false;
    piece ? (this.piece = piece) : (this.piece = null);
  }

  public static getColorFromCords(x: number, y: number): ChessColors {
    if (isEven(x) && isEven(y)) return ChessColors.WHITE;
    if (isEven(x) && !isEven(y)) return ChessColors.BLACK;
    if (!isEven(x) && isEven(y)) return ChessColors.BLACK;
    if (!isEven(x) && !isEven(y)) return ChessColors.WHITE;
    return ChessColors.WHITE;
  }

  private getNotation() {
    return `${letterRowAlias[this.y]}${this.x + 1}`;
  }

  public isEmpty() {
    if (this.piece !== null) return false;
    return true;
  }

  public setPiece(piece: Piece) {
    this.piece = piece;
    this.piece.tile = this;
  }

  public movePiece(targetTile: Tile) {
    if (this.piece?.canMove(targetTile)) {
      this.piece.move(targetTile);
      targetTile.setPiece(this.piece);
      this.piece = null;
    }
  }

  public isEmptyVertical(targetTile: Tile): boolean {
    if (this.x !== targetTile.x) {
      return false;
    }

    const min = Math.min(this.y, targetTile.y);
    const max = Math.max(this.y, targetTile.y);

    for (let i = min + 1; i < max; i++) {
      if (!this.board.getTileByCords(this.x, i).isEmpty()) return false;
    }
    return true;
  }

  public isEmptyHorizontal(targetTile: Tile): boolean {
    if (this.y !== targetTile.y) {
      return false;
    }

    const min = Math.min(this.x, targetTile.x);
    const max = Math.max(this.x, targetTile.x);

    for (let i = min + 1; i < max; i++) {
      if (!this.board.getTileByCords(i, this.y).isEmpty()) return false;
    }
    return true;
  }

  public isEmptyDiagonal(targetTile: Tile): boolean {
    const absX = Math.abs(targetTile.x - this.x);
    const absY = Math.abs(targetTile.y - this.y);

    if (absX !== absY) return false;

    const dy = this.y < targetTile.y ? 1 : -1;
    const dx = this.x < targetTile.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (
        !this.board.getTileByCords(this.x + dx * i, this.y + dy * i).isEmpty()
      ) {
        return false;
      }
    }

    return true;
  }
}
