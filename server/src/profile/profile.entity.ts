import { User } from 'src/auth/user.entity';
import { Game } from 'src/game/enitites/game.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  isOnline: boolean;

  @Column({ nullable: true })
  lastOnline: Date;

  @Column({})
  isInGame: boolean;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Game, (game) => game.playerWhite)
  gamesAsWhite: Game[];

  @OneToMany(() => Game, (game) => game.playerBlack)
  gamesAsBlack: Game[];
}
