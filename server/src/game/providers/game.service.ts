import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Chess } from 'chess.js';
import { Game, GameResult, GameSettings } from '../enitites';
import { CreateGameDto, ManipulateGameDto, RematchDataDto } from '../dto';
import { ChessColors, GameStatus, GameTypes } from '../types';
import { BoardService } from './board.service';
import { RematchService } from 'src/rematch/rematch.service';
import { Rematch } from 'src/rematch/rematch.entity';
import { WsException } from '@nestjs/websockets';
import { GameErrors } from 'src/common/types/game-errors';
import { ProfileErrors } from 'src/common/types/profile-errors';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(GameSettings)
    private gameSettingsRepository: Repository<GameSettings>,
    private profileService: ProfileService,
    private boardService: BoardService,
    private rematchService: RematchService,
  ) {}

  async createGame(dto: CreateGameDto) {
    const ownerProfile = await this.profileService.getProfileByUserId(
      dto.ownerId,
    );
    if (!ownerProfile) {
      throw new BadRequestException(ProfileErrors.PROFILE_NOT_FOUND);
    }
    if (ownerProfile.isInGame) {
      throw new BadRequestException(GameErrors.PROFILE_ALREADY_IN_GAME);
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

  async joinGame({ userId, gameId }: ManipulateGameDto) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: { playerBlack: true, playerWhite: true, settings: true },
    });
    const profile = await this.profileService.getProfileByUserId(userId);

    if (!game) {
      throw new WsException('game-not-found');
    }
    if (!profile) {
      throw new WsException('profile-not-found');
    }
    if (game.status !== GameStatus.PENDING) {
      throw new WsException('game-already-started');
    }
    if (profile.isInGame) {
      throw new WsException('you-are-already-in-game');
    }

    if (game.playerBlack === null && game.playerWhite !== null) {
      game.playerBlack = profile;
    } else if (game.playerBlack !== null && game.playerWhite === null) {
      game.playerWhite = profile;
    } else {
      throw new WsException('game-full');
    }
    game.status = GameStatus.ACTIVE;
    await this.gameRepository.save(game);
    await this.profileService.updateProfile(profile.id, {
      isInGame: true,
    });
    this.boardService.setValidatorByGameId(game.id, new Chess(game.initialFen));
    return game;
  }

  async leaveGame({ gameId, userId }: ManipulateGameDto) {
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
      throw new WsException('game-not-found');
    }
    if (!profile) {
      throw new WsException('profile-not-found');
    }
    if (!profile.isInGame) {
      throw new WsException('profile-not-in-game');
    }

    if (game.playerBlack.id === profile.id) {
      game.playerBlack = null;
      game.status = GameStatus.FINISHED;
    } else if (game.playerWhite.id === profile.id) {
      game.playerWhite = null;
      game.status = GameStatus.FINISHED;
    } else {
      throw new WsException('profile-not-in-game');
    }
    await this.gameRepository.save(game);
    await this.profileService.updateProfile(profile.id, {
      isInGame: false,
    });
    return game;
  }

  async abortGame({ gameId, userId }: ManipulateGameDto) {
    const game = await this.getGameById(gameId);
    if (game.status !== GameStatus.PENDING) {
      throw new WsException('game-is-not-in-pending-state');
    }
    const profile = await this.profileService.getProfileByUserId(userId);

    if (
      !profile ||
      !profile.isInGame ||
      (game.playerBlack?.id !== profile.id &&
        game?.playerWhite.id !== profile.id)
    ) {
      throw new WsException('trying-to-abort-wrong-game');
    }

    await this.gameRepository.remove(game);
    await this.profileService.updateProfile(profile.id, { isInGame: false });
    return 'game aborted';
  }

  async offerRematch({ gameId, userId }: ManipulateGameDto): Promise<{
    newGame?: Game;
    rematch?: Rematch;
  }> {
    const game = await this.getGameById(gameId);
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile || profile.isInGame) {
      throw new WsException('wrong-profile-data');
      //TODO: handle error
    }
    if (game.status !== GameStatus.FINISHED) {
      throw new WsException('game-not-finished');
    }

    const userColor = this.getPlayerColor(game, profile.id);

    if (!game.rematch) {
      const rematch = await this.rematchService.createRematch({
        userColor,
      });
      game.rematch = rematch;
      await this.gameRepository.save(game);

      return { rematch };
    }

    const enemyProfile = [game.playerBlack, game.playerWhite].find(
      (p) => p.id !== profile.id,
    );

    const newGame = await this.createGame({
      initialFen: game.initialFen,
      ownerColor: userColor,
      ownerId: userId,
      settings: {
        gameMode: game.settings.mode,
        gameType: game.settings.type,
        ...game.settings,
      },
    });
    userColor === ChessColors.BLACK
      ? (newGame.playerWhite = enemyProfile)
      : (newGame.playerBlack = enemyProfile);
    newGame.status = GameStatus.ACTIVE;
    await this.gameRepository.save(newGame);
    await this.profileService.updateProfile(enemyProfile.id, {
      isInGame: true,
    });
    await this.profileService.updateProfile(profile.id, {
      isInGame: true,
    });
    await this.rematchService.removeRematch(game.rematch.id);
    return { newGame };
  }

  async cancelRematch({ gameId, userId }: ManipulateGameDto): Promise<Rematch> {
    const game = await this.getGameById(gameId);
    if (!game.rematch) {
      throw new WsException('game-has-no-rematch-data');
    }
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile || profile.isInGame) throw new Error('wrong-profile-data');

    const userColor = this.getPlayerColor(game, profile.id);
    if (!userColor) throw new WsException('user-is-not-in-this-game');

    const updatedRematch = await this.rematchService.cancelRematch({
      rematchId: game.rematch.id,
      userColor,
    });
    return updatedRematch;
  }

  async getGameById(id: string) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: {
        playerBlack: true,
        playerWhite: true,
        settings: true,
        result: true,
        rematch: true,
      },
    });
    if (!game) {
      throw new WsException('game-not-found');
    }
    return game;
  }

  getPlayerColor(game: Game, playerId: string) {
    if (game.playerBlack.id !== playerId && game.playerWhite.id !== playerId)
      return undefined;
    return game.playerBlack.id === playerId
      ? ChessColors.BLACK
      : ChessColors.WHITE;
  }
}
