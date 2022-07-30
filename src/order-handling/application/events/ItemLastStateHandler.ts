import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ItemLastStateEvent } from '../../domain/events/ItemLastState.event';
@WebSocketGateway()
@EventsHandler(ItemLastStateEvent)
export class ItemLastStateHandler implements IEventHandler<ItemLastStateEvent> {
  @WebSocketServer()
  server: Server;
  constructor() {}
  async handle(event: ItemLastStateEvent) {
    console.log("ENTRO AL HANDLER",event)
    this.server.emit('itemLastState', event);
  }
}
