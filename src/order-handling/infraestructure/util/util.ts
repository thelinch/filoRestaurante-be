import { Category } from 'src/order-handling/domain/Category';
import { Order } from 'src/order-handling/domain/Order';
import { OrderDetail } from 'src/order-handling/domain/OrderDetail';
import { Product } from 'src/order-handling/domain/Product';
import { TableOrder } from 'src/order-handling/domain/Table';
import { CategoryEntity } from '../entity/CategoryEntity';
import { OrderDetailEntity } from '../entity/OrderDetailEntity';
import { OrderEntity } from '../entity/OrderEntity';
import { ProductEntity } from '../entity/ProductEntity';
import { TableEntity } from '../entity/TableEntity';

const util = {
  domainOrderToOrderEntity: function (order: Partial<Order>): OrderEntity {
    const orderInstance = new OrderEntity();
    Object.assign(orderInstance, order.properties());
    return orderInstance;
  },
  orderDetailEntityToModel: function (
    orderDetailEntity: OrderDetailEntity,
  ): OrderDetail {
    const product = new Product({
      name: orderDetailEntity.product.id,
      id: orderDetailEntity.product.id,
    });
    const orderDetail = new OrderDetail({
      product: product,
      orderedQuantity: orderDetailEntity.orderedQuantity,
      id: orderDetailEntity.id,
    });
    return orderDetail;
  },
  orderEntityToOrderDomain: function (orderEntity: OrderEntity): Order {
    const tableOrder = new TableOrder({
      id: orderEntity.table.id,
      name: orderEntity.table.name,
    });
    const orderDetails: OrderDetail[] = orderEntity.orderDetails.map((o) =>
      this.orderDetailEntityToModel(o),
    );
    const orderDomain = new Order(
      orderEntity.id,
      orderEntity.resume,
      orderEntity.observation,
      orderEntity.total,
      tableOrder,
      orderEntity.state,
      orderDetails,
    );
    return orderDomain;
  },

  //TABLE
  entityTableToTableDomain: function (tableEntity: TableEntity): TableOrder {
    const tableOrder = new TableOrder({
      id: tableEntity.id,
      name: tableEntity.name,
      orders: tableEntity.orders?.map((o) => util.orderEntityToOrderDomain(o)),
    });
    return tableOrder;
  },
  tableDomainToTableEntity: function (table: Partial<TableOrder>): TableEntity {
    const tableEntityInstance = new TableEntity();
    Object.assign(tableEntityInstance, table.properties());
    return tableEntityInstance;
  },
  productDomainToEntity: function (product: Product): ProductEntity {
    const productEntityInstance = new ProductEntity();
    Object.assign(productEntityInstance, product.properties());
    return productEntityInstance;
  },
  productEntityToDomain: function (product: ProductEntity): Product {
    const categoriesDomain = product.categories.map((c) =>
      util.categoryEntityToDomain(c),
    );
    const productDomainInstance = new Product({
      ...product,
      categories: categoriesDomain,
    });
    return productDomainInstance;
  },
  categoryEntityToDomain: function (entity: CategoryEntity): Category {
    return new Category(entity);
  },
  categoryDomainToEntity: function (category: Category): CategoryEntity {
    const properties = category.properties();
    return { ...properties };
  },
};
export default util;
