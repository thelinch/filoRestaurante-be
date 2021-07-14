import { Action } from './Action';

export interface RoleProperties {
  readonly id: string;
  readonly name: string;
  readonly actions: Action[];
}
export class Role {
  id: string;
  name: string;
  actions: Action[];
  constructor(props: RoleProperties) {
    Object.assign(this, props);
  }
  properties() {
    return {
      id: this.id,
      name: this.name,
      actions: this.actions.map((a) => a.properties()),
    };
  }
}
