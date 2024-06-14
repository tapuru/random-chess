import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async validateUser(dto: UserDto) {
    console.log(dto);
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) {
      const newUser = this.userRepository.create(dto);
      await this.userRepository.save(newUser);
      return user;
    }
    return user;
  }

  async findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
