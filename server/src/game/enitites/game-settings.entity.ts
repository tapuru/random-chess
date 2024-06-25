import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameModes, GameTypes, TimeControls } from '../../../../shared/types';
import { Game } from './game.entity';

@Entity('game_settings')
export class GameSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: GameModes })
  mode: GameModes;

  @Column({ type: 'enum', enum: GameTypes })
  type: GameTypes;

  @Column({ type: 'enum', enum: TimeControls, nullable: true })
  timeControl: TimeControls;

  @Column({ nullable: true })
  time: number;

  @Column({ nullable: true })
  timeIncrement: number;

  @OneToOne(() => Game, (game) => game.gameSettings)
  game: Game;
}
