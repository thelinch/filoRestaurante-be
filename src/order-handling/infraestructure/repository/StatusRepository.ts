import { EntityRepository, Repository } from 'typeorm';
import { StatusEntity } from '../entity/StatusEntity';

@EntityRepository(StatusEntity)
export class StatusRepository extends Repository<StatusEntity> {
  async firstState() {
    return await this.findOne({ order: 1 });
  }
}
