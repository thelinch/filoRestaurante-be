export interface TypeOrderProperties {
  readonly id?: string;
  readonly name: string;
  readonly color: string;
  readonly price: number;
  readonly localAttention: boolean;
}

export class TypeOrder {
  private readonly id: string;
  name: string;
  color: string;
  price: number;
  localAttention: boolean;
  constructor(properties: TypeOrderProperties) {
    Object.assign(this, properties);
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      price: this.price,
      localAttention: this.localAttention,
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
