import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Chess } from 'chess.js';
import { Game, GameResult, GameSettings } from '../enitites';
import { CreateGameDto, JoinGameDto } from '../dto';
import { ChessColors, GameStatus, GameTypes } from '../types';
import { BoardService } from './board.service';
import { ResignDto } from '../dto/resing-dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(GameSettings)
    private gameSettingsRepository: Repository<GameSettings>,
    @InjectRepository(GameResult)
    private gameResultRepository: Repository<GameResult>,
    private profileService: ProfileService,
    private boardService: BoardService,
  ) {}

  async getGameById(id: string) {
    return this.gameRepository.findOne({
      where: { id },
      relations: { settings: true, playerBlack: true, playerWhite: true },
    });
  }

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
      currentFen: dto.initialFen,
      whiteTimeLeft: dto.settings.time,
      blackTimeLeft: dto.settings.time,
    });
    dto.ownerColor === ChessColors.WHITE
      ? (game.playerWhite = ownerProfile)
      : (game.playerBlack = ownerProfile);
    game.settings = gameSettings;

    await this.gameSettingsRepository.save(gameSettings);
    await this.gameRepository.save(game);
    await this.profileService.updateProfile(ownerProfile.id, {
      isInGame: true,
    });
    return game;
  }

  async joinGame({ userId, gameId }: JoinGameDto) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: { playerBlack: true, playerWhite: true, settings: true },
    });
    const profile = await this.profileService.getProfileByUserId(userId);

    if (!game) {
      throw new Error('game-not-found');
    }
    if (!profile) {
      throw new Error('profile-not-found');
    }
    if (game.status !== GameStatus.PENDING) {
      throw new Error('game-already-started');
    }
    if (profile.isInGame) {
      throw new Error('profile-already-in-game');
    }

    if (game.playerBlack === null && game.playerWhite !== null) {
      game.playerBlack = profile;
    } else if (game.playerBlack !== null && game.playerWhite === null) {
      game.playerWhite = profile;
    } else {
      throw new Error('game-full');
    }
    game.status = GameStatus.ACTIVE;
    await this.gameRepository.save(game);
    await this.profileService.updateProfile(profile.id, {
      isInGame: true,
    });
    this.boardService.setValidatorByGameId(game.id, new Chess(game.initialFen));
    return game;
  }

  async leaveGame({ gameId, userId }: JoinGameDto) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: {
        playerBlack: true,
        playerWhite: true,
        result: true,
        settings: true,
      },
    });
    const profile = await this.profileService.getProfileByUserId(userId);

    if (!game) {
      throw new Error('game-not-found');
    }
    if (!profile) {
      throw new Error('profile-not-found');
    }
    if (!profile.isInGame) {
      throw new Error('profile-not-in-game');
    }

    if (game.playerBlack.id === profile.id) {
      game.playerBlack = null;
      game.status = GameStatus.FINISHED;
    } else if (game.playerWhite.id === profile.id) {
      game.playerWhite = null;
      game.status = GameStatus.FINISHED;
    } else {
      throw new Error('profile-not-in-game');
    }
    await this.gameRepository.save(game);
    await this.profileService.updateProfile(profile.id, {
      isInGame: false,
    });
    return game;
  }
}
