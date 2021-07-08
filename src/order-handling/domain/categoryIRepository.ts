import { Category } from './Category';

export interface CategoryIRepository {
  save: (category: Category | Category[]) => Promise<void>;
  findById: (id: string) => Promise<Category | undefined>;
  list: () => Promise<Category[]>;
}
