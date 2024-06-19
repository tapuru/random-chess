import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  provider: string;
}
