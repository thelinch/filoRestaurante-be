import * as moment from 'moment';
import { Category } from 'src/order-handling/domain/Category';
import { Order } from 'src/order-handling/domain/Order';
import { OrderDetail } from 'src/order-handling/domain/OrderDetail';
import { Product } from 'src/order-handling/domain/Product';
import { OrderIRepository } from 'src/order-handling/domain/repository/OrderIRepository';
import { TableOrder } from 'src/order-handling/domain/Table';
import { EntityRepository, Repository } from 'typeorm';
import { OrderDetailEntity } from '../entity/OrderDetailEntity';
import { OrderEntity, OrderState } from '../entity/OrderEntity';
import { ProductEntity } from '../entity/ProductEntity';
import { TableEntity } from '../entity/TableEntity';
import util from '../util/util';
import { getConnection } from 'typeorm';

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
    await this.save({
      ...util.domainOrderToOrderEntity(order),
      fechaCreacion: new Date(),
    });
  }
  async listOrderDetailOfOrder(orderId: number): Promise<OrderDetail[]> {
    const order = await this.findOne({
      relations: ['OrderDetailEntity', 'OrderDetailEntity.product'],
      where: { id: orderId },
    });
    return order.orderDetails.map((o) => util.orderDetailEntityToModel(o));
  }

  async sumTotalSalesInToday(): Promise<number> {
    const { sum = 0 } = await this.createQueryBuilder('OrderEntity')
      .select('sum(OrderEntity.total)', 'sum')
      .where('OrderEntity.fechaCreacion=:fechaCreacion', {
        fechaCreacion: moment().format('YYYY-MM-DD'),
      })
      .andWhere('OrderEntity.state=:state', { state: OrderState.PAGADO })
      .getRawOne();
    return sum;
  }

  async productMostSales({ fechaInicio = moment(), fechaFin = moment() }) {
    const fechaInicioMoment = moment(fechaInicio);
    const fechaFinMoment = moment(fechaFin);
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const data = await queryRunner.query(
      "select p.name as productName,sum(od.orderedQuantity) totalOrderQuantity,DATE_FORMAT(o.fechaCreacion,'%Y-%m-%d') fechaCreacion from product p inner  JOIN orderdetail od on od.productId=p.id inner join `order` o on o.id=od.orderId where o.fechaCreacion BETWEEN '" +
        fechaInicioMoment.format('YYYY-MM-DD') +
        "' and '" +
        fechaFinMoment.format('YYYY-MM-DD') +
        "' GROUP BY p.name,o.fechaCreacion",
    );
    await queryRunner.release();
    return data;
  }

  async getValorationNumericToUserInTodayForOrders() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const data = await queryRunner.query(
      "select o.fechaCreacion,SUM(o.total) totalVentas,u.`name` as userName from `order` o inner join user_entity u on u.id=o.userId where o.state='pagado' and o.fechaCreacion='" +
        moment().format('YYYY-MM-DD') +
        "' GROUP BY u.name,o.fechaCreacion",
    );
    await queryRunner.release();

    return data;
  }

  async listForCategories(categories: Category[]): Promise<Order[]> {
    const orders: OrderEntity[] = await this.createQueryBuilder()
      .select('order')
      .from(OrderEntity, 'order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.table', 'table')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('category.id IN(:...categoriesId)', {
        categoriesId: categories.map((c) => c.Id),
      })
      .andWhere('order.fechaCreacion=:fechaCreacion', {
        fechaCreacion: moment().format('YYYY-MM-DD'),
      })
      .orderBy('order.created_at')
      .getMany();
    console.log('q', orders);
    return orders.map((o) => util.orderEntityToOrderDomain(o));
  }

  async listOrderOfTableAndStates(
    tableId: string,
    states: OrderState[] = [],
  ): Promise<Order[]> {
    const table: TableEntity = await this.createQueryBuilder()
      .select('table')
      .from(TableEntity, 'table')
      .leftJoinAndSelect('table.orders', 'order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .where('order.fechaCreacion=:fechaCreacion', {
        fechaCreacion: moment().format('YYYY-MM-DD'),
      })
      .andWhere('order.state in(:...statesOrder)', {
        statesOrder: states,
      })
      .andWhere('table.id=:tableId', { tableId: tableId })
      .orderBy('order.fechaCreacion')
      .getOne();
    return table
      ? table.orders.map((o) =>
          util.orderEntityToOrderDomain({ ...o, table: table }),
        )
      : [];
  }
  async updateOrder(order: Omit<Order, 'state'>): Promise<void> {
    const orderEntity = util.domainOrderToOrderEntity(order);
    await this.save(orderEntity);
  }
  async findById(orderId: string): Promise<Order> {
    const orderEntity = await this.findOne({
      relations: ['orderDetails', 'orderDetails.product', 'table', 'user'],
      where: { id: orderId },
    });
    return orderEntity ? util.orderEntityToOrderDomain(orderEntity) : undefined;
  }
  async removed(orderId: string): Promise<void> {
    await this.save({ id: orderId, state: OrderState.ELIMINADO });
  }
}
