import { OrderState } from '../../infraestructure/entity/OrderEntity';
import { Category } from '../Category';
import { Order } from '../Order';
import { OrderDetail } from '../OrderDetail';

export interface OrderIRepository {
  created: (Order: Order) => Promise<void>;
  listOrderDetailOfOrder: (orderId: number) => Promise<OrderDetail[]>;
  updateOrder: (Order: Omit<Order, 'state'>) => Promise<void>;
  findById: (orderId: string) => Promise<Order | undefined>;
  removed: (orderId: string) => Promise<void>;
  updateState: (order: Pick<Order, 'Id' | 'State'>) => Promise<void>;
  listOrderOfTableAndStates: (
    tableId: string,
    states: OrderState[],
  ) => Promise<Order[]>;
  listForCategories: (categories: Category[]) => Promise<Order[]>;
}
