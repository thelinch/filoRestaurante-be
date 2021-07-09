import { AggregateRoot } from '@nestjs/cqrs';
import { OrderAttendedEvent } from './events/OrderAttended.event';
import { OrderCreatedEvent } from './events/OrderCreated.event';
import { OrderPaymentEvent } from './events/OrderPayment.event';
import { OrderRejectEvent } from './events/OrderReject.event';
import { OrderRemovedEvent } from './events/OrderRemove.event';
import { OrderDetail } from './OrderDetail';

import { TableOrder } from './Table';
export interface OrderProperties {
  id: string;
  resume: string;
  observation: string;
  total: number;
  table: TableOrder;
  orderDetails: OrderDetail[];
  state: string;
}
export class Order extends AggregateRoot {
  private readonly id: string;
  private resume: string;
  private observation: string;
  private total: number;
  private table: TableOrder;
  private state: string;
  private orderDetails: OrderDetail[];
  constructor() {
    super();
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

  payment() {
    this.apply(Object.assign(new OrderPaymentEvent(), this));
  }

  static create(props: OrderProperties): Order {
    const orderNew = new Order();
    Object.assign(orderNew, props);
    return orderNew;
  }
  createdEvent() {
    this.apply(Object.assign(new OrderCreatedEvent(), this.properties()));
  }
  reject() {
    this.apply(Object.assign(new OrderRejectEvent(), this));
  }
  attended() {
    this.apply(Object.assign(new OrderAttendedEvent(), this));
  }
  remove() {
    this.apply(Object.assign(new OrderRemovedEvent(), this));
  }
}
