import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderRejectEvent } from 'src/order-handling/domain/events/OrderReject.event';
import { ProductRepository } from 'src/order-handling/infraestructure/repository/ProductRepository';
import { OrderService } from '../OrderService';
import { TableService } from '../TableService';
@EventsHandler(OrderRejectEvent)
export class OrderRejectHandler implements IEventHandler<OrderRejectEvent> {
  constructor(
    private tableService: TableService,
    private productRepository: ProductRepository,
    private orderService: OrderService,
  ) {}
  async handle(event: OrderRejectEvent) {
    this.productRepository.increaseQuantity(event.orderDetails);
    const tableContainsOrder = await this.orderService.tableConstainOrder(
      event.table.Id,
    );
    if (!tableContainsOrder) {
      this.tableService.updateStateNotBusy(event.table);
    }
    //this.tableService.updateStateNotBusy(event.table);
  }
}
