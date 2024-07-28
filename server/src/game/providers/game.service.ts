import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { Chess } from 'chess.js';
import { Game, GameResult, GameSettings } from '../enitites';
import { CreateGameDto, ManipulateGameDto, RematchDataDto } from '../dto';
import {
  ChessColors,
  GameModes,
  GameStatus,
  GameTypes,
  TimeControls,
} from '../types';
import { BoardService } from './board.service';
import { RematchService } from 'src/rematch/rematch.service';
import { Rematch } from 'src/rematch/rematch.entity';
import { WsException } from '@nestjs/websockets';
import { AppErrors } from 'src/common/types/app-errors';

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

  async getPendingGames({
    mode,
    timeControl,
    ownerColor,
  }: {
    mode?: string;
    timeControl?: string;
    ownerColor?: string;
  }) {
    if (
      (mode && !Object.values(GameModes).includes(mode as GameModes)) ||
      (timeControl &&
        !Object.values(TimeControls).includes(timeControl as TimeControls)) ||
      (ownerColor &&
        !Object.values(ChessColors).includes(ownerColor as ChessColors))
    ) {
      throw new BadRequestException('invalid-params');
    }
    const games = await this.gameRepository.find({
      where: {
        settings: {
          mode: mode as GameModes,
          timeControl: timeControl as TimeControls,
          ownerColor: ownerColor as ChessColors,
        },
        status: GameStatus.PENDING,
      },
      relations: { settings: true, playerBlack: true, playerWhite: true },
    });
    return games;
  }

  async createGame(dto: CreateGameDto) {
    const ownerProfile = await this.profileService.getProfileByUserId(
      dto.ownerId,
    );
    if (!ownerProfile) {
      throw new BadRequestException(AppErrors.PROFILE_NOT_FOUND);
    }
    if (ownerProfile.isInGame) {
      throw new BadRequestException(AppErrors.PROFILE_ALREADY_IN_GAME);
    }
    const gameSettings = this.gameSettingsRepository.create({
      type: GameTypes.ONLINE,
      mode: dto.settings.gameMode,
      time: dto.settings.time,
      timeIncrement: dto.settings.timeIncrement,
      timeControl: dto.settings.timeControl,
      ownerColor: dto.ownerColor,
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
      throw new WsException(AppErrors.GAME_NOT_FOUND);
    }
    if (!profile) {
      throw new WsException(AppErrors.PROFILE_NOT_FOUND);
    }

    if (game.status !== GameStatus.PENDING) {
      throw new WsException(AppErrors.GAME_ALREADY_STARTED);
    }
    if (profile.isInGame) {
      throw new WsException(AppErrors.PROFILE_ALREADY_IN_GAME);
    }

    if (game.playerBlack === null && game.playerWhite !== null) {
      game.playerBlack = profile;
    } else if (game.playerBlack !== null && game.playerWhite === null) {
      game.playerWhite = profile;
    } else {
      throw new WsException(AppErrors.GAME_FULL);
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
      throw new WsException(AppErrors.GAME_NOT_FOUND);
    }
    if (!profile) {
      throw new WsException(AppErrors.PROFILE_NOT_FOUND);
    }
    if (!profile.isInGame) {
      throw new WsException(AppErrors.PROFILE_IS_NOT_IN_GAME);
    }

    if (game.playerBlack.id === profile.id) {
      game.playerBlack = null;
      game.status = GameStatus.FINISHED;
    } else if (game.playerWhite.id === profile.id) {
      game.playerWhite = null;
      game.status = GameStatus.FINISHED;
    } else {
      throw new WsException(AppErrors.PROFILE_IS_NOT_IN_GAME);
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
      throw new WsException(AppErrors.GAME_ALREADY_STARTED);
    }
    const profile = await this.profileService.getProfileByUserId(userId);

    if (
      !profile ||
      !profile.isInGame ||
      (game.playerBlack?.id !== profile.id &&
        game?.playerWhite.id !== profile.id)
    ) {
      throw new WsException(AppErrors.PERMISSION_DENIED);
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
    if (!profile) throw new WsException(AppErrors.PROFILE_NOT_FOUND);
    if (profile.isInGame)
      throw new WsException(AppErrors.PROFILE_ALREADY_IN_GAME);
    if (game.status !== GameStatus.FINISHED)
      throw new WsException(AppErrors.GAME_NOT_FINISHED);

    const userColor = this.getPlayerColor(game, profile.id);

    if (!game.rematch) {
      const rematch = await this.rematchService.createRematch({
        userColor,
      });
      game.rematch = rematch;
      await this.gameRepository.save(game);

      return { rematch };
    } else if (
      !game.rematch.blackUpForRematch &&
      !game.rematch.whiteUpForRematch
    ) {
      const updatedRematch = await this.rematchService.addUpForRematchUser({
        rematchId: game.rematch.id,
        userColor,
      });

      return { rematch: updatedRematch };
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
      throw new WsException(AppErrors.GAME_HAS_NO_REMATCH_DATA);
    }
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) throw new WsException(AppErrors.PROFILE_NOT_FOUND);

    const userColor = this.getPlayerColor(game, profile.id);
    if (!userColor) throw new WsException(AppErrors.PERMISSION_DENIED);

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
        moves: true,
      },
    });
    if (!game) {
      throw new WsException(AppErrors.GAME_NOT_FOUND);
    }
    return game;
  }

  async getGame(id: string, userId: string) {
    const game = await this.getGameById(id);
    if (!game) {
      throw new BadRequestException(AppErrors.GAME_NOT_FOUND);
    }
    const profile = await this.profileService.getProfileByUserId(userId);

    if (!profile) {
      throw new BadRequestException(AppErrors.PROFILE_NOT_FOUND);
    }
    if (
      profile.id !== game.playerBlack?.id &&
      profile.id !== game.playerWhite?.id &&
      game.status === GameStatus.ACTIVE
    ) {
      throw new BadRequestException(AppErrors.PERMISSION_DENIED);
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
