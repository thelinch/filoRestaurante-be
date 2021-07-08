export interface TableProperties {
  id: string;
  name: string;
}

export class TableOrder {
  private readonly id: string;
  private name: string;
  constructor(props: TableProperties) {
    Object.assign(this, props);
  }
  properties(): TableProperties {
    return { id: this.id, name: this.name };
  }

  get Name() {
    return this.name;
  }
  get Id() {
    return this.id;
  }
}
