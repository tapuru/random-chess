import { User } from '../user.entity';

export class UserDto {
  email: string;
  id: string;

  constructor(user: User) {
    this.email = user.email;
    this.id = user.id;
  }
}
