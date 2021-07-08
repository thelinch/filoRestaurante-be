import { Product } from './Product';

export interface OrderDetailProperties {
  readonly id: string;
  readonly product: Product;
}

export class OrderDetail {
  private readonly id: string;
  private product: Product;
  constructor(props: OrderDetailProperties) {
    Object.assign(this, props);
  }
  get Id(): string {
    return this.id;
  }
  get Product(): Product {
    return this.product;
  }
}
