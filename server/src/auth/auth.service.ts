import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/token.type';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async register(dto: AuthDto): Promise<Tokens> {
    const userExists = this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new BadRequestException({ type: 'email-exists' });
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = this.userRepository.create({
      email: dto.email,
      hashedPassword,
      username: dto.username,
    });

    return new Promise((resolve, reject) => {
      resolve({
        access_token: '',
        refresh_token: '',
      });
    });
  }
  login() {
    return { message: 'login' };
  }

  logout() {
    return { message: 'logout' };
  }

  refresh() {
    return { message: 'refresh' };
  }
}
