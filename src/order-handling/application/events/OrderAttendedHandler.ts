import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OrderAttendedEvent } from 'src/order-handling/domain/events/OrderAttended.event';
import { Server } from 'socket.io';

@WebSocketGateway()
@EventsHandler(OrderAttendedEvent)
export class OrderAttendedHandler implements IEventHandler<OrderAttendedEvent> {
  @WebSocketServer()
  server: Server;
  handle(event: OrderAttendedEvent) {
    console.log('ejecutando el evento', event);
    this.server.emit('attendOrder', event);
  }
}
