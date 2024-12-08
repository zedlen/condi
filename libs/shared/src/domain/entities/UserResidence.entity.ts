import { Entity } from '@shared/domain/interfaces/entity.interface';
import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';
import { UserResidenceInterface } from '@shared/domain/interfaces/userResidence.interface';

export abstract class UserResidenceEntity implements Entity {
  id: ValueObject;
  displayName: ValueObject;
  user: Entity;
  residence: Entity;
  status: ValueObject;
  abstract toPrimitives(): UserResidenceInterface;
}
