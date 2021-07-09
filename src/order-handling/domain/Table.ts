import { Order } from './Order';

export interface TableProperties {
  id: string;
  name: string;
  orders: Order[];
}

export class TableOrder {
  private  id: string;
  private name: string;
  private orders: Order[];
  constructor(props: TableProperties) {
    Object.assign(this, props);
  }
  properties(): TableProperties {
    return { id: this.id, name: this.name, orders: this.orders };
  }

  get Name() {
    return this.name;
  }
  get Id() {
    return this.id;
  }
  get Orders() {
    return this.orders;
  }
}
