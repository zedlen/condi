import { UserResidenceEntity } from '@shared/domain/entities/UserResidence.entity';
import { UserResidenceID } from '../value-objects/userResidence/userResidence.id.valueObject';
import { UserResidenceDisplayName } from '../value-objects/userResidence/userResidence.displayName.valueObject';
import { User } from './user.entity';
import { ResidenceEntity } from '@shared/domain/entities/Residence.entity';
import { UserResidenceStatus } from '../value-objects/userResidence/userResidence.status.valueObject';
import { UserResidenceInterface } from '@shared/domain/interfaces/userResidence.interface';

export class UserResidence implements UserResidenceEntity {
  id: UserResidenceID;
  displayName: UserResidenceDisplayName;
  user: User;
  residence: ResidenceEntity;
  status: UserResidenceStatus;

  constructor(
    displayName: string,
    status: string,
    user: User,
    residence: ResidenceEntity,
    id?: string,
  ) {
    this.id = new UserResidenceID(id);
    this.displayName = new UserResidenceDisplayName(displayName);
    this.user = user;
    this.residence = residence;
    this.status = new UserResidenceStatus(status);
  }

  toPrimitives(): UserResidenceInterface {
    return {
      id: this.id.toPrimitive(),
      displayName: this.displayName.toPrimitive(),
      status: this.status.toPrimitive(),
      residence: this.residence.toPrimitives(),
      user: this.user.toPrimitives(),
    };
  }
}
