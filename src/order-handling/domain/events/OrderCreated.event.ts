import { IEvent } from '@nestjs/cqrs';
import { OrderProperties } from '../Order';
import { OrderDetail } from '../OrderDetail';
import { TableOrder } from '../Table';

export class OrderCreatedEvent implements IEvent, OrderProperties {
  orderDetails: OrderDetail[];
  readonly fechaCreacion: undefined | string;
  id: string;
  resume: string;
  observation: string;
  total: number;
  table: TableOrder;
  state: string;
  /* constructor(id: string, resume: string, observation: string) {
    this.id = id;
    this.resume = resume;
    this.observation = observation;
  } */
}
