import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from '../enitites';
import { Repository } from 'typeorm';
import { MoveEntity } from '../enitites/move.entity';
import { Chess } from 'chess.js';
import { ChessColors, GameEndReason, GameStatus } from '../types';
import { ProfileService } from 'src/profile/profile.service';
import { MakeMoveDto, ManipulateGameDto } from '../dto';
import { WsException } from '@nestjs/websockets';
import { AppErrors } from 'src/common/types/app-errors';

@Injectable()
export class BoardService {
  private validators: Map<string, Chess> = new Map();
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(GameSettings)
    private gameSettingsRepository: Repository<GameSettings>,
    @InjectRepository(GameResult)
    private gameResultRepository: Repository<GameResult>,
    @InjectRepository(MoveEntity)
    private moveRepository: Repository<MoveEntity>,
    private profileService: ProfileService,
  ) {}

  async makeMove({ gameId, from, to, promotion }: MakeMoveDto) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: {
        playerBlack: true,
        playerWhite: true,
        moves: true,
        settings: true,
      },
    });
    if (!game) {
      throw new WsException(AppErrors.GAME_NOT_FOUND);
    }
    if (game.status !== GameStatus.ACTIVE) {
      throw new WsException(AppErrors.GAME_NOT_ACTIVE);
    }

    const validator = this.getValidarorByGameId(gameId);

    const move = validator.move({
      from,
      to,
      promotion,
    });
    if (move === null) {
      throw new WsException(AppErrors.INVALID_MOVE);
    }
    const moveEntity = this.moveRepository.create({
      ...move,
      moveNumber: 1,
      game,
    });
    game.moves.push(moveEntity);
    game.currentFen = move.after;

    const result = this.checkForResult(validator);
    console.log(result);
    if (result) {
      await this.endGame({ game, result });
    } else {
      this.toggleGameCurrentTurn(game);
    }
    await this.gameRepository.save(game);
    await this.moveRepository.save(moveEntity);
    return game;
  }

  async resign({ gameId, userId }: ManipulateGameDto) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: {
        playerBlack: true,
        playerWhite: true,
        result: true,
        settings: true,
      },
    });
    if (!game) throw new WsException(AppErrors.GAME_NOT_FOUND);
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) throw new WsException(AppErrors.PROFILE_NOT_FOUND);
    if (
      profile.id !== game.playerBlack.id &&
      profile.id !== game.playerWhite.id
    )
      throw new WsException(AppErrors.PERMISSION_DENIED);
    if (game.status !== GameStatus.ACTIVE)
      throw new WsException(AppErrors.GAME_NOT_ACTIVE);

    const reason =
      profile.id === game.playerBlack.id
        ? GameEndReason.BLACK_RESIGNED
        : GameEndReason.WHITE_RESIGNED;
    const winner =
      profile.id === game.playerBlack.id
        ? ChessColors.WHITE
        : ChessColors.BLACK;
    const result = { reason, winner };
    await this.endGame({ game, result });
    await this.gameRepository.save(game);

    return game;
  }

  private getValidarorByGameId(gameId: string, position?: string) {
    const validator = this.validators.get(gameId);
    if (!validator) {
      this.setValidatorByGameId(
        gameId,
        new Chess(
          position ??
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        ),
      );
    }
    return this.validators.get(gameId);
  }

  public setValidatorByGameId(gameId: string, validator: Chess) {
    this.validators.set(gameId, validator);
  }

  public deleteValidatorByGameId(gameId: string) {
    return this.validators.delete(gameId);
  }

  private toggleGameCurrentTurn(game: Game) {
    game.currentTurn === ChessColors.BLACK
      ? (game.currentTurn = ChessColors.WHITE)
      : (game.currentTurn = ChessColors.BLACK);
  }

  private checkForResult(chess: Chess): {
    reason: GameEndReason;
    winner?: string;
  } {
    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        const winner =
          chess.turn() === ChessColors.BLACK
            ? ChessColors.WHITE
            : ChessColors.BLACK;
        return { winner, reason: GameEndReason.CHECKMATE };
      } else if (chess.isDraw()) {
        return { reason: GameEndReason.DRAW };
      } else if (chess.isStalemate()) {
        return { reason: GameEndReason.STALEMATE };
      } else {
        return null;
      }
    }
  }

  private async endGame({
    game,
    result,
  }: {
    game: Game;
    result: { reason: GameEndReason; winner?: string };
  }) {
    const gameResult = this.gameResultRepository.create({
      reason: result.reason,
      winner: result.winner,
    });
    console.log(game);
    console.log(gameResult);
    console.log(gameResult.id);
    game.status = GameStatus.FINISHED;
    game.endAt = new Date();
    game.result = gameResult;

    await this.profileService.updateProfile(game.playerBlack.id, {
      isInGame: false,
    });
    await this.profileService.updateProfile(game.playerWhite.id, {
      isInGame: false,
    });
    await this.gameResultRepository.save(gameResult);
    this.deleteValidatorByGameId(game.id);

    return gameResult;
  }
}
