import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../../../order-handling/domain/events/OrderCreated.event';
import { ProductRepository } from '../../../order-handling/infraestructure/repository/ProductRepository';
import { TableService } from '../TableService';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  @WebSocketServer()
  server: Server;
  constructor(
    private tableService: TableService,
    private productRepository: ProductRepository,
  ) {}
  async handle(event: OrderCreatedEvent) {
    this.tableService.updateStateBusy(event.table);
    this.productRepository.decreaseAmount(event.orderDetails);
    this.server.emit('reciveOrder', event);
  }
}
