import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderRemovedEvent } from '../../domain/events/OrderRemove.event';
import { ProductRepository } from '../../infraestructure/repository/ProductRepository';
import { TableService } from '../TableService';
//TODO: falta ver si se remueve una orden verificar si no tiene mas pedidos ,para desocupar la mesa
@EventsHandler(OrderRemovedEvent)
export class OrderRemoveHandler implements IEventHandler<OrderRemovedEvent> {
  constructor(
    private tableService: TableService,
    private productRepository: ProductRepository,
  ) {}
  handle(event: OrderRemovedEvent) {
    this.productRepository.increaseQuantity(event.orderDetails);
    //this.tableService.updateStateNotBusy(event.table);
  }
}
