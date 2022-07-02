import { IEvent } from '@nestjs/cqrs';
import { OrderProperties } from '../Order';
import { OrderDetail } from '../OrderDetail';
import { TableOrder } from '../Table';

export class OrderAttendedEvent implements IEvent, OrderProperties {
  orderDetails: OrderDetail[];
  readonly id: string;
  readonly fechaCreacion: undefined | string;
  readonly resume: string;
  readonly observation: string;
  readonly total: number;
  readonly table: TableOrder;
  readonly state: string;
  readonly user: any;
  readonly code: string;
}
