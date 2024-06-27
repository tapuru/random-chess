import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity('moves')
export class MoveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  moveNumber: number;

  @Column()
  before: string;

  @Column()
  after: string;

  @Column({ nullable: true })
  timeTaken: number;

  @Column({ nullable: true })
  san: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToOne(() => Game, (game) => game.moves)
  game: Game;
}
