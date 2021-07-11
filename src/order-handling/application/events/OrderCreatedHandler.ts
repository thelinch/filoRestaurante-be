import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/order-handling/domain/events/OrderCreated.event';
import { ProductRepository } from 'src/order-handling/infraestructure/repository/ProductRepository';
import { TableService } from '../TableService';
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    private tableService: TableService,
    private productRepository: ProductRepository,
  ) {}
  async handle(event: OrderCreatedEvent) {
    this.tableService.updateStateBusy(event.table);
    this.productRepository.decreaseAmount(event.orderDetails);
  }
}
