import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderRejectEvent } from 'src/order-handling/domain/events/OrderReject.event';
import { ProductRepository } from 'src/order-handling/infraestructure/repository/ProductRepository';
import { TableService } from '../TableService';
//TODO: falta ver si se remueve una orden verificar si no tiene mas pedidos ,para desocupar la mesa
@EventsHandler(OrderRejectEvent)
export class OrderRejectHandler implements IEventHandler<OrderRejectEvent> {
  constructor(
    private tableService: TableService,
    private productRepository: ProductRepository,
  ) {}
  handle(event: OrderRejectEvent) {
    this.productRepository.increaseQuantity(event.orderDetails);
    //this.tableService.updateStateNotBusy(event.table);
  }
}
