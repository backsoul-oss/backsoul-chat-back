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
export class WsService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

 @WebSocketServer() server: Server;
 private logger: Logger = new Logger('WsService');

 @SubscribeMessage('msgToServer')
 handleMessage(client: Socket, message: string): void {
  this.server.emit('msgToClient',  {user: client.id,message});
 }

 afterInit(server: Server) {
  this.logger.log('Init');
 }

 handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
 }

 handleConnection(client: Socket, ...args: any[]) {
  this.logger.log(`Client connected: ${client.id}`);
 }
}