import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameMessages } from './types';
@WebSocketGateway(3002, {})
export class GameGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage(GameMessages.JOIN_GAME)
  handleJoinGame(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(payload);
    console.log(client);
  }

  @SubscribeMessage(GameMessages.LEAVE_GAME)
  handleLeaveGame(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(payload);
  }
}
