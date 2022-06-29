export interface TypeOrderProperties {
  readonly id?: string;
  readonly name: string;
  readonly color: string;
  readonly price: number;
}

export class TypeOrder {
  private readonly id: string;
  name: string;
  color: string;
  price: number;
  constructor(properties: TypeOrderProperties) {
    Object.assign(this, properties);
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      price: this.price,
    };
  }
  get Id(): string {
    return this.id;
  }
  get Name(): string {
    return this.name;
  }
  get Color(): string {
    return this.color;
  }
  get Price(): number {
    return this.price;
  }
}
