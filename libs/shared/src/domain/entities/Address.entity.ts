import { Entity } from '@shared/domain/interfaces/entity.interface';
import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';
import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';

export abstract class AddressEntity implements Entity {
  id: ValueObject;
  name: ValueObject;
  addressLine1: ValueObject;
  addressLine2: ValueObject;
  zipcode: ValueObject;
  city: ValueObject;
  state: ValueObject;
  country: ValueObject;
  status: ValueObject;
  abstract toPrimitives(): AddressPrimitives;
}
