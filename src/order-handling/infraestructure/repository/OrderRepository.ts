import { Category } from 'src/order-handling/domain/Category';
import { Order } from 'src/order-handling/domain/Order';
import { OrderDetail } from 'src/order-handling/domain/OrderDetail';
import { Product } from 'src/order-handling/domain/Product';
import { OrderIRepository } from 'src/order-handling/domain/repository/OrderIRepository';
import { TableOrder } from 'src/order-handling/domain/Table';
import { EntityRepository, Repository } from 'typeorm';
import { OrderDetailEntity } from '../entity/OrderDetailEntity';
import { OrderEntity, OrderState } from '../entity/OrderEntity';
import { TableEntity } from '../entity/TableEntity';
import util from '../util/util';
@EntityRepository(OrderEntity)
export class OrderRepository
  extends Repository<OrderEntity>
  implements OrderIRepository
{
  async updateState(order: Pick<Order, 'Id' | 'State'>): Promise<void> {
    const orderEntity = new OrderEntity();
    orderEntity.id = order.Id;
    orderEntity.state = order.State;
    await this.save(orderEntity);
  }
  async created(order: Order): Promise<void> {
    await this.save(util.domainOrderToOrderEntity(order));
  }
  async listOrderDetailOfOrder(orderId: number): Promise<OrderDetail[]> {
    const order = await this.findOne({
      relations: ['OrderDetailEntity', 'OrderDetailEntity.product'],
      where: { id: orderId },
    });
    return order.orderDetails.map((o) => util.orderDetailEntityToModel(o));
  }
  async listForCategories(categories: Category[]): Promise<Order[]> {
    const orders: OrderEntity[] = await this.createQueryBuilder()
      .select('order')
      .from(OrderEntity, 'order')
      .leftJoinAndSelect("order.table","table")
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('category.id IN(:...categoriesId)', {
        categoriesId: categories.map((c) => c.Id),
      })
      .getMany();
      console.log("q",orders)
    return orders.map((o) => util.orderEntityToOrderDomain(o));
  }

  async listOrderOfTable(tableId: string): Promise<Order[]> {
    const table: TableEntity = await this.createQueryBuilder()
      .select('')
      .from(TableEntity, 'table')
      .leftJoinAndSelect('table.orders', 'order')
      .where('order.fechaCreacion=:fechaCreacion', {
        fechaCreacion: new Date(),
      })
      .andWhere('order.state in(...:statesOrder)', {
        stateOrder: [
          OrderState.ATENDIDO,
          OrderState.CREADO,
          OrderState.ENREALIZACION,
        ],
      })
      .andWhere('table.id=:tableId', { tableId: tableId })

      .getOne();
    return table.orders.map((o) => util.orderEntityToOrderDomain(o));
  }
  async updateOrder(order: Omit<Order, 'state'>): Promise<void> {
    const orderEntity = util.domainOrderToOrderEntity(order);
    await this.save(orderEntity);
  }
  async findById(orderId: string): Promise<Order> {
    const orderEntity = await this.findOne({ id: orderId });
    return orderEntity ? util.orderEntityToOrderDomain(orderEntity) : undefined;
  }
  async removed(orderId: string): Promise<void> {
    await this.save({ id: orderId, state: OrderState.ELIMINADO });
  }
}
