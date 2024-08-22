import { GameModes } from "@/shared/types/game-modes";
import { chess960Positions } from "../lib/chess960-positions";
import { CLASSICAL_INITIAL_FEN } from "../lib/classical-initial-fen";
import { PIECES, UNIQUE_PIECES } from "../lib/pieces";

//TODO: think of a better way to organise all of this (monorepo)
export class GameModesService {
  private readonly chess960Positions = chess960Positions;
  private readonly classicalChessFen = CLASSICAL_INITIAL_FEN;
  private readonly pieces = PIECES;
  private readonly uniquePieces = UNIQUE_PIECES;

  generateInitialFen(mode: GameModes): string {
    switch (mode) {
      case GameModes.CLASSICAL:
        return this.classicalChessFen;
      case GameModes.FISHER:
        return this.generateChess960InitialFen();
      case GameModes.UNFAIR_FISHER:
        return this.generateUnfairChess960InitialFen();
      case GameModes.RANDOM:
        return this.generateRandomInitialFen();
      case GameModes.UNFAIR_RANDOM:
        return this.generateUnfairRandomInitialFen();
      default:
        return this.classicalChessFen;
    }
  }

  private generateChess960InitialFen(): string {
    const keys = Object.keys(this.chess960Positions);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomPosition: string = this.chess960Positions[randomKey];
    const fen = `${randomPosition.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${randomPosition.toUpperCase()} w KQkq - 0 1`;
    return fen;
  }

  private generateUnfairChess960InitialFen(): string {
    const keys = Object.keys(this.chess960Positions);
    const randomKey1 = keys[Math.floor(Math.random() * keys.length)];
    const randomKey2 = keys.filter((key) => key !== randomKey1)[
      Math.floor(Math.random() * keys.length)
    ];
    const whitePosition: string =
      this.chess960Positions[randomKey1].toUpperCase();
    const blackPosition: string =
      this.chess960Positions[randomKey2].toLowerCase();

    return `${blackPosition}/pppppppp/8/8/8/8/PPPPPPPP/${whitePosition} w KQkq - 0 1`;
  }

  private generateRandomInitialFen(): string {
    const blackPosition = this.getPositionFromArray(
      this.getRandomPositionArray()
    ).toLowerCase();
    const whitePosition = blackPosition.toUpperCase();
    return `${blackPosition}/pppppppp/8/8/8/8/PPPPPPPP/${whitePosition} w KQkq - 0 1`;
  }

  private generateUnfairRandomInitialFen(): string {
    const whitePositionArray = this.getRandomPositionArray();
    const blackPositionArray = this.shuffle(whitePositionArray);
    const whitePosition =
      this.getPositionFromArray(whitePositionArray).toUpperCase();
    const blackPosition =
      this.getPositionFromArray(blackPositionArray).toLowerCase();
    return `${blackPosition}/pppppppp/8/8/8/8/PPPPPPPP/${whitePosition} w KQkq - 0 1`;
  }

  private getRandomPositionArray(): string[] {
    const piecesWithoutKing = this.uniquePieces.filter((p) => p !== "k");
    const arr: string[] = [];
    const kingIndex = Math.floor(Math.random() * this.pieces.length);
    for (let i = 0; i < 8; i++) {
      if (i === kingIndex) {
        arr.push("k");
      } else {
        const randomPiece =
          piecesWithoutKing[
            Math.floor(Math.random() * piecesWithoutKing.length)
          ];
        arr.push(randomPiece);
      }
    }
    return arr;
  }

  private getPositionFromArray(arr: string[]) {
    if (arr.length === 8) return arr.join("");
    if (arr.length === 16) {
      return arr.reduce((acc, cur, index) => {
        if (index === 7) return acc + `${cur}/`;
        return acc + cur;
      }, "");
    }
    return "";
  }

  private shuffle(arr: string[]) {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  }
}
