import { ChessColors } from "@/shared/types/chess-colors";

export class Player {
  color: ChessColors;

  constructor(color: ChessColors) {
    this.color = color;
  }
}
