import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Category } from '../domain/Category';
import { Order } from '../domain/Order';
import { OrderRepository } from '../infraestructure/repository/OrderRepository';

@Injectable()
export class OrderService {
  constructor(
    private publisher: EventPublisher,
    private orderRepository: OrderRepository,
  ) {}
  async payment(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.payment();
    await this.orderRepository.updateOrder(order);
    orderContext.commit();
  }

  async listForCategories(categories: Category[]) {
    return await this.orderRepository.listForCategories(categories);
  }
  async attended(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.attended();
    await this.orderRepository.updateOrder(order);
    orderContext.commit();
  }
  async reject(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.reject();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }
  async create(order: Order) {
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.createdEvent();
    await this.orderRepository.created(order);
    orderContext.commit();
  }
  async remove(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.remove();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }
  async update(order: Order) {
    await this.orderRepository.updateOrder(order);
  }
  async listOrdersForTable(tableId: string): Promise<Order[]> {
    return await this.orderRepository.listOrderOfTable(tableId);
  }
}
