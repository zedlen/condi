import { Entity } from '@shared/domain/interfaces/entity.interface';
import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';
import { CondominiumPrimitives } from '@shared/domain/interfaces/condominium.interface';

export abstract class CondominiumEntity implements Entity {
  id: ValueObject;
  name: ValueObject;
  status: ValueObject;
  address: Entity;
  type: ValueObject;
  totalResidences: ValueObject;
  avialableParkingSpots: ValueObject;
  externalId: ValueObject;
  abstract toPrimitives(): CondominiumPrimitives;
}
