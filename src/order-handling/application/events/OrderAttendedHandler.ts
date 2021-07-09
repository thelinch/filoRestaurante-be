import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderAttendedEvent } from 'src/order-handling/domain/events/OrderAttended.event';

@EventsHandler(OrderAttendedEvent)
export class OrderAttendedHandler implements IEventHandler<OrderAttendedEvent> {
  handle(event: OrderAttendedEvent) {
    console.log('ejecutando el evento', event);
  }
}
