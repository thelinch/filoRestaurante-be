import { Order } from '../Order';
import { OrderDetail } from '../OrderDetail';

export interface OrderIRepository {
  created: (Order: Order) => Promise<void>;
  listOrderDetailOfOrder: (orderId: number) => Promise<OrderDetail[]>;
  updateOrder: (Order: Order) => Promise<void>;
  findById: (orderId: number) => Promise<Order>;
  removed: (orderId: number) => Promise<void>;
}
