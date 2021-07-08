import { Order } from '../Order';
import { TableOrder } from '../Table';

export interface TableIRepository {
  save: (table: TableOrder) => Promise<void>;
  remove: (table: TableOrder) => Promise<void>;
  update: (table: TableOrder) => Promise<void>;
  listOrderOfTable: (tableId: string) => Promise<Order[]>;
}
