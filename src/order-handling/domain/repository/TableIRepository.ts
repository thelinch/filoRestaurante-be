import { Order } from '../Order';
import { TableOrder } from '../Table';

export interface TableIRepository {
  created: (table: TableOrder) => Promise<void>;
  removed: (tableId: string) => Promise<void>;
  list: () => Promise<TableOrder[]>;
  updated: (table: Omit<TableOrder, 'State'>) => Promise<void>;
  updatedState: (table: Pick<TableOrder, 'State' | 'Id'>) => Promise<void>;
  listOrderOfTable: (tableId: string) => Promise<Order[]>;
}
