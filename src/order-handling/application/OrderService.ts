import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Order } from '../domain/Order';
import { OrderRepository } from '../infraestructure/repository/OrderRepository';

//TODO
@Injectable()
export class OrderService {
  constructor(
    private publisher: EventPublisher,
    private orderRepository: OrderRepository,
  ) {}
  async create(order: Order) {
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.createdEvent();
    await this.orderRepository.created(order);
    orderContext.commit();
  }
}
