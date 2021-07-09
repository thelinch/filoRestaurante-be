import { IEvent } from '@nestjs/cqrs';
import { OrderProperties } from '../Order';
import { OrderDetail } from '../OrderDetail';
import { TableOrder } from '../Table';

export class OrderPaymentEvent implements IEvent, Readonly<OrderProperties> {
  orderDetails: OrderDetail[];
  readonly id: string;
  readonly resume: string;
  readonly observation: string;
  readonly total: number;
  readonly table: TableOrder;
  readonly state: string;

}
