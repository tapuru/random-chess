import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokensService } from './tokens.service';
import { Tokens } from './types';
import { LoginDto, RegisterDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokensService: TokensService,
  ) {}

  async register(dto: RegisterDto): Promise<Tokens> {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new BadRequestException({ type: 'email-exists' });
    }

    const hashedPassword = await this.tokensService.hashData(dto.password);

    const user = this.userRepository.create({
      email: dto.email,
      hashedPassword,
      username: dto.username,
    });
    await this.userRepository.save(user);

    const tokens = await this.tokensService.getTokens(user.id, user.email);
    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.hashedPassword,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Unauthorized');
    }

    const tokens = await this.tokensService.getTokens(user.id, user.email);
    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Unauthorized');
    }
    user.refreshToken = null;
    this.userRepository.save(user);

    return { message: 'logout' };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Unauthorized');
    }

    const refreshTokenMatches = refreshToken === user.refreshToken;

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Unauthorized');
    }

    const tokens = await this.tokensService.getTokens(user.id, user.email);
    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
