import { ChessColors, GameModes, GameTypes, TimeControls } from '../types';

export class CreateGameDto {
  initialFen: string;
  ownerId: string;
  ownerColor: ChessColors;
  settings: {
    gameType: GameTypes;
    gameMode: GameModes;
    timeControl?: TimeControls;
    time?: number;
    timeIncrement?: number;
  };
}
