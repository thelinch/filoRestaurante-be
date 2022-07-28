export interface StatusProperties {
  readonly id: string;
  readonly name: string;
  readonly color: string;
  readonly order: number;
}

export class Status {
  private readonly id: string;
  private name: string;
  private color: string;
  constructor(properties: StatusProperties) {
    Object.assign(this, properties);
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
    };
  }
  get Id(): string {
    return this.id;
  }
  get Name(): string {
    return this.name;
  }
}
