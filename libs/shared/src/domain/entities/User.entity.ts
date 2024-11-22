import { Entity } from '@shared/domain/interfaces/entity.interface';
import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';
import { UserPrimitives } from '@shared/domain/interfaces/user.interface';

export abstract class UserEntity implements Entity {
  id: ValueObject;
  name: ValueObject;
  lastName: ValueObject;
  status: string; // to be defined how this will be worked.
  email: string;
  residenceId: ValueObject;
  condominiumsIds: ValueObject[];
  roles: ValueObject[];
  externalId: string;
  abstract toPrimitives(): UserPrimitives;
}
