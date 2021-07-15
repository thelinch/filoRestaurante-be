import { Action } from 'src/managment-user/domain/Action';
import { actionIRepository } from 'src/managment-user/domain/repository/ActionIRepository';
import { EntityRepository, Repository } from 'typeorm';
import { ActionEntity } from '../entity/ActionEntity';
import mapperUtil from '../util/mapperUtil';

@EntityRepository(ActionEntity)
export class ActionRepository
  extends Repository<ActionEntity>
  implements actionIRepository
{
  async created(action: Action): Promise<void> {
    const actionE = new ActionEntity();
    Object.assign(actionE, action);
    await this.save(actionE);
  }
  async list(): Promise<Action[]> {
    const actionsE = await this.find();
    return actionsE.map((a) => mapperUtil.actionEntityToDomain(a));
  }
}
