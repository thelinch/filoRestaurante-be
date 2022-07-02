import { Product } from './Product';

export interface OrderDetailProperties {
  readonly id: string;
  readonly product: Product;
  readonly orderedQuantity: number;
  readonly observation: string;
}

export class OrderDetail {
  private id: string;
  private product: Product;
  private orderedQuantity: number;
  private observation: string;
  constructor(props: OrderDetailProperties) {
    this.id = props.id;
    this.product = props.product;
    this.orderedQuantity = props.orderedQuantity;
    this.observation = props.observation;
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
  get Observation() {
    return this.observation;
  }
}
