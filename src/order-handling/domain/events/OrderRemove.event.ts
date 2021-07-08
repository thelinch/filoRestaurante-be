import { IEvent } from '@nestjs/cqrs';
import { OrderProperties } from '../Order';
import { TableOrder } from '../Table';

export class OrderRemovedEvent implements IEvent, Readonly<OrderProperties> {
  readonly id: string;
  readonly resume: string;
  readonly observation: string;
  readonly total: number;
  readonly table: TableOrder;
  readonly state: string;
}
