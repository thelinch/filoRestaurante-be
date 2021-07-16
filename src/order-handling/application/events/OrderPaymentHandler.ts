import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderPaymentEvent } from '../../domain/events/OrderPayment.event';
import { OrderService } from '../OrderService';
import { TableService } from '../TableService';
@EventsHandler(OrderPaymentEvent)
export class OrderPaymentHandler implements IEventHandler<OrderPaymentEvent> {
  constructor(
    private tableService: TableService,
    private orderService: OrderService,
  ) {}
  async handle(event: OrderPaymentEvent) {
    const tableContainOrder = await this.orderService.tableConstainOrder(
      event.table.Id,
    );
    if (!tableContainOrder) {
      this.tableService.updateStateNotBusy(event.table);
    }
  }
}
