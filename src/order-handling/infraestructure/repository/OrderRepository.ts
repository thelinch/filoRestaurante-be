import { Order } from 'src/order-handling/domain/Order';
import { OrderDetail } from 'src/order-handling/domain/OrderDetail';
import { OrderIRepository } from 'src/order-handling/domain/repository/OrderIRepository';
import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../entity/OrderEntity';

@EntityRepository(OrderEntity)
export class OrderRepository
  extends Repository<OrderEntity>
  implements OrderIRepository
{
  created: (Order: Order) => Promise<void>;
  listOrderDetailOfOrder: (orderId: number) => Promise<OrderDetail[]>;
  updateOrder: (Order: Order) => Promise<void>;
  findById: (orderId: number) => Promise<Order>;
  removed: (orderId: number) => Promise<void>;

  private modelToEntity() {}

  private entityToModel() {}
}
