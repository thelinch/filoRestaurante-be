import { roleIRepository } from '../../../managment-user/domain/repository/RoleIRepository';
import { Role } from '../../../managment-user/domain/Role';
import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from '../entity/RoleEntity';
import mapperUtil from '../util/mapperUtil';

@EntityRepository(RoleEntity)
export class RoleRepository
  extends Repository<RoleEntity>
  implements roleIRepository
{
  async created(role: Role): Promise<void> {
    const roleEntity = new RoleEntity();
    Object.assign(roleEntity, role);
    await this.save(roleEntity);
  }
  async list(): Promise<Role[]> {
    const rolesE: RoleEntity[] = await this.find({ relations: ['actions'] });
    return rolesE.map((r) => mapperUtil.roleEntityToDomain(r));
  }
}
