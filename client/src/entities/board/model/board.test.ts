import { ChessColors } from "@/shared/types/chess-colors";
import { Board } from "./Board";

describe("board entity init tests", () => {
  test("init from default fen", () => {
    expect(1).toBe(1);
    const board = new Board();
    board.initFromFen();

    expect(board.tiles[0][0].color).toBe(ChessColors.WHITE);
    expect(board.tiles[1][0].color).toBe(ChessColors.BLACK);
    expect(board.tiles[0][0].piece?.notation).toBe("r");
  });
});
