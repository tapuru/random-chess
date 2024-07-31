import { Injectable } from '@nestjs/common';
import { chess960Positions } from './consts';
import { GameModes } from 'src/game/types';
import { CLASSICAL_INITIAL_FEN } from './consts/classical-initial-fen';

@Injectable()
export class GameModesService {
  private chess960Positions = chess960Positions;
  private classicalChessFen = CLASSICAL_INITIAL_FEN;

  generateInitialFen(mode: GameModes): string {
    switch (mode) {
      case GameModes.CLASSICAL:
        return this.classicalChessFen;
      case GameModes.FISHER:
        return this.generateChess960InitialFen();
    }
  }

  private generateChess960InitialFen(): string {
    const keys = Object.keys(this.chess960Positions);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomPosition: string = this.chess960Positions[randomKey];
    const fen = `${randomPosition.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${randomPosition.toUpperCase()} w KQkq - 0 1`;
    console.log(fen);
    return fen;
  }
}
