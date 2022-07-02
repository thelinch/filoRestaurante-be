import { userIRepository } from '../../domain/repository/UserIRepository';
import { User } from '../../../managment-user/domain/User';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity, userState } from '../entity/UserEntity';
import mapperUtil from '../util/mapperUtil';
@EntityRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements userIRepository
{
  async list(): Promise<User[]> {
    const userEntity: UserEntity[] = await this.find({
      where: { state: userState.ACTIVO },
      relations: ['roles', 'roles.actions'],
    });
    return userEntity.map((u) => mapperUtil.userEntityToDomain(u));
  }
  async created(user: User): Promise<void> {
    const userEntity = new UserEntity();
    Object.assign(userEntity, user);
    await this.save(userEntity);
  }
  async updateState(user: Pick<User, 'id' | 'state'>): Promise<void> {
    await this.save({ id: user.id, state: user.state });
  }
  async findbyUserAndPassword(
    user: Pick<User, 'password' | 'userName'>,
  ): Promise<User | undefined> {
    const userEntity = await this.findOne({
      where: {
        userName: user.userName,
        state: userState.ACTIVO,
      },
      relations: ['roles', 'roles.actions'],
    });

    return userEntity ? mapperUtil.userEntityToDomain(userEntity) : undefined;
  }
}
