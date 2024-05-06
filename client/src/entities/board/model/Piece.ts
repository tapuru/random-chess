import { isUpperCase } from "@/shared/lib/isUpperCase";
import { ChessColors } from "@/shared/types/chess-colors";
import { PieceNotation } from "@/shared/types/piece-notation";

export class Piece {
  color: ChessColors;
  isCaptured: boolean;
  isActive: boolean;
  notation: PieceNotation;

  constructor(notation: PieceNotation) {
    this.isCaptured = false;
    this.isActive = false;
    this.notation = notation;
    this.color = this.getColorFromNotation(notation);
  }

  getColorFromNotation(notation: PieceNotation): ChessColors {
    return isUpperCase(notation) ? ChessColors.WHITE : ChessColors.BLACK;
  }

  static getPieceFromNotation(notation: PieceNotation): Piece {
    switch (notation) {
      case "P":
        return new Pawn(notation);
      case "p":
        return new Pawn(notation);
      case "K":
        return new King(notation);
      case "k":
        return new King(notation);
      case "Q":
        return new Queen(notation);
      case "q":
        return new Queen(notation);
      case "B":
        return new Bishop(notation);
      case "b":
        return new Bishop(notation);
      case "R":
        return new Rook(notation);
      case "r":
        return new Rook(notation);
      case "N":
        return new Night(notation);
      case "n":
        return new Night(notation);
      default:
        return new Pawn(PieceNotation.PAWN_WHITE);
    }
  }
}

export class Pawn extends Piece {
  constructor(notation: PieceNotation.PAWN_BLACK | PieceNotation.PAWN_WHITE) {
    super(notation);
  }
}

export class Bishop extends Piece {
  constructor(
    notation: PieceNotation.BISHOP_BLACK | PieceNotation.BISHOP_WHITE
  ) {
    super(notation);
  }
}

export class King extends Piece {
  constructor(notation: PieceNotation.KING_BLACK | PieceNotation.KING_WHITE) {
    super(notation);
  }
}

export class Queen extends Piece {
  constructor(notation: PieceNotation.QUEEN_BLACK | PieceNotation.QUEEN_WHITE) {
    super(notation);
  }
}

export class Rook extends Piece {
  constructor(notation: PieceNotation.ROOK_BLACK | PieceNotation.ROOK_WHITE) {
    super(notation);
  }
}

export class Night extends Piece {
  constructor(notation: PieceNotation.NIGHT_BLACK | PieceNotation.NIGHT_WHITE) {
    super(notation);
  }
}
