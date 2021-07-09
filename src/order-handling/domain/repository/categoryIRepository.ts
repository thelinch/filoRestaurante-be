import { CategoryEntity } from 'src/order-handling/infraestructure/entity/CategoryEntity';
import { Category } from '../Category';

export interface CategoryIRepository {
  created: (category: Category | Category[]) => Promise<void>;
  findById: (id: string) => Promise<Category | undefined>;
  list: () => Promise<Category[]>;
  removed: (categoryId: string) => Promise<void>;
}
