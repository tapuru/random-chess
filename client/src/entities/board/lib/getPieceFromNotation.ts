import { PieceNotation } from "@/shared/types/piece-notation";
import { Bishop } from "../model/piece/Bishop";
import { King } from "../model/piece/King";
import { Knight } from "../model/piece/Knight";
import { Pawn } from "../model/piece/Pawn";
import { Queen } from "../model/piece/Queen";
import { Rook } from "../model/piece/Rook";
import { Tile } from "../model/Tile";
import { Piece } from "../model/piece/Piece";

export const getPieceFromNotation = (
  notation: PieceNotation,
  tile: Tile
): Piece => {
  switch (notation) {
    case "P":
      return new Pawn(notation, tile);
    case "p":
      return new Pawn(notation, tile);
    case "K":
      return new King(notation, tile);
    case "k":
      return new King(notation, tile);
    case "Q":
      return new Queen(notation, tile);
    case "q":
      return new Queen(notation, tile);
    case "B":
      return new Bishop(notation, tile);
    case "b":
      return new Bishop(notation, tile);
    case "R":
      return new Rook(notation, tile);
    case "r":
      return new Rook(notation, tile);
    case "N":
      return new Knight(notation, tile);
    case "n":
      return new Knight(notation, tile);
    default:
      return new Pawn(PieceNotation.PAWN_WHITE, tile);
  }
};
