import { TableState } from '../infraestructure/entity/TableEntity';
import { Order } from './Order';

export interface TableProperties {
  id: string;
  name: string;
 
  orders: Order[];
  state: string;
}

export class TableOrder {
  private id: string;
  private name: string;
  private orders: Order[];
  private state: string;
  constructor(props: Partial<TableProperties>) {
    Object.assign(this, props);
  }
  properties(): TableProperties {
    return {
      id: this.id,
      name: this.name,
      orders: this.orders,
      state: this.state,
     
    };
  }
  occupy() {
    this.state = TableState.OCUPADO;
  }
  vacate() {
    this.state = TableState.DISPONIBLE;
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

  get State() {
    return this.state;
  }

}
