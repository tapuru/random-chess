import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameMessages } from './types';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto';
@WebSocketGateway(3002, {})
export class GameGateway implements OnModuleInit {
  constructor(private gameService: GameService) {}
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });

    this.server.on('disconnect', (socket) => {
      console.log('disconnected', socket.id);
    });
  }

  @SubscribeMessage(GameMessages.CREATE_GAME)
  async handleCreateGame(
    @MessageBody() payload: CreateGameDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const game = await this.gameService.createGame(payload);
      this.server.emit(GameMessages.GAME_CREATED, {
        game: game,
      });
    } catch (error) {
      if (error.message === 'profile-not-found') {
        this.server.emit(GameMessages.GAME_ALIERT, {
          message: 'profile-not-found',
        });
      }
      console.log(error);
    }
  }

  @SubscribeMessage(GameMessages.JOIN_GAME)
  handleJoinGame(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('join game');
    console.log(payload);
    this.server.emit(GameMessages.GAME_ALIERT, {
      message: 'hello',
      payload: payload,
    });
  }

  @SubscribeMessage(GameMessages.LEAVE_GAME)
  handleLeaveGame(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(payload);
  }
}
