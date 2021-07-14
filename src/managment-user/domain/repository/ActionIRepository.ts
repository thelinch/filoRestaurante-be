import { Action } from '../Action';

export interface actionIRepository {
  created: (action: Action) => Promise<void>;
  list: () => Promise<Action[]>;
}
