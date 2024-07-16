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
import { LoginDto, RegisterDto, UserDto } from './dto';
import { ProfileService } from 'src/profile/profile.service';
import { AppErrors } from 'src/common/types/app-errors';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokensService: TokensService,
    private readonly profileService: ProfileService,
  ) {}

  async register(dto: RegisterDto): Promise<{ tokens: Tokens; user: UserDto }> {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new BadRequestException(AppErrors.EMAIL_EXISTS);
    }

    const usernameExsists = await this.profileService.getProfileByUsername(
      dto.username,
    );
    if (usernameExsists)
      throw new BadRequestException(AppErrors.USERNAME_EXISTS);
    if (!dto.passwordConfirm || dto.password !== dto.passwordConfirm) {
      throw new BadRequestException(AppErrors.PASSWORD_MISMATCH);
    }

    const hashedPassword = await this.tokensService.hashData(dto.password);

    const user = this.userRepository.create({
      email: dto.email,
      hashedPassword,
      provider: 'local',
    });
    await this.userRepository.save(user);

    await this.profileService.createProfile(user, dto.username);

    const userDto = new UserDto(user);
    const tokens = await this.tokensService.getTokens(user.id, user.email);
    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);
    return { tokens, user: userDto };
  }
  async login(dto: LoginDto): Promise<{ tokens: Tokens; user: UserDto }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException(AppErrors.INCORRECT_CREDENTIALS);
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.hashedPassword,
    );
    if (!passwordMatches) {
      throw new ForbiddenException(AppErrors.INCORRECT_CREDENTIALS);
    }

    const userDto = new UserDto(user);
    const tokens = await this.tokensService.getTokens(user.id, user.email);
    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      tokens,
      user: userDto,
    };
  }

  async logout(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(AppErrors.UNAUTHORIZED);
    }
    user.refreshToken = null;
    this.userRepository.save(user);

    return { message: 'logout' };
  }

  async refresh(
    userId: string,
    refreshToken: string,
  ): Promise<{ tokens: Tokens; user: UserDto }> {
    if (!userId || !refreshToken) {
      throw new ForbiddenException(AppErrors.UNAUTHORIZED);
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(AppErrors.UNAUTHORIZED);
    }

    const refreshTokenMatches = refreshToken === user.refreshToken;

    if (!refreshTokenMatches) {
      throw new ForbiddenException(AppErrors.UNAUTHORIZED);
    }

    const tokens = await this.tokensService.getTokens(user.id, user.email);
    await this.tokensService.updateRefreshToken(user.id, tokens.refreshToken);
    const userDto = new UserDto(user);
    return { tokens, user: userDto };
  }

  async googleLogin(user: any): Promise<{ tokens: Tokens; user: UserDto }> {
    const userFromDb = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!userFromDb) {
      const newUser = this.userRepository.create({
        email: user.email,
        provider: 'google',
      });
      await this.userRepository.save(newUser);
      await this.profileService.createProfile(newUser, user.username);
      const tokens = await this.tokensService.getTokens(
        newUser.id,
        newUser.email,
      );
      await this.tokensService.updateRefreshToken(
        newUser.id,
        tokens.refreshToken,
      );
      const userDto = new UserDto(newUser);
      return { tokens, user: userDto };
    }

    const tokens = await this.tokensService.getTokens(
      userFromDb.id,
      userFromDb.email,
    );
    await this.tokensService.updateRefreshToken(
      userFromDb.id,
      tokens.refreshToken,
    );
    const userDto = new UserDto(userFromDb);
    return { tokens, user: userDto };
  }
}
