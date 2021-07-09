import { IEvent } from '@nestjs/cqrs';
import { Order } from '../Order';
import { TableProperties } from '../Table';

export class TableBusyEvent implements IEvent, TableProperties {
  id: string;
  name: string;
  orders: Order[];
  state: string;
}
