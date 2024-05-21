import { ChessColors } from "@/shared/types/chess-colors";
import { Tile } from "./Tile";
import { PieceNotation } from "@/shared/types/piece-notation";
import { getPieceFromNotation } from "../lib/getPieceFromNotation";
import { Piece } from "./piece/Piece";

export class Board {
  private width: number;
  private height: number;
  private initialFEN: string;
  private whiteCheck: boolean = false;
  private blackCheck: boolean = false;
  public lostBlackPieces: Piece[] = [];
  public lostWhitePieces: Piece[] = [];
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
            const color = Tile.getColorFromCords(iteration % 8, i);
            rowArray.push(new Tile(this, color, j + k, i, null));
            iteration++;
          }
        } else {
          //TODO: make fen validation

          const color = Tile.getColorFromCords(iteration % 8, i);
          const tile = new Tile(this, color, iteration % 8, i);
          const piece = getPieceFromNotation(rows[i][j] as PieceNotation, tile);
          tile.setPiece(piece);
          rowArray.push(tile);
          iteration++;
        }
      }
      res.push(rowArray);
    }
    this.tiles = res;
  }

  public getTileByCords(x: number, y: number) {
    return this.tiles[y][x];
  }

  public showAvaliableTiles(selectedTile: Tile | null) {
    for (let i = 0; i < this.tiles.length; i++) {
      const row = this.tiles[i];
      for (let j = 0; j < row.length; j++) {
        if (
          selectedTile?.piece?.notation.toLowerCase() === "k" &&
          !!selectedTile.piece.canMove(row[j])
        ) {
          if (!row[j].isAttackedByEnemy(selectedTile.piece.color)) {
            row[j].isAvaliable = true;
          }
          continue;
        }

        row[j].isAvaliable = !!selectedTile?.piece?.canMove(row[j]);
      }
    }
  }

  public getAvaliableTiles(selectedTile: Tile | null) {
    const res: Tile[] = [];
    for (let i = 0; i < this.tiles.length; i++) {
      const row = this.tiles[i];
      for (let j = 0; j < row.length; j++) {
        if (
          selectedTile?.piece?.notation.toLowerCase() === "k" &&
          !!selectedTile.piece.canMove(row[j])
        ) {
          if (!row[j].isAttackedByEnemy(selectedTile.piece.color)) {
            res.push(row[j]);
          }
          continue;
        }
        if (!!selectedTile?.piece?.canMove(row[j])) res.push(row[j]);
      }
    }
    return res;
  }

  public getClone() {
    const clone = new Board();
    clone.tiles = this.tiles;
    clone.initialFEN = this.initialFEN;
    clone.lostBlackPieces = this.lostBlackPieces;
    clone.lostWhitePieces = this.lostWhitePieces;
    return clone;
  }

  public addLostPiece(piece: Piece) {
    if (piece.color === ChessColors.BLACK) {
      this.lostBlackPieces.push(piece);
    } else {
      this.lostWhitePieces.push(piece);
    }
  }
}
