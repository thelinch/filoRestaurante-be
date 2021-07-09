import { OrderDetail } from '../OrderDetail';
import { Product } from '../Product';

export interface ProductIRepository {
  created: (product: Product) => Promise<void>;
  removed: (productId: string) => Promise<void>;
  updated: (product: Product) => Promise<void>;
  decreaseAmount: (orderDetails: OrderDetail[]) => Promise<void>;
  increaseQuantity: (orderDetails: OrderDetail[]) => Promise<void>;
}
