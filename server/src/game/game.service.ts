import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from './enitites';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto';
import { ProfileService } from 'src/profile/profile.service';
import { ChessColors, GameStatus, GameTypes } from './types';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(GameSettings)
    private gameSettingsRepository: Repository<GameSettings>,
    @InjectRepository(GameResult)
    private gameResultRepository: Repository<GameResult>,
    private profileService: ProfileService,
  ) {}

  async createGame(dto: CreateGameDto) {
    const ownerProfile = await this.profileService.getProfileByUserId(
      dto.ownerId,
    );
    console.log(ownerProfile);
    if (!ownerProfile) {
      throw new Error('profile-not-found');
    }
    if (ownerProfile.isInGame) {
      throw new Error('profile-already-in-game');
    }
    const gameSettings = this.gameSettingsRepository.create({
      type: GameTypes.ONLINE,
      mode: dto.settings.gameMode,
      time: dto.settings.time,
      timeIncrement: dto.settings.timeIncrement,
      timeControl: dto.settings.timeControl,
    });

    const game = this.gameRepository.create({
      initialFen: dto.initialFen,
      status: GameStatus.PENDING,
      currentTurn: ChessColors.WHITE,
      whiteTimeLeft: dto.settings.time,
      blackTimeLeft: dto.settings.time,
    });
    dto.ownerColor === ChessColors.WHITE
      ? (game.playerWhite = ownerProfile)
      : (game.playerBlack = ownerProfile);

    await this.gameSettingsRepository.save(gameSettings);
    await this.gameRepository.save(game);
    await this.profileService.updateProfile(ownerProfile.id, {
      isInGame: true,
    });
    return game;
  }
}
