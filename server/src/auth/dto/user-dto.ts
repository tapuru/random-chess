import { User } from '../user.entity';

export class UserDto {
  username: string;
  email: string;
  id: string;

  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
  }
}
