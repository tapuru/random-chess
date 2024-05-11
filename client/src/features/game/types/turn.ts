import { Piece } from "@/entities/board/model/piece/Piece";
import { PieceNotation } from "@/shared/types/piece-notation";

export interface Turn {
  fromPosition: {
    x: number;
    y: number;
    notation: string;
  };
  toPosition: {
    x: number;
    y: number;
    notation: string;
  };
  piece: PieceNotation;
}
