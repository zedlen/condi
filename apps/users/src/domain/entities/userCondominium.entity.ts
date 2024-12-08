import { UserCondominiumEntity } from '@shared/domain/entities/UserCondominium.entity';
import { UserCondominiumID } from '../value-objects/userCondominium/userCondominium.id.valueObject';
import { UserCondominiumDisplayName } from '../value-objects/userCondominium/userCondominium.displayName.valueObject';
import { User } from './user.entity';
import { CondominiumEntity } from '@shared/domain/entities/Condominium.entity';
import { UserCondominiumStatus } from '../value-objects/userCondominium/userCondominium.status.valueObject';
import { UserCondominiumInterface } from '@shared/domain/interfaces/userCondominium.interface';

export class UserCondominium implements UserCondominiumEntity {
  id: UserCondominiumID;
  displayName: UserCondominiumDisplayName;
  user: User;
  condominium: CondominiumEntity;
  status: UserCondominiumStatus;

  constructor(
    displayName: string,
    status: string,
    user: User,
    condominium: CondominiumEntity,
    id?: string,
  ) {
    this.id = new UserCondominiumID(id);
    this.displayName = new UserCondominiumDisplayName(displayName);
    this.user = user;
    this.condominium = condominium;
    this.status = new UserCondominiumStatus(status);
  }

  toPrimitives(): UserCondominiumInterface {
    return {
      id: this.id.toPrimitive(),
      displayName: this.displayName.toPrimitive(),
      status: this.status.toPrimitive(),
      condominium: this.condominium.toPrimitives(),
      user: this.user.toPrimitives(),
    };
  }
}
