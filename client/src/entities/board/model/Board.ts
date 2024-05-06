import { ChessColors } from "@/shared/types/chess-colors";
import { Tile } from "./Tile";
import { Piece } from "./piece/Piece";
import { PieceNotation } from "@/shared/types/piece-notation";
import { getPieceFromNotation } from "../lib/getPieceFromNotation";

export class Board {
  private width: number;
  private height: number;
  private initialFEN: string;

  public tiles: Tile[][] = [];

  constructor(
    initialFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    width: number = 8,
    height: number = 8
  ) {
    this.width = width;
    this.height = height;
    this.initialFEN = initialFen;
  }

  public initFromFen() {
    const piecePositions = this.initialFEN.split(" ")[0];
    const rows = piecePositions.split("/");
    const res: Tile[][] = [];
    let iteration = 0;
    for (let i = 0; i < rows.length; i++) {
      const rowArray: Tile[] = [];
      for (let j = 0; j < rows[i].length; j++) {
        const emptyTiles = parseInt(rows[i][j]);
        if (emptyTiles) {
          for (let k = 0; k < emptyTiles; k++) {
            const color = iteration % 2 ? ChessColors.BLACK : ChessColors.WHITE;
            rowArray.push(new Tile(color, j + k, i, null));
            iteration++;
          }
        } else {
          //TODO: make fen validation

          const color = iteration % 2 ? ChessColors.BLACK : ChessColors.WHITE;
          const tile = new Tile(color, iteration % 8, i);
          const piece = getPieceFromNotation(rows[i][j] as PieceNotation, tile);
          tile.setPiece(piece);
          rowArray.push(tile);
          iteration++;
        }
      }
      iteration++;
      res.push(rowArray);
    }
    this.tiles = res;
  }

  // public initTiles() {
  //   const res: Tile[][] = [];
  //   for (let i = 0; i < this.width; i++) {
  //     const row: Tile[] = [];
  //     for (let j = 0; j < this.height; j++) {
  //       if ((i + j) % 2 !== 0) {
  //         row.push(new Tile(i, j, ChessColors.BLACK, ));
  //       } else {
  //         row.push(new Tile());
  //       }
  //     }
  //     res.push(row);
  //   }
  //   return res;
  // }
}
