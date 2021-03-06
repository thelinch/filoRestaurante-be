import { EntityRepository, Repository } from 'typeorm';
import util from '../util/util';
import { TypeOrderEntity } from '../entity/TypeOrderEntity';
import { TypeOrder } from '../../domain/TypeOrder';
@EntityRepository(TypeOrderEntity)
export class TypeOrderRepository extends Repository<TypeOrderEntity> {
  async created(typeOrder: TypeOrder | TypeOrder[]): Promise<void> {
    const models = Array.isArray(typeOrder) ? typeOrder : [typeOrder];
    const entities = models.map((m) => util.typeOrderDomainToEntity(m));
    await this.save(entities);
  }
  async findById(id: string): Promise<TypeOrder | undefined> {
    const entity = await this.findOne({ id: id });
    return entity ? util.typeOrderEntityToDomain(entity) : undefined;
  }
  async list(): Promise<TypeOrder[]> {
    const categoriesEntity = await this.find();
    return categoriesEntity.map((c) => util.typeOrderEntityToDomain(c));
  }
}
