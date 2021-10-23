import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WsService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WsService');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, data: any): void {
    this.server.emit('msgToClient', {id:Math.floor(Math.random() * 10000001), user_name: data.user_name, message: data.message });
  }

  @SubscribeMessage('typingMessage')
  handleTypingMessage(client: Socket, data: any) {
    const messageLength = data.length
    this.server.emit('sendTyping', { user_name: data.user_name, messageLength });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

    handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('connected', client.id);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
