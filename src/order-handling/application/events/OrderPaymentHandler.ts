import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/order-handling/domain/events/OrderCreated.event';
import { OrderPaymentEvent } from 'src/order-handling/domain/events/OrderPayment.event';
import { TableService } from '../TableService';
@EventsHandler(OrderPaymentEvent)
export class OrderPaymentHandler implements IEventHandler<OrderPaymentEvent> {
  constructor(private tableService: TableService) {}
  handle(event: OrderPaymentEvent) {
    this.tableService.updateStateNotBusy(event.table);
  }
}
