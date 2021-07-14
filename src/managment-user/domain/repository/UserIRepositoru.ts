import { User } from '../User';

export interface userIRepository {
  created: (user: User) => Promise<void>;
  updateState: (user: Pick<User, 'id' | 'state'>) => Promise<void>;
  findbyUserAndPassword: (
    user: Pick<User, 'password' | 'userName'>,
  ) => Promise<User | undefined>;
  list: () => Promise<User[]>;
}
