export interface ActionProperties {
  readonly id: string;
  readonly name: string;
}
export class Action {
  private id: string;
  private name: string;
  constructor(props: ActionProperties) {
    Object.assign(this, props);
  }
  properties(): ActionProperties {
    return {
      id: this.id,
      name: this.name,
    };
  }
  get Id() {
    return this.id;
  }
  get Name() {
    return this.name;
  }
}
