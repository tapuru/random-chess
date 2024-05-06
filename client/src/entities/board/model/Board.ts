import { ChessColors } from "@/shared/types/chess-colors";
import { Tile } from "./Tile";
import { Piece } from "./Piece";
import { PieceNotation } from "@/shared/types/piece-notation";

export class Board {
  private tile: typeof Tile;
  private width: number;
  private height: number;
  private initialFEN: string;

  public tiles: Tile[][] = [];

  constructor(
    tile: typeof Tile,
    initialFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    width: number = 8,
    height: number = 8
  ) {
    this.width = width;
    this.height = height;
    this.initialFEN = initialFen;
    this.tile = tile;
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

          const piece = Piece.getPieceFromNotation(rows[i][j] as PieceNotation);
          const color = iteration % 2 ? ChessColors.BLACK : ChessColors.WHITE;
          rowArray.push(new Tile(color, iteration % 8, i, piece));
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
