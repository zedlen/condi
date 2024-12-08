import { CondominiumPrimitives } from './condominium.interface';

export interface ResidencePrimitives {
  id?: string;
  name: string;
  status: string;
  ownerStatus: string;
  coOwnerStatus: string;
  customIdentifier: string;
  condominium: CondominiumPrimitives;
}
