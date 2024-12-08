import { AddressEntity } from '@shared/domain/entities/Address.entity';
import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';
import { AddressID } from '@condominiums/domain/value-objects/Adress/address.id.valueObject';
import { AddressName } from '@condominiums/domain/value-objects/Adress/address.name.valueObject';
import { AddressAddressLine1 } from '@condominiums/domain/value-objects/Adress/address.addressLine1.valueObject';
import { AddressAddressLine2 } from '@condominiums/domain/value-objects/Adress/address.addressLine2.valueObject';
import { AddressZipcode } from '@condominiums/domain/value-objects/Adress/address.zipcode.valueObject';
import { AddressCity } from '@condominiums/domain/value-objects/Adress/address.city.valueObject';
import { AddressState } from '@condominiums/domain/value-objects/Adress/address.state.valueObject';
import { AddressCountry } from '@condominiums/domain/value-objects/Adress/address.country.valueObject';
import { AddressStatus } from '@condominiums/domain/value-objects/Adress/address.status.valueObject';

export class Address implements AddressEntity {
  id: AddressID;
  name: AddressName;
  addressLine1: AddressAddressLine1;
  addressLine2: AddressAddressLine2;
  zipcode: AddressZipcode;
  city: AddressCity;
  state: AddressState;
  country: AddressCountry;
  status: AddressStatus;

  constructor(
    name: string,
    addressLine1: string,
    addressLine2: string,
    zipcode: string,
    city: string,
    state: string,
    country: string,
    status: string,
    id?: string,
  ) {
    this.id = new AddressID(id);
    this.name = new AddressName(name);
    this.addressLine1 = new AddressAddressLine1(addressLine1);
    this.addressLine2 = new AddressAddressLine2(addressLine2);
    this.zipcode = new AddressZipcode(zipcode);
    this.city = new AddressCity(city);
    this.state = new AddressState(state);
    this.country = new AddressCountry(country);
    this.status = new AddressStatus(status);
  }

  toPrimitives(): AddressPrimitives {
    return {
      id: this.id.toPrimitive(),
      name: this.name.toPrimitive(),
      addressLine1: this.addressLine1.toPrimitive(),
      addressLine2: this.addressLine2.toPrimitive(),
      zipcode: this.zipcode.toPrimitive(),
      city: this.city.toPrimitive(),
      state: this.state.toPrimitive(),
      country: this.country.toPrimitive(),
      status: this.status.toPrimitive(),
    };
  }
}
