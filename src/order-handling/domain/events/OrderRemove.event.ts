import { IEvent } from '@nestjs/cqrs';
import { OrderProperties } from '../Order';
import { OrderDetail } from '../OrderDetail';
import { TableOrder } from '../Table';

export class OrderRemovedEvent implements IEvent, OrderProperties {
  readonly id: string;
  readonly fechaCreacion: undefined | string;
  readonly resume: string;
  readonly observation: string;
  readonly total: number;
  readonly table: TableOrder;
  readonly state: string;
  readonly orderDetails: OrderDetail[];
  readonly user: any;
}
