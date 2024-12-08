import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';

export interface CondominiumPrimitives {
  id?: string;
  name: string;
  status: string;
  externalId: string;
  type: string;
  totalResidences: number;
  avialableParkingSpots: number;
  address: AddressPrimitives;
}
