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
  user: any;
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
  private type: {
    color: string;
    id: string;
    name: string;
    price: number;
    localAttention: boolean;
  };
  user: any;
  constructor(
    id: string,
    resume: string,
    observation: string,
    total: number,
    table: TableOrder,
    state: string,
    type: {
      color: string;
      id: string;
      name: string;
      price: number;
      localAttention: boolean;
    },
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
    this.type = type;
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
        product: o.Product.properties(),
        orderedQuantity: o.OrderedQuantity,
        observation: o.Observation,
      })),
      type: this.type,
      user: this.user,
    };
  }

  get Id() {
    return this.id;
  }
  get State() {
    return this.state;
  }
  payment() {
    this.state = OrderState.PAGADO;
    this.apply(Object.assign(new OrderPaymentEvent(), this));
  }

  static create(props: OrderBodyRequestDto): Order {
    const orderNew = this.dtoToDomain(props);
    return orderNew;
  }
  createdEvent() {
    this.apply(Object.assign(new OrderCreatedEvent(), this));
  }

  reject() {
    if (this.state == OrderState.CREADO) {
      this.state = OrderState.RECHAZADO;
      this.apply(Object.assign(new OrderRejectEvent(), this));
      return;
    }
    throw new UnprocessableEntityException('No se puede eliminar la orden');
  }
  attended() {
    this.state = OrderState.ATENDIDO;
    this.apply(Object.assign(new OrderAttendedEvent(), this));
  }
  inProgress() {
    this.state = OrderState.ENREALIZACION;
    //this.apply(Object.assign(new OrderAttendedEvent(), this));
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
            categories: o.product.categories,
            name: o.product.name,
            price: o.product.price,
          }),
          orderedQuantity: o.orderedQuantity,
          observation: o.observation,
        }),
    );
    const totalPayment =
      orderDetails.reduce((prev, curr) => {
        prev += curr.Product.Price * curr.OrderedQuantity;
        return prev;
      }, 0) + orderDto.type.price;
    const tableOrder = !orderDto.type.localAttention
      ? null
      : new TableOrder({
          name: orderDto.table.name,
          orders: [],
          id: orderDto.table.id,
        });
    const observation = orderDetails
      .filter((order) => order.Observation)
      .map(
        (orderDetail) =>
          `${orderDetail.Product.Name}(${orderDetail.Observation})`,
      )
      .join(',');
    const order = new Order(
      orderDto.id,
      orderDetails
        .map((od) => `${od.Product.Name}(${od.OrderedQuantity})`)
        .join('*'),
      observation,
      totalPayment,
      tableOrder,
      OrderState.CREADO,
      orderDto.type,
      orderDetails,
      undefined,
    );
    order.user = orderDto.user;

    return order;
  }
}
