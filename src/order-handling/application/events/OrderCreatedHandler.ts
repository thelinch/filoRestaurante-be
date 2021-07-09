import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/order-handling/domain/events/OrderCreated.event';
import { TableService } from '../TableService';
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(private tableService: TableService) {}
  handle(event: OrderCreatedEvent) {
    console.log('order created', event.table);
    this.tableService.updateStateBusy(event.table);
  }
}
