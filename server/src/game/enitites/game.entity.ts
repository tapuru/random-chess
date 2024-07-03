import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { GameSettings } from './game-settings.entity';
import { Profile } from 'src/profile/profile.entity';
import { GameResult } from './game-result.entity';
import { ChessColors, GameStatus } from '../types';
import { MoveEntity } from './move.entity';
@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: GameStatus })
  status: GameStatus;

  @Column()
  initialFen: string;

  @Column({ nullable: true })
  currentTurn: ChessColors;

  @Column()
  currentFen: string;

  @Column({ nullable: true })
  whiteTimeLeft: number;

  @Column({ nullable: true })
  blackTimeLeft: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ nullable: true })
  endAt: Date;

  @OneToOne(() => GameSettings, (gameSettings) => gameSettings.game)
  @JoinColumn()
  settings: GameSettings;

  @ManyToOne(() => Profile, (profile) => profile.gamesAsWhite)
  playerWhite: Profile;

  @ManyToOne(() => Profile, (profile) => profile.gamesAsBlack)
  playerBlack: Profile;

  @OneToOne(() => GameResult, (gameResult) => gameResult.game)
  @JoinColumn()
  result: GameResult;

  @OneToMany(() => MoveEntity, (move) => move.game)
  moves: MoveEntity[];
}
