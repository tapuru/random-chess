import { User } from 'src/auth/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
