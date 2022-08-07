import { Category } from '../../domain/Category';
import { Order } from '../../domain/Order';
import { OrderDetail } from '../../domain/OrderDetail';
import { Product } from '../../domain/Product';
import { Status, StatusProperties } from '../../domain/Status';
import { TableOrder } from '../../domain/Table';
import { TypeOrder } from '../../domain/TypeOrder';
import { CategoryEntity } from '../entity/CategoryEntity';
import { OrderDetailEntity } from '../entity/OrderDetailEntity';
import { OrderEntity } from '../entity/OrderEntity';
import { ProductEntity } from '../entity/ProductEntity';
import { TableEntity } from '../entity/TableEntity';
import { TypeOrderEntity } from '../entity/TypeOrderEntity';

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
      name: orderDetailEntity.product?.name,
      id: orderDetailEntity.product?.id,
      price: orderDetailEntity.product?.price,
      categories: orderDetailEntity.product?.categories
        ? orderDetailEntity.product.categories.map((c) =>
            util.categoryEntityToDomain(c),
          )
        : [],
    });
    const status = new Status({ ...orderDetailEntity.status });
    const orderDetail = new OrderDetail({
      product: product,
      orderedQuantity: orderDetailEntity.orderedQuantity,
      id: orderDetailEntity.id,
      observation: orderDetailEntity.observation,
      status,
    });
    return orderDetail;
  },
  orderEntityToOrderDomain: function (orderEntity: OrderEntity): Order {
    const tableOrder = new TableOrder({
      id: orderEntity.table?.id,
      name: orderEntity.table?.name,
    });
    const orderDetails: OrderDetail[] = orderEntity.orderDetails.map((o) =>
      this.orderDetailEntityToModel(o),
    );
    const statusProperties: StatusProperties = { ...orderEntity.status };
    const status = new Status(statusProperties);
    const orderDomain = new Order(
      orderEntity.id,
      orderEntity.resume,
      orderEntity.observation,
      orderEntity.total,
      tableOrder,
      orderEntity.code,
      status,
      orderEntity.type,
      orderDetails,
    );
    orderDomain.user = { name: orderEntity.user.name };
    return orderDomain;
  },

  //TABLE
  entityTableToTableDomain: function (tableEntity: TableEntity): TableOrder {
    const tableOrder = new TableOrder({
      id: tableEntity.id,
      name: tableEntity.name,
      state: tableEntity.state,
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
    const categoriesDomain = product.categories?.map((c) =>
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

  typeOrderEntityToDomain: function (entity: TypeOrderEntity): TypeOrder {
    return new TypeOrder(entity);
  },
  typeOrderDomainToEntity: function (entity: TypeOrder): TypeOrderEntity {
    const properties = entity.properties();
    return { ...properties };
  },
};
export default util;
