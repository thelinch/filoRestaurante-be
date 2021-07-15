import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WsInit
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;
  afterInit(server: any) {

  }

  handleDisconnect(client: any) {
    console.log('client Desconnect');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('client connect');
  }
}
