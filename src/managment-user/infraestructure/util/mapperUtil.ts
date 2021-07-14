import { Action } from '../../domain/Action';
import { Role } from '../../domain/Role';
import { User } from '../../domain/User';
import { ActionEntity } from '../entity/ActionEntity';
import { RoleEntity } from '../entity/RoleEntity';
import { UserEntity } from '../entity/UserEntity';

const mapperUtil = {
  userEntityToDomain: function (userEntity: UserEntity): User {
    const roles: Role[] = userEntity.roles?.map((r) =>
      this.roleEntityToDomain(r),
    );
    const userDomain = new User({ ...userEntity, roles: roles });
    return null;
  },
  actionEntityToDomain: function (actionEntity: ActionEntity): Action {
    const action = new Action(actionEntity);
    return action;
  },
  roleEntityToDomain: function (roleEntity: RoleEntity): Role {
    const actionDomain: Action[] = roleEntity.actions?.map((a) =>
      this.actionEntityToDomain(a),
    );
    const role = new Role({ ...roleEntity, actions: actionDomain });
    return role;
  },
};

export default mapperUtil;
