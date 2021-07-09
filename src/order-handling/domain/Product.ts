import { AggregateRoot } from '@nestjs/cqrs';
import { Category } from './Category';

export interface ProductProperties {
  id: string;
  name: string;
  quantity: number;
  price: number;
  categories: Category[];
}

export class Product extends AggregateRoot {
  private id: string;
  private name: string;
  private quantity: number;
  private price: number;
  private categories: Category[];
  constructor(props: Partial<ProductProperties>) {
    super();
    Object.assign(this, props);
  }

  properties(): ProductProperties {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      price: this.price,
      categories: this.categories,
    };
  }
  get Id(): string {
    return this.id;
  }
  get Name(): string {
    return this.name;
  }

  get Quantity(): number {
    return this.quantity;
  }
  get Price(): number {
    return this.price;
  }
  get Categories(): Category[] {
    return this.categories;
  }
}
