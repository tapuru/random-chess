import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from '../enitites';
import { Repository } from 'typeorm';
import { MoveEntity } from '../enitites/move.entity';
import { Chess } from 'chess.js';
import { MakeMoveDto } from '../dto/make-move.dto';
import { ChessColors, GameEndReason, GameStatus } from '../types';

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
  ) {}

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

  public async makeMove({ gameId, from, to, promotion }: MakeMoveDto) {
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
      throw new Error('game-not-found');
    }
    if (game.status !== GameStatus.ACTIVE) {
      throw new Error('game-not-active');
    }

    const validator = this.getValidarorByGameId(gameId);
    if (!validator) {
      throw new Error('validator-not-found');
    }
    const move = validator.move({
      from,
      to,
      promotion,
    });
    console.log(move);
    if (move === null) {
      throw new Error('invalid-move');
    }
    const moveEntity = this.moveRepository.create({
      ...move,
      moveNumber: 1,
    });
    game.moves.push(moveEntity);
    game.currentFen = move.after;

    const result = this.checkForResult(validator);
    if (result) {
      const gameResult = this.gameResultRepository.create({
        reason: result.reason,
        winner: result.winner,
      });
      game.result = gameResult;
      game.status = GameStatus.FINISHED;
      await this.gameResultRepository.save(gameResult);
    } else {
      this.toggleGameCurrentTurn(game);
    }
    await this.gameRepository.save(game);
    await this.moveRepository.save(moveEntity);
    return game;
  }

  logValidators() {
    console.log(this.validators);
  }

  private toggleGameCurrentTurn(game: Game) {
    game.currentTurn === ChessColors.BLACK
      ? (game.currentTurn = ChessColors.WHITE)
      : (game.currentTurn = ChessColors.BLACK);
  }

  private checkForResult(chess: Chess) {
    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        return { winner: chess.turn(), reason: GameEndReason.CHECKMATE };
      } else if (chess.isDraw()) {
        return { reason: GameEndReason.DRAW };
      } else if (chess.isStalemate()) {
        return { reason: GameEndReason.STALEMATE };
      } else {
        return null;
      }
    }
  }
}
