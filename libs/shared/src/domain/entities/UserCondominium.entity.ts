import { Entity } from '@shared/domain/interfaces/entity.interface';
import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';
import { UserCondominiumInterface } from '@shared/domain/interfaces/userCondominium.interface';

export abstract class UserCondominiumEntity implements Entity {
  id: ValueObject;
  displayName: ValueObject;
  user: Entity;
  condominium: Entity;
  status: ValueObject;
  abstract toPrimitives(): UserCondominiumInterface;
}
