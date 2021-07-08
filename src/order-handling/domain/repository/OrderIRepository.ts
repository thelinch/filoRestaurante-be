import { Order } from '../Order';
import { OrderDetail } from '../OrderDetail';

export interface OrderIRepository {
  save: (Order: Order) => Promise<void>;
  listOrderDetailOfOrder: (orderId: number) => Promise<OrderDetail[]>;
  updateOrder: (Order: Order) => Promise<void>;
  findById: (orderId: number) => Promise<Order>;
  remove: (orderId: number) => Promise<void>;
}
