import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Category } from '../domain/Category';
import { Order } from '../domain/Order';
import { Status } from '../domain/Status';
import { OrderState } from '../infraestructure/entity/OrderEntity';
import { OrderRepository } from '../infraestructure/repository/OrderRepository';
import { StatusRepository } from '../infraestructure/repository/StatusRepository';

@Injectable()
export class OrderService {
  constructor(
    private publisher: EventPublisher,
    private orderRepository: OrderRepository,
    private statusRepository: StatusRepository,
  ) {}
  async payment(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.payment();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }

  async getStates() {
    return await this.statusRepository.find({ order: { order: 'ASC' } });
  }
  async fisrtState() {
    const status = await this.statusRepository.firstState();
    return status;
  }
  async productMostSales({ fechaInicio, fechaFin }) {
    return await this.orderRepository.productMostSales({
      fechaInicio,
      fechaFin,
    });
  }
  async sumTotalSalesInToday() {
    return await this.orderRepository.sumTotalSalesInToday();
  }
  async getValorationNumericToUserInTodayForOrders() {
    return await this.orderRepository.getValorationNumericToUserInTodayForOrders();
  }

  async payments(orders: Order[]) {
    for (let i = 0; i < orders.length; i++) {
      const order: Order = await this.orderRepository.findById(orders[i].Id);
      const orderContext = this.publisher.mergeObjectContext(order);
      orderContext.payment();
      await this.orderRepository.updateState(orderContext);
      orderContext.commit();
    }
  }
  async listForCategories(categories: Category[]) {
    return await this.orderRepository.listForCategories(categories);
  }
  async attended(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.attended();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }
  async reject(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.reject();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }
  async create(order: any) {
    const firstState = await this.fisrtState();
    const orderDomain = Order.dtoToDomain(order, new Status(firstState));
    const orderContext = this.publisher.mergeObjectContext(orderDomain);
    orderContext.createdEvent();
    await this.orderRepository.created(orderDomain);
    orderContext.commit();
  }
  async remove(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    orderContext.remove();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }
  async inProgress(orderId: string) {
    const order: Order = await this.orderRepository.findById(orderId);
    const orderContext = this.publisher.mergeObjectContext(order);
    order.inProgress();
    await this.orderRepository.updateState(order);
    orderContext.commit();
  }
  async update(order: Order) {
    await this.orderRepository.updateOrder(order);
  }
  async tableConstainOrder(tableId: string): Promise<boolean> {
    const orders = await this.listOrdersForTable(tableId, [OrderState.CREADO]);
    return orders.length > 0;
  }
  async listOrdersForTable(
    tableId: string,
    states = [OrderState.ATENDIDO],
  ): Promise<Order[]> {
    return await this.orderRepository.listOrderOfTableAndStates(
      tableId,
      states,
    );
  }
}
