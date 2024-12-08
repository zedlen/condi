import { CondominiumEntity } from '@shared/domain/entities/Condominium.entity';
import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';
import { CondominiumPrimitives } from '@shared/domain/interfaces/condominium.interface';
import { CondominiumID } from '@condominiums/domain/value-objects/Condominium/condominium.id.valueObject';
import { CondominiumName } from '@condominiums/domain/value-objects/Condominium/condominium.name.valueObject';
import { CondominiumStatus } from '@condominiums/domain/value-objects/Condominium/condominium.status.valueObject';
import { CondominiumType } from '@condominiums/domain/value-objects/Condominium/condominium.type.valueObject';
import { CondominiumTotalResidences } from '@condominiums/domain/value-objects/Condominium/condominium.totalResidences.valueObject';
import { CondominiumAvialableParkingSpots } from '@condominiums/domain/value-objects/Condominium/condominium.avialableParkingSpots.valueObject';
import { CondominiumExternalID } from '@condominiums/domain/value-objects/Condominium/condominium.externalId.valueObject';
import { Address } from '@condominiums/domain/entities/address.entity';

export class Condominium implements CondominiumEntity {
  id: CondominiumID;
  name: CondominiumName;
  status: CondominiumStatus;
  address: Address;
  type: CondominiumType;
  totalResidences: CondominiumTotalResidences;
  avialableParkingSpots: CondominiumAvialableParkingSpots;
  externalId: CondominiumExternalID;

  constructor(
    name: string,
    status: string,
    address: AddressPrimitives,
    type: string,
    totalResidences: number,
    avialableParkingSpots: number,
    externalId: string,
    id?: string,
  ) {
    this.name = new CondominiumName(name);
    this.status = new CondominiumStatus(status);
    this.address = new Address(
      address.name,
      address.addressLine1,
      address.addressLine2,
      address.zipcode,
      address.city,
      address.state,
      address.country,
      address.status,
      address.id,
    );
    this.type = new CondominiumType(type);
    this.totalResidences = new CondominiumTotalResidences(totalResidences);
    this.avialableParkingSpots = new CondominiumAvialableParkingSpots(
      avialableParkingSpots,
    );
    this.externalId = new CondominiumExternalID(externalId);
    this.id = new CondominiumID(id);
  }

  toPrimitives(): CondominiumPrimitives {
    return {
      id: this.id.toPrimitive(),
      name: this.name.toPrimitive(),
      address: this.address.toPrimitives(),
      status: this.status.toPrimitive(),
      type: this.type.toPrimitive(),
      externalId: this.externalId.toPrimitive(),
      totalResidences: this.totalResidences.toPrimitive(),
      avialableParkingSpots: this.avialableParkingSpots.toPrimitive(),
    };
  }
}
