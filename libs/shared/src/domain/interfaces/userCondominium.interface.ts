import { CondominiumPrimitives } from './condominium.interface';
import { UserPrimitives } from './user.interface';

export interface UserCondominiumInterface {
  id?: string;
  displayName: string;
  user: UserPrimitives;
  condominium: CondominiumPrimitives;
  status: string;
}
