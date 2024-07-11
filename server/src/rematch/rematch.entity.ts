import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '../game/enitites/game.entity';

@Entity('rematches')
export class Rematch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Game, (game) => game.rematch)
  @JoinColumn()
  game: Game;

  @Column()
  whiteUpForRematch: boolean;

  @Column()
  blackUpForRematch: boolean;

  @Column({ nullable: true })
  newGameId: string;
}
