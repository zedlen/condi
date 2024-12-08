import { ResidencePrimitives } from './residence.interface';
import { UserPrimitives } from './user.interface';

export interface UserResidenceInterface {
  id?: string;
  displayName: string;
  user: UserPrimitives;
  residence: ResidencePrimitives;
  status: string;
}
