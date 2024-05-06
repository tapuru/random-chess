import { ChessColors } from "@/shared/types/chess-colors";
import { Piece } from "./Piece";
import { letterRowAlias } from "../lib/notation-alias";

export class Tile {
  readonly color: ChessColors;
  readonly x: number;
  readonly y: number;
  notation: string;
  isAvaliable: boolean;
  piece: Piece | null;

  constructor(color: ChessColors, x: number, y: number, piece: Piece | null) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.notation = this.getNotation();
    this.isAvaliable = false;
    piece ? (this.piece = piece) : (this.piece = null);
  }

  getNotation() {
    return `${letterRowAlias[this.y]}${this.x + 1}`;
  }
}
