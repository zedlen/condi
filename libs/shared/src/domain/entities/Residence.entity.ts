import { Entity } from '@shared/domain/interfaces/entity.interface';
import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';
import { ResidencePrimitives } from '@shared/domain/interfaces/residence.interface';

export abstract class ResidenceEntity implements Entity {
  id: ValueObject;
  name: ValueObject;
  status: ValueObject;
  ownerStatus: ValueObject;
  coOwnerStatus: ValueObject;
  customIdentifier: ValueObject;
  condominium: Entity;
  abstract toPrimitives(): ResidencePrimitives;
}
