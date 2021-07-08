import { IEvent } from '@nestjs/cqrs';
import { Order } from '../Order';
import { TableProperties } from '../Table';

export class TableDesocupiedEvent implements IEvent, TableProperties {
  id: string;
  name: string;
  orders: Order[];
}
