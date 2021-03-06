import { Category } from '../../domain/Category';
import { CategoryIRepository } from '../../domain/repository/categoryIRepository';
import { EntityRepository, Repository } from 'typeorm';
import { CategoryEntity, CategoryState } from '../entity/CategoryEntity';
import util from '../util/util';
@EntityRepository(CategoryEntity)
export class CategoryRepository
  extends Repository<CategoryEntity>
  implements CategoryIRepository
{
  async created(category: Category | Category[]): Promise<void> {
    const models = Array.isArray(category) ? category : [category];
    const entities = models.map((m) => util.categoryDomainToEntity(m));
    await this.save(entities);
  }
  async findById(id: string): Promise<Category | undefined> {
    const entity = await this.findOne({ id: id });
    return entity ? util.categoryEntityToDomain(entity) : undefined;
  }
  async list(): Promise<Category[]> {
    const categoriesEntity = await this.find({
      where: { state: CategoryState.ACTIVO },
    });
    return categoriesEntity.map((c) => util.categoryEntityToDomain(c));
  }

  async removed(categoryId: string): Promise<void> {
    await this.save({ id: categoryId, state: CategoryState.DESACTIVADO });
  }
}
