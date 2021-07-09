import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Order } from '../domain/Order';

//TODO
@Injectable()
export class OrderService {
  constructor(private publisher: EventPublisher) {}
  create(order: Order) {
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.createdEvent();
    orderContext.commit();
  }
}
