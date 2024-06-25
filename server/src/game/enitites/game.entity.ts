import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStatus, ChessColors } from '../../../../shared/types';
import { GameSettings } from './game-settings.entity';
import { Profile } from 'src/profile/profile.entity';
import { GameResult } from './game-result.entity';
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

  @Column({ nullable: true })
  whiteTimeLeft: number;

  @Column({ nullable: true })
  blackTimeLeft: number;

  @Column()
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;

  @OneToOne(() => GameSettings, (gameSettings) => gameSettings.game)
  gameSettings: GameSettings;

  @ManyToOne(() => Profile, (profile) => profile.gamesAsWhite)
  playerWhite: Profile;

  @OneToOne(() => Profile, (profile) => profile.gamesAsBlack)
  playerBlack: Profile;

  @OneToOne(() => GameResult, (gameResult) => gameResult.game)
  result: GameResult;
}
