import { Role } from '../Role';

export interface roleIRepository {
  created: (role: Role) => Promise<void>;
  list: () => Promise<Role[]>;
}
