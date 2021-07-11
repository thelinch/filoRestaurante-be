import { Product } from './Product';

export interface OrderDetailProperties {
  readonly id: string;
  readonly product: Product;
  readonly orderedQuantity: number;
}

export class OrderDetail {
  private id: string;
  private product: Product;
  private orderedQuantity: number;
  constructor(props: OrderDetailProperties) {
    this.id = props.id;
    this.product = props.product;
    this.orderedQuantity = props.orderedQuantity;
  }
  get Id(): string {
    return this.id;
  }
  get Product(): Product {
    return this.product;
  }
  get OrderedQuantity(): number {
    return this.orderedQuantity;
  }
}
