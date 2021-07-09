import { OrderDetail } from 'src/order-handling/domain/OrderDetail';
import { Product } from 'src/order-handling/domain/Product';
import { ProductIRepository } from 'src/order-handling/domain/repository/ProductIRepository';
import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity, ProductState } from '../entity/ProductEntity';
import util from '../util/util';
@EntityRepository(ProductEntity)
export class ProductRepository
  extends Repository<ProductEntity>
  implements ProductIRepository
{
  async created(product: Product): Promise<void> {
    const productInstance: ProductEntity = util.productDomainToEntity(product);
    await this.save(productInstance);
  }
  async removed(productId: string): Promise<void> {
    await this.save({ id: productId, state: ProductState.DESACTIVADO });
  }
  async updated(product: Product): Promise<void> {
    const productInstance: ProductEntity = util.productDomainToEntity(product);
    await this.save(productInstance);
  }
  async decreaseAmount(orderDetails: OrderDetail[]): Promise<void> {
    for (let index = 0; index < orderDetails.length; index++) {
      const orderDetail = orderDetails[index];
      await this.decrement(
        { id: orderDetail.Product.Id },
        'quantity',
        orderDetail.OrderedQuantity,
      );
    }
  }
  async increaseQuantity(orderDetails: OrderDetail[]): Promise<void> {
    for (let index = 0; index < orderDetails.length; index++) {
      const orderDetail = orderDetails[index];
      await this.increment(
        { id: orderDetail.Product.Id },
        'quantity',
        orderDetail.OrderedQuantity,
      );
    }
  }
}
