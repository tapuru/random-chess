import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameMessages } from '../types';
import { OnModuleInit } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto, MakeMoveDto, ManipulateGameDto } from '../dto';
import { BoardService } from './board.service';
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

  @SubscribeMessage(GameMessages.GET_GAME)
  async handleGetGame(
    @MessageBody() payload: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const game = await this.gameService.getGameById(payload);
      client.emit(GameMessages.GET_GAME);
    } catch (error) {}
  }

  @SubscribeMessage(GameMessages.CREATE_GAME)
  async handleCreateGame(
    @MessageBody() payload: CreateGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const game = await this.gameService.createGame(payload);
      return game;
    } catch (error) {
      if (error.message === 'profile-not-found') {
        this.server.emit(GameMessages.GAME_ALIERT, {
          message: 'profile-not-found',
        });
      }
      if (error.message === 'profile-already-in-game') {
        this.server.emit(GameMessages.GAME_ALIERT, {
          message: 'profile-already-in-game',
        });
      }
      console.log(error);
    }
  }

  @SubscribeMessage(GameMessages.JOIN_GAME)
  async handleJoinGame(
    @MessageBody() payload: ManipulateGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const game = await this.gameService.joinGame(payload);
      this.server.emit(GameMessages.GAME_JOINED, game);
      return game;
    } catch (error) {
      this.server.emit(GameMessages.GAME_ALIERT, { error: error.message });
    }
  }

  @SubscribeMessage(GameMessages.LEAVE_GAME)
  async handleLeaveGame(
    @MessageBody() payload: ManipulateGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.gameService.leaveGame(payload);
      this.server.emit(GameMessages.GAME_ALIERT, {
        message: 'game-left',
      });
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage(GameMessages.MOVE)
  async handleMove(
    @MessageBody() payload: MakeMoveDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const game = await this.boardService.makeMove(payload);
      this.server.emit(GameMessages.MOVE, game);
      if (game.result) {
        this.server.emit(GameMessages.GAME_FINISHED, game);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage(GameMessages.RESIGN)
  async handleResign(@MessageBody() payload: ManipulateGameDto) {
    try {
      const game = await this.boardService.resign(payload);
      this.server.emit(GameMessages.GAME_FINISHED, game);
    } catch (error) {
      console.log(error);
      this.server.emit(GameMessages.GAME_ALIERT, { error });
    }
  }

  @SubscribeMessage(GameMessages.ABORT_GAME)
  async handleAbortGame(@MessageBody() payload: ManipulateGameDto) {
    try {
      const message = await this.gameService.AbortGame(payload);
      return message;
    } catch (error) {
      //TODO : handle error
      console.log(error);
    }
  }
}
