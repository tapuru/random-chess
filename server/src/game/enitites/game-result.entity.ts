import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';
import { ChessColors, GameEndReason } from '../../../../shared/types';

@Entity('game_results')
export class GameResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ChessColors, nullable: true })
  winner: string;

  @Column({ type: 'enum', enum: GameEndReason })
  reason: GameEndReason;

  @OneToOne(() => Game, (game) => game.result)
  game: Game;
}
