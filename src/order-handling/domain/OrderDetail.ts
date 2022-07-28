import { Product } from './Product';
import { Status } from './Status';

export interface OrderDetailProperties {
  readonly id: string;
  readonly product: Product;
  readonly orderedQuantity: number;
  readonly observation: string;
  readonly status: Status;
}

export class OrderDetail {
  private id: string;
  private product: Product;
  private orderedQuantity: number;
  private observation: string;
  private status: Status;
  constructor(props: OrderDetailProperties) {
    this.id = props.id;
    this.product = props.product;
    this.orderedQuantity = props.orderedQuantity;
    this.observation = props.observation;
    this.status = props.status;
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
  get Status() {
    return this.status;
  }
}
