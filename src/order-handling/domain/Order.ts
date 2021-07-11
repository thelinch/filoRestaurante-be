import {
  UnprocessableEntityException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { OrderState } from '../infraestructure/entity/OrderEntity';
import { OrderBodyRequestDto } from '../interface/dto/OrderBodyRequestDto';
import { OrderAttendedEvent } from './events/OrderAttended.event';
import { OrderCreatedEvent } from './events/OrderCreated.event';
import { OrderPaymentEvent } from './events/OrderPayment.event';
import { OrderRejectEvent } from './events/OrderReject.event';
import { OrderRemovedEvent } from './events/OrderRemove.event';
import { OrderDetail } from './OrderDetail';
import { Product } from './Product';

import { TableOrder } from './Table';
export interface OrderProperties {
  id: string;
  resume: string;
  observation: string;
  total: number;
  table: TableOrder;
  fechaCreacion: undefined | string;
  orderDetails: OrderDetail[];
  state: string;
}
export class Order extends AggregateRoot {
  private id: string;
  private resume: string;
  private observation: string;
  private total: number;
  private table: TableOrder;
  private fechaCreacion: undefined | string;
  private state: string;
  private orderDetails: OrderDetail[];
  constructor(
    id: string,
    resume: string,
    observation: string,
    total: number,
    table: TableOrder,
    state: string,
    orderDetails: OrderDetail[] = [],
    fechaCreacion = undefined,
  ) {
    super();
    this.id = id;
    this.resume = resume;
    this.observation = observation;
    this.total = total;
    this.state = state;
    this.orderDetails = orderDetails;
    this.table = table;
    this.fechaCreacion = fechaCreacion;
  }

  properties() {
    return {
      id: this.id,
      resume: this.resume,
      observation: this.observation,
      total: this.total,
      table: { id: this.table?.Id, name: this.table?.Name },
      state: this.state,
      orderDetails: this.orderDetails?.map((o) => ({
        id: o.Id,
        product: {
          id: o.Product.Id,
          name: o.Product.Name,
          price: o.Product.Price,
          quantity: o.Product.Quantity,
        },
      })),
    };
  }

  get Id() {
    return this.id;
  }
  get State() {
    return this.state;
  }
  payment() {
    this.apply(Object.assign(new OrderPaymentEvent(), this.properties()));
  }

  static create(props: OrderBodyRequestDto): Order {
    const orderNew = this.dtoToDomain(props);
    Object.assign(orderNew, props);
    return orderNew;
  }
  createdEvent() {
    this.apply(Object.assign(new OrderCreatedEvent(), this.properties()));
  }

  reject() {
    if (this.state == OrderState.CREADO) {
      this.state = OrderState.RECHAZADO;
      this.apply(Object.assign(new OrderRejectEvent(), this.properties()));
      return;
    }
    throw new UnprocessableEntityException('No se puede eliminar la orden');
  }
  attended() {
    this.apply(Object.assign(new OrderAttendedEvent(), this));
  }
  remove() {
    if (this.state == OrderState.CREADO) {
      this.state = OrderState.ELIMINADO;
      this.apply(Object.assign(new OrderRemovedEvent(), this));
      return;
    }
    throw new UnprocessableEntityException('No se puede eliminar la orden');
  }
  static dtoToDomain(orderDto: OrderBodyRequestDto): Order {
    const orderDetails: OrderDetail[] = orderDto.orderDetails.map(
      (o) =>
        new OrderDetail({
          id: o.id,
          product: new Product({
            id: o.product.id,
            categories: [],
            name: o.product.name,
          }),
          orderedQuantity: o.orderedQuantity,
        }),
    );
    const tableOrder = new TableOrder({
      name: orderDto.table.name,
      orders: [],
      id: orderDto.table.id,
    });
    const order = new Order(
      orderDto.id,
      orderDto.resume,
      orderDto.observation,
      orderDto.total,
      tableOrder,
      '',
      orderDetails,
    );

    Object.assign(order, orderDto);
    return order;
  }
}
