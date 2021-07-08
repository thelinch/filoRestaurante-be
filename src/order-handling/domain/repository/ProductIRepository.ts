import { Product } from '../Product';

export interface ProductIRepository {
  save: (product: Product) => Promise<void>;
  remove: (product: Product) => Promise<void>;
  update: (product: Product) => Promise<void>;
  decreaseAmount: (products: Product[]) => Promise<void>;
  increaseQuantity: (products: Product[]) => Promise<void>;
}
