import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChessColors, GameMessages } from '../types';
import { OnModuleInit, UseFilters, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { MakeMoveDto, ManipulateGameDto } from '../dto';
import { BoardService } from './board.service';
import { AcessTokenGuard } from 'src/common/guards';

@WebSocketGateway(3002, {
  cors: { origin: 'http://localhost:3000', credentials: true },
})
export class GameGateway implements OnModuleInit {
  constructor(
    private gameService: GameService,
    private boardService: BoardService,
  ) {}
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });

    this.server.on('disconnect', (socket) => {
      console.log('disconnected', socket.id);
    });
  }

  // @SubscribeMessage(GameMessages.CREATE_GAME)
  // async handleCreateGame(
  //   @MessageBody() payload: CreateGameDto,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   try {
  //     const game = await this.gameService.createGame(payload);
  //     return game;
  //   } catch (error) {
  //     if (error.message === 'profile-not-found') {
  //       this.server.emit(GameMessages.GAME_ALIERT, {
  //         message: 'profile-not-found',
  //       });
  //     }
  //     if (error.message === 'profile-already-in-game') {
  //       this.server.emit(GameMessages.GAME_ALIERT, {
  //         message: 'profile-already-in-game',
  //       });
  //     }
  //     console.log(error);
  //   }
  // }
  @SubscribeMessage(GameMessages.JOIN_GAME)
  async handleJoinGame(
    @MessageBody() payload: ManipulateGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    const game = await this.gameService.joinGame(payload);
    this.server.emit(GameMessages.GAME_JOINED, game);
    return game;
  }

  @SubscribeMessage(GameMessages.LEAVE_GAME)
  async handleLeaveGame(
    @MessageBody() payload: ManipulateGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    await this.gameService.leaveGame(payload);
    this.server.emit(GameMessages.GAME_ALIERT, {
      message: 'game-left',
    });
  }

  @SubscribeMessage(GameMessages.MOVE)
  async handleMove(@MessageBody() payload: MakeMoveDto) {
    const game = await this.boardService.makeMove(payload);
    this.server.emit(GameMessages.MOVE, game);
    if (game.result) {
      this.server.emit(GameMessages.GAME_FINISHED, game);
    }
  }

  @SubscribeMessage(GameMessages.RESIGN)
  async handleResign(@MessageBody() payload: ManipulateGameDto) {
    const game = await this.boardService.resign(payload);
    this.server.emit(GameMessages.GAME_FINISHED, game);
  }

  @SubscribeMessage(GameMessages.ABORT_GAME)
  async handleAbortGame(@MessageBody() payload: ManipulateGameDto) {
    const message = await this.gameService.abortGame(payload);
    return message;
  }

  @SubscribeMessage(GameMessages.OFFER_REMATCH)
  async handleOfferRematch(@MessageBody() payload: ManipulateGameDto) {
    const { newGame, rematch } = await this.gameService.offerRematch(payload);
    if (rematch) {
      this.server.emit(GameMessages.OFFER_REMATCH, rematch);
      return rematch;
    }
    if (newGame) {
      this.server.emit(GameMessages.REMATCH_ACCEPTED, {
        newGameId: newGame.id,
      });
      return rematch;
    }
  }

  @SubscribeMessage(GameMessages.CANCEL_REMATCH)
  async handleCancelRematch(@MessageBody() payload: ManipulateGameDto) {
    const rematch = await this.gameService.cancelRematch(payload);
    this.server.emit(GameMessages.CANCEL_REMATCH, rematch);
    return rematch;
  }
}
